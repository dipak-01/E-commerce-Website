const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

// Function to open and close form

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

// Function to show and hide password with the eye icon

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

// Event listner to show the login page and signup page when clicked

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

// Eventlistner toto submit the form which is filled while login

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const inputField1Value = document.getElementById("inputusremail").value;
  const inputField2Value = document.getElementById("inputusrpassword").value;

  //  Data object to send to the backend
  const data = {
    usremail: inputField1Value,
    usrpassword: inputField2Value,
  };

  // Data  is sent to the backend using the fetch
  fetch("http://localhost:3000/user-login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json", // Setting the content type to JSON
    },
    body: JSON.stringify(data), // Converting the data object to JSON
  })
    .then((response) => {
      if (!response.ok) {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = "Invalid username and password !";
      } else window.location.href = "landingPage.html";

      // return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    });
});

// Eventlistner to send signup form data to backend

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const inputFirstNameValue = document.getElementById("inputFirstName").value;
  const inputLastNameValue = document.getElementById("inputLastName").value;
  const inputEmailValue = document.getElementById("inputEmail").value;
  const inputPhoneValue = document.getElementById("inputPhone").value;
  const inputPasswordValue = document.getElementById("inputPassword").value;

  // Data object to send to the backend
  const data = {
    firstName: inputFirstNameValue,
    lastName: inputLastNameValue,
    email: inputEmailValue,
    phone: inputPhoneValue,
    password: inputPasswordValue,
  };

  // Sending the data to the backend using the fetch API

  fetch("http://localhost:3000/user-signup", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Converting the data object to JSON
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "login.html";
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    });
});
