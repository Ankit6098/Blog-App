console.log("script loaded");

const toggleSignUpPage = document.querySelector(".toggle-sign-up-page");
const toggleSignInPage = document.querySelector(".toggle-sign-in-page");

const signUpPage = document.querySelector(".sign-up-container");
const signInPage = document.querySelector(".sign-in-container");
const adminLogin = document.querySelector(".admin-login-container");

const userAdminOption = document.querySelector(".user-admin-option");
const userOption = document.querySelector(".user-option-button");
const adminOption = document.querySelector(".admin-option-button");

const user = document.querySelector(".user");
const admin = document.querySelector(".admin");
const toggleAdmin = document.querySelector(".toggle-admin");
const toggleUser = document.querySelector(".toggle-user");

toggleUser.addEventListener("click", () => {
  user.classList.remove("animate__bounceIn");
  user.classList.add("animate__flipInY");
  admin.classList.remove("animate__bounceIn");
  admin.classList.add("animate__flipInY");
  admin.style.display = "none";
  user.style.display = "flex";
});

toggleAdmin.addEventListener("click", () => {
  user.classList.remove("animate__bounceIn");
  user.classList.add("animate__flipInY");
  admin.classList.remove("animate__bounceIn");
  admin.classList.add("animate__flipInY");
  admin.style.display = "flex";
  user.style.display = "none";
});

userOption.addEventListener("click", () => {
  signInPage.classList.add("active");
  userAdminOption.style.display = "none";
});

adminOption.addEventListener("click", () => {
  adminLogin.style.display = "flex";
  admin.style.display = "none";
});

toggleSignUpPage.addEventListener("click", () => {
  // signUpPage.classList.add('animate__animated');
  // signUpPage.classList.add('animate__fadeInRight');
  signUpPage.classList.add("active");
  signInPage.classList.remove("active");
});

toggleSignInPage.addEventListener("click", () => {
  // signInPage.classList.add('animate__animated');
  // signInPage.classList.add('animate__fadeInLeft');
  signInPage.classList.add("active");
  signUpPage.classList.remove("active");
});

const showPassword = document.querySelector(".show-password");

showPassword.addEventListener("click", () => {
  if (showPassword.classList.contains("fa-eye")) {
    showPassword.classList.remove("fa-eye");
    showPassword.classList.add("fa-eye-slash");
  } else {
    showPassword.classList.remove("fa-eye-slash");
    showPassword.classList.add("fa-eye");
  }

  const password = document.querySelector(".password");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
});

const showConfirmPassword = document.querySelector(".show-confirm-password");

showConfirmPassword.addEventListener("click", () => {
  if (showConfirmPassword.classList.contains("fa-eye")) {
    showConfirmPassword.classList.remove("fa-eye");
    showConfirmPassword.classList.add("fa-eye-slash");
  } else {
    showConfirmPassword.classList.remove("fa-eye-slash");
    showConfirmPassword.classList.add("fa-eye");
  }

  const confirmPassword = document.querySelector(".confirm-password");
  if (confirmPassword.type === "password") {
    confirmPassword.type = "text";
  } else {
    confirmPassword.type = "password";
  }
});

const forgetPasswordContainer = document.querySelector(".forget-password-container");
const forgetPasswordResetContainer = document.querySelector(".forget-password-reset-container");
forgetPasswordContainer.addEventListener("click", () => {
  forgetPasswordResetContainer.classList.add("active");
  signInPage.classList.remove("active");
});