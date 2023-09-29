// fetch(`http://localhost:3000/viewprofile `, { credentials: "include" })
//   .then((res) => {
//     if (!res.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return res.text();
//   })
//   .then((text) => {
//     if (text.trim() === "") {
//       console.error("Empty response");
//     } else {
//       const data = JSON.parse(text);
//       console.log(data);
//       const firstNameElement = document.querySelector("#firstName");
//       const lastNameElement = document.querySelector("#lastName");
//       const phoneElement = document.querySelector(".contact");
//       const emailElement = document.querySelector("#email");
//     //   const avatarElement = document.getElementById("avatar");

//       firstNameElement.textContent = data.firstName; // Update with the actual data field from your API response
//       lastNameElement.textContent = data.lastName; // Update with the actual data field
//       phoneElement.textContent = data.phone; // Update with the actual data field
//       emailElement.textContent = data.email; // Update with the actual data field
//     //   avatarElement.src = data.avatarUrl;
//       console.log(firstNameElement.textContent);
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// fetch(`http://localhost:3000/viewprofile`, { credentials: "include" })
//   .then((res) => {
//     if (!res.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return res.json(); // Parse response as JSON
//   })
//   .then((data) => {
//     console.log("Received data:", data);

//     const firstNameElement = document.querySelector("#firstName");
//     const lastNameElement = document.querySelector("#lastName");
//     const phoneElement = document.querySelector("#phone");
//     const emailElement = document.querySelector("#email");

//     firstNameElement.textContent = data.firstName;
//     lastNameElement.textContent = data.lastName;
//     phoneElement.textContent = data.phone;
//     emailElement.textContent = data.email;

//     console.log("Updated content:", {
//       firstName: firstNameElement.textContent,
//       lastName: lastNameElement.textContent,
//       phone: phoneElement.textContent,
//       email: emailElement.textContent,
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//   // Function to toggle between displaying data and editing data
// function toggleEditProfile() {
//   const firstNameElement = document.querySelector(".firstName");
//   const lastNameElement = document.querySelector(".lastName");
//   const emailElement = document.querySelector(".email");
//   const firstNameInput = document.createElement("input");
//   const lastNameInput = document.createElement("input");
//   const emailInput = document.createElement("input");

//   firstNameInput.value = firstNameElement.textContent;
//   lastNameInput.value = lastNameElement.textContent;
//   emailInput.value = emailElement.textContent;

//   firstNameElement.innerHTML = "";
//   lastNameElement.innerHTML = "";
//   emailElement.innerHTML = "";

//   firstNameElement.appendChild(firstNameInput);
//   lastNameElement.appendChild(lastNameInput);
//   emailElement.appendChild(emailInput);

//   // Focus the first input field
//   firstNameInput.focus();

//   // Add event listeners to update the data on input blur and Enter key press
//   firstNameInput.addEventListener("blur", () => {
//     firstNameElement.textContent = firstNameInput.value;
//   });
//   lastNameInput.addEventListener("blur", () => {
//     lastNameElement.textContent = lastNameInput.value;
//   });
//   emailInput.addEventListener("blur", () => {
//     emailElement.textContent = emailInput.value;
//   });

//   // Listen for the Enter key press to update the data
//   firstNameInput.addEventListener("keyup", (event) => {
//     if (event.key === "Enter") {
//       firstNameElement.textContent = firstNameInput.value;
//     }
//   });
//   lastNameInput.addEventListener("keyup", (event) => {
//     if (event.key === "Enter") {
//       lastNameElement.textContent = lastNameInput.value;
//     }
//   });
//   emailInput.addEventListener("keyup", (event) => {
//     if (event.key === "Enter") {
//       emailElement.textContent = emailInput.value;
//     }
//   });
// }

// // Add click event listener to the "Edit Profile" link
// const editProfileLink = document.getElementById("editProfile");
// editProfileLink.addEventListener("click", toggleEditProfile);
// Function to show the edit profile form
// Function to fetch and display user profile data
// function fetchUserProfile() {
//   fetch("http://localhost:3000/viewprofile", { credentials: "include" })
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return res.json();
//     })
//     .then((data) => {
//       // Display fetched user profile data

//       document.querySelector("#addr1Input").textContent = data.address1; // Display Address 1
//       document.querySelector("#addr2Input").textContent = data.address2; // Display Address 2
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
// Function to fetch and display user profile data
function fetchUserProfile() {
  fetch("http://localhost:3000/viewprofile", { credentials: "include" })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      // Display fetched user profile data
      document.querySelector(".avatar img").src = data.avatarUrl;
      document.querySelector(".firstName").textContent = data.firstName;
      document.querySelector(".lastName").textContent = data.lastName;
      document.querySelector("#firstNameInput").value = data.firstName;
      document.querySelector("#lastNameInput").value = data.lastName;
      document.querySelector("#emailInput").textContent = data.email;
      document.querySelector(".email").textContent = data.email;
      document.querySelector("#phoneInput").textContent = data.phone;
      document.querySelector("#addr1").value = data.addrs1;
      document.querySelector("#addr2").value = data.addrs2;
    })
    .catch((err) => {
      console.log(err);
    });
}

// Fetch and display user profile data when the page loads
window.addEventListener("load", fetchUserProfile);

// Function to show the editable profile form
function showEditProfileForm() {
  // Hide the display-only elements
  document.querySelector(".avatar").style.display = "none";
  document.querySelector("#editProfile").style.display = "none";

  // Show the editable form
  document.querySelector(".user-info").style.display = "block";
  document.querySelector("#updateProfile").style.display = "block";
}

// Function to handle form submission (update profile)
document
  .querySelector("#updateProfile")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Collect data from the form
    const firstName = document.querySelector("#firstNameInput").value;
    const lastName = document.querySelector("#lastNameInput").value;
    const password = document.querySelector("#passwordInput").value;
    const addrs1 = document.querySelector("#addr1").value;
    const addrs2 = document.querySelector("#addr2").value;

    // Update the displayed data
    document.querySelector(".firstName").textContent = firstName;
    document.querySelector(".lastName").textContent = lastName;

    // Hide the form and display the updated data
    document.querySelector(".user-info").style.display = "none";
    document.querySelector(".avatar").style.display = "block";
    document.querySelector("#updateProfile").style.display = "none";
    document.querySelector("#editProfile").style.display = "block";

    // Send the updated data to the server using a fetch request
    fetch("http://localhost:3000/user-update", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        addrs1,
        addrs2,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Profile updated successfully.");
          window.location.href = "profile.html";
        } else {
          console.error("Failed to update profile data.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// Add click event listener to the "Edit Profile" button
document
  .querySelector("#editProfile")
  .addEventListener("click", showEditProfileForm);

// Fetch and display user profile data when the page loads
window.addEventListener("load", fetchUserProfile);

// Rest of the code...
document.querySelector("#editProfile").addEventListener("click", function (e) {
  e.preventDefault();

  // Toggle the visibility of the password field
  const passwordField = document.querySelector(".password");
  const updateButton = document.querySelector("#updateProfile");

  if (passwordField.style.display === "none") {
    passwordField.style.display = "block";
    updateButton.style.display = "block";
  } else {
    passwordField.style.display = "none";
    updateButton.style.display = "none";
  }
});

document.querySelector(".logout").addEventListener("click", function (e) {
  e.preventDefault();
  console.log("in logout");
  fetch("http://localhost:3000/user-logout",  {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("user logout successfully.");
        window.location.href = "landingPage.html";
      } else {
        console.error("Failed to logout.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
const searchInput = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");
const searchResultsPopup = document.getElementById("search-results-popup");

// Function to fetch search results
async function fetchSearchResults(query) {
  try {
    // Replace with your API endpoint for fetching search results
    const response = await fetch(`http://localhost:3000/search?query=${query}`);
    const data = await response.json();

    // Display search results
    displaySearchResults(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

// Function to display search results in the popup
function displaySearchResults(results) {
  searchResultsPopup.innerHTML = ""; // Clear previous results

  results.forEach((result) => {
   
    // console.log(productId);
    // const resultItem = document.createElement("div");
    // resultItem.classList.add("result-item");
    // resultItem.textContent = result.title; // Replace with the appropriate property from your API response
    // const titleLink = document.createElement("a");
    // titleLink.href = "product.html?id=${results._id}"; // Replace with the appropriate URL from your API response
    // resultItem.appendChild(titleLink);
    // titleLink.textContent = result.title;
    // searchResultsPopup.appendChild(resultItem);
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");

    // Create an anchor tag for the result item
    const resultLink = document.createElement("a");
    resultLink.href = `product.html?id=${result._id}`; // Replace with the appropriate URL from your API response

    // Create a span for the title and set its text content
    const titleSpan = document.createElement("span");
    titleSpan.textContent = result.title; // Replace with the appropriate property from your API response

    // Append the title span to the anchor tag
    resultLink.appendChild(titleSpan);

    // Append the anchor tag to the result item
    resultItem.appendChild(resultLink);

    searchResultsPopup.appendChild(resultItem);
  });

  // Show the search results popup
  searchResultsPopup.style.display = "block";
}
searchResultsPopup.style.display = "none"
// Event listener for input changes
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  // Hide the search results popup if the query is empty
  if (query === "") {
    searchResultsPopup.style.display = "none";
    return;
  }

  // Fetch search results when the user types
  fetchSearchResults(query);
});

// Event listener to close the search results when clicking outside
document.addEventListener("click", (event) => {
  if (
    !searchResultsPopup.contains(event.target) &&
    event.target !== searchInput
  ) {
    searchResultsPopup.style.display = "none";
  }
});


// Event listener to handle search when clicking the search icon
searchIcon.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the default behavior of the click event
  const query = searchInput.value.trim();

  // Fetch search results when the search icon is clicked
  fetchSearchResults(query);
});
 