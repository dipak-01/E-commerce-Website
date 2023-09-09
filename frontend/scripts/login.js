console.log("work");
const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

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

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});
console.log("work");

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting via browser default behavior

  // Get the input field values
  const inputField1Value = document.getElementById("inputusremail").value;
  const inputField2Value = document.getElementById("inputusrpassword").value;

  // Create a data object to send to the backend
  const data = {
    usremail: inputField1Value,
    usrpassword: inputField2Value,
  };

  // Send the data to the backend using the fetch API
  fetch("http://localhost:3000/user-login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
    body: JSON.stringify(data), // Convert the data object to JSON
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the response JSON if needed
    })
    .then((data) => {
      // Handle the response from the backend (if any)
      console.log("Received data");
      console.log(data);
      window.location.href = "landingPage.html"
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    });
});
