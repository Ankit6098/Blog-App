const User = require("../models/user");
const bcrypt = require("bcrypt");
const signupMailer = require("../mailers/signup_mailer");
const jwt = require("jsonwebtoken");
const forgetPasswordMailer = require("../mailers/forget_password_mailer");
const { render } = require("ejs");

module.exports.signinsignout = async function (req, res) {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }
    return res.render("authentication", {
      title: "Auth",
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

// create session
module.exports.createSession = async function (req, res) {
  console.log("create session");
  if (req.user) {
    req.flash("success", "Successfully logged In");
    console.log("logged in successfully");
  } else {
    req.flash("error", "Invalid Username/Password");
    console.log("Invalid Email/password");
  }

  return res.redirect("/blog");
};

// destroy session
module.exports.destroySession = function (req, res) {
  req.logout(function (error) {
    req.session.destroy();
    if (error) {
      req.flash("error", "Something went wrong!");
      return;
    }
  });
  req.flash("success", "Successfully logged out");
  return res.redirect("/");
};

// create user
module.exports.create = async function (req, res) {
  // check if password and confirm_password are same
  if (req.body.password != req.body.confirmPassword) {
    console.log("password and confirm_password are not same");
    req.flash("error", "Password and Confirm Password are not same");
    return res.redirect("back");
  }

  // check if user already exists
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    const plaintextPassword = req.body.password;
    const saltRounds = 10;

    // Generate a hash of the password
    bcrypt.hash(plaintextPassword, saltRounds, async (err, hash) => {
      if (err) {
        console.error(err);
        req.flash("error", "Error Creating User");
        return res.status(500).send("Error creating user");
      }

      try {
        const newUser = await User.create({
          ...req.body,
          password: hash, // Store the hashed password in the database
        });
        console.log("New user created!");
        req.flash("success", "New User Created");
        signupMailer.signupWelcome(newUser);
        return res.redirect("back");
      } catch (err) {
        console.error(err);
        req.flash("error", "Error Creating User");
        return res.status(500).send("Error creating user");
      }
    });
  } else {
    console.log("User already exists!");
    req.flash("info", "User already exists!");
    return res.redirect("/authentication");
  }
};

// forget password using JWT
module.exports.forgetPassword = async function (req, res) {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (!user) {
    console.log("User does not exists");
    req.flash("error", "User does not exists");
    return res.redirect("back");
  } else {
    const accessToken = jwt.sign(
      // payload
      { _id: user._id },
      // secret key
      process.env.JWT_RESET_PASSWORD_KEY,
      // options
      {
        expiresIn: "10m",
      }
    );
    forgetPasswordMailer.forgetPasswordMail(user, accessToken);
    console.log("Email sent");
    req.flash("success", "Email sent");
    return res.redirect("back");
  }
};

// reset password using JWT
module.exports.resetPassword = async function (req, res) {
  const accessToken = req.params.token;

  // verify the token
  jwt.verify(accessToken, process.env.JWT_RESET_PASSWORD_KEY, (err, decode) => {
    if (err) {
      console.log(err);
      console.log("Token is not valid");
      req.flash("error", "Token is not valid");
      return res.redirect("back");
    }
    // find user by id
    User.findById({ _id: decode._id })
      .then((user) => {
        if (!user) {
          console.log("User does not exists");
          req.flash("error", "User does not exists");
          return res.redirect("back");
        } else {
          // render the reset password page
          res.render("password-reset", {
            title: "Reset Password",
            user: user,
            accessToken: accessToken,
          });
        }
      })
      .catch((err) => {
        console.log("Error finding the user");
        req.flash("error", "Error finding the user");
        return res.redirect("back");
      });
  });
};

// update password
module.exports.updatePassword = async function (req, res) {
  const accessToken = req.body.accessToken;
  const newPassword = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // verify the token
  jwt.verify(accessToken, process.env.JWT_RESET_PASSWORD_KEY, (err, decode) => {
    if (err) {
      console.log(err);
      console.log("Token is not valid");
      req.flash("error", "Token is not valid");
      return res.redirect("back");
    }
    // find user by id
    User.findById({ _id: decode._id })
      .then((user) => {
        if (!user) {
          console.log("User does not exists");
          req.flash("error", "User does not exists");
          return res.redirect("back");
        } else {
          // check if password and confirm_password are same
          if (newPassword != confirmPassword) {
            console.log("password and confirm_password are not same");
            req.flash("error", "Password and Confirm Password are not same");
            return res.redirect("back");
          }

          // Generate a hash of the password
          bcrypt.hash(newPassword, 10, async (err, hash) => {
            if (err) {
              console.error(err);
              req.flash("error", "Error updating password");
              return res.status(500).send("Error updating password");
            }

            try {
              // update password
              user.password = hash;
              await user.save();
              console.log("Password updated successfully");
              req.flash("success", "Password updated successfully");
              // distroy the token
              jwt.destroy(accessToken);
              return res.redirect("/authentication");
            } catch (err) {
              console.error(err);
              req.flash("error", "Error updating password");
              return res.status(500).send("Error updating password");
            }
          });
        }
      })
      .catch((err) => {
        console.log("Error finding the user");
        req.flash("error", "Error finding the user");
        return res.redirect("back");
      });
  });
};