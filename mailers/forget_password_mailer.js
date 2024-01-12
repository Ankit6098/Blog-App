const nodemailer = require("../config/nodemailer");

exports.forgetPasswordMail = (user, accessToken) => {
    
    let htmlString = nodemailer.renderTemplate(
        { user: user },
        "/forget_password/forget_password.ejs"
    );
    
    nodemailer.transporter.sendMail(
        {
        from: "ankitvis609@gmail.com",
        to: user.email,
        subject: "Reset Password",
        // html: htmlString,
        html: `<div width:"500px"; height="700px" display="flex" flex-direction="column" >
                    <h2>Reset Password</h2>
                    <p>Dear ${user.name},</p>
                
                    <P width="90%">You are receiving this email because you (or someone else) have requested the reset of the password for your account.
                    Please click on the following link, or paste this into your browser to complete the process: https://placementadda.ankithub.me/user/reset-password/${accessToken}
                    If you did not request this, please ignore this email and your password will remain unchanged.</p>
                    <p>
                    Best regards,
                    [Ankit Vishwakarma]
                    PlaceBuddy Team
                    </p>
                </div>`,
        },
        (err, info) => {
        if (err) {
            console.log("Error in sending mail", err);
            return;
        }
    });
}