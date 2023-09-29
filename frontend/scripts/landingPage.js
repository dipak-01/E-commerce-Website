fetch("http://localhost:3000/user-status", {
  method: "get",
  credentials: "include",
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

const imageUrls = [
  "../Images/models/model1 (1).webp",
  "../Images/models/model1 (2).webp",
  "../Images/models/model1 (3).webp",
  "../Images/models/model1 (4).webp",
];

const imageElement = document.getElementById("changingImage");
let currentIndex1 = 0;

function changeImage() {
  currentIndex1 = (currentIndex1 + 1) % imageUrls.length;
  imageElement.src = imageUrls[currentIndex1];
}

setInterval(changeImage, 5000);

const images = document.querySelectorAll(".image");
const leftButton = document.querySelector(".left-button ");
const rightButton = document.querySelector(".right-button ");

let currentIndex = 0;

function hideAllImages() {
  images.forEach((image) => {
    image.style.display = "none";
  });
}

function showCurrentImage() {
  hideAllImages();
  images[currentIndex].style.display = "block";
}

function transition(direction) {
  if (direction === "left") {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  } else if (direction === "right") {
    currentIndex = (currentIndex + 1) % images.length;
  }

  showCurrentImage();
}

leftButton.addEventListener("click", () => {
  transition("left");
});

rightButton.addEventListener("click", () => {
  transition("right");
});
function autoChangeImage() {
  setInterval(() => {
    transition("right"); // Change to the next image (you can modify direction as needed)
  }, 4000); // 3000 milliseconds (3 seconds)
}

// Call the autoChangeImage function to start the automatic image change
autoChangeImage();
// Initial setup
hideAllImages();
showCurrentImage();

var docWidth = document.documentElement.offsetWidth;

[].forEach.call(document.querySelectorAll("*"), function (el) {
  if (el.offsetWidth > docWidth) {
    console.log(el);
  }
});

// Get the button element
var scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// Smoothly scroll to the top of the document when the button is clicked
scrollToTopBtn.addEventListener("click", function () {
  // Using behavior: "smooth" for smooth scrolling
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// const container = document.getElementById("product-container");
// // where "container" is the id of the container
// container.addEventListener("wheel", function (e) {
//   if (e.deltaY > 0) {
//     container.scrollLeft += 100;
//     e.preventDefault();
//     // prevenDefault() will help avoid worrisome
//     // inclusion of vertical scroll
//   } else {
//     container.scrollLeft -= 100;
//     e.preventDefault();
//   }
// });

// creating cards
// <!-- Your HTML container where you want to display the product cards -->
// <div id="productContainer"></div>

// Function to create a product card HTML structure
// function createProductCard(product) {
//   return `
//     <div class="product">
//       <img src="${product.imgSrc1}" alt="${product.altText}" />
//       <img id="change" src="${product.imgSrc2}" alt="${product.altText}" />
//       <div class="descr">
//         <span>DUNK</span>
//         <h4>${product.productName}</h4>
//         <h5>${product.price}</h5>
//       </div>
//       <div class="cart">
//         <a href="#" title="Add to Wishlist"><i class="bx bx-heart wishlist"></i></a>
//         <a href="#" title="Add to cart"><i class="bx bxs-cart-add cart1"></i></a>
//       </div>
//     </div>`;
// }
//  <a class="object-id" >${product._id} </a>
// Get the container element
const productCardGenerator1 = (x) => {
  function createProductCard(product) {
    return `
      <div class="product">
        <a href="product.html?id=${product._id}">
          <img src="${product.imageUrl1}" alt=" product img" />
          <img id="change" src="${product.imageUrl2}" alt=" product img" />
          <div class="descr">
            <span>NIKE</span>
            <h4>${product.title}</h4>
            <h5>₹ ${product.price}</h5>
          </div>
          <div class="cart">
          <a onclick='addToWishList("${product._id}")' title="Add to Wishlist">
          <i class="bx bx-heart wishlist wishlist-${product._id}"></i>
        </a>
            <a onclick='addToCart("${product._id}")' title="Add to cart">
              <i class="bx bxs-cart-add cart1 carting-${product._id}"></i>
            </a>
          </div>
        </a>
      </div>`;
  }
  fetch("http://localhost:3000/explore-all")
    .then((res) => res.json())
    .then((data) => {
      element.style.display = "none";
      // Generate product cards and append them to the container
      for (let i = 1; i < 6; i++) {
        let productCard = createProductCard(data[i], i);
        x.insertAdjacentHTML("beforeend", productCard);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const productCardGenerator2 = (y) => {
  function createProductCard(product) {
    return `
      <div class="product">
        <a href="product.html?id=${product._id}">
          <img src="${product.imageUrl1}" alt=" product img" />
          <img id="change" src="${product.imageUrl2}" alt=" product img" />
          <div class="descr">
            <span>NIKE</span>
            <h4>${product.title}</h4>
            <h5>₹ ${product.price}</h5>
          </div>
          <div class="cart">
          <a onclick='addToWishList("${product._id}")' title="Add to Wishlist">
          <i class="bx bx-heart wishlist wishlist-${product._id}"></i>
        </a>
            <a onclick='addToCart("${product._id}")' title="Add to cart">
              <i class="bx bxs-cart-add cart1 carting-${product._id}"></i>
            </a>
          </div>
        </a>
      </div>`;
  }

  console.log("outside2");
  fetch("http://localhost:3000/explore-all")
    .then((res) => res.json())
    .then((data) => {
      console.log("inside2");
      // Generate product cards and append them to the container
      for (let i = 6; i < 11; i++) {
        console.log("inside for2");
        let productCard = createProductCard(data[i]);
        element1.style.display = "none";
        y.insertAdjacentHTML("beforeend", productCard);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get the container element
let x = document.getElementById("productContainer1");
productCardGenerator1(x);
let y = document.getElementById("productContainer2");
productCardGenerator2(y);

// document.addEventListener("DOMContentLoaded", function () {
//   var colorLink = document.getElementById("colorLink");

//   colorLink.addEventListener("click", function () {
//     colorLink.classList.toggle("red-color");
//   });
// });

let element = document.querySelector(".dummySection");
let element1 = document.querySelector(".dummySection1");
const dummyProductContainer2 = document.getElementById(
  "dummyProductContainer2"
);
const dummyProductContainer1 = document.getElementById(
  "dummyProductContainer1"
);
const productTemplate = document.querySelector(".product");

const numberOfCards = 4;

for (let i = 0; i < numberOfCards; i++) {
  let productClone1 = productTemplate.cloneNode(true);
  dummyProductContainer1.appendChild(productClone1);
  let productClone2 = productTemplate.cloneNode(true);
  dummyProductContainer2.appendChild(productClone2);
}

// search bar
// const searchInput = document.getElementById("search-input");
// const searchIcon = document.getElementById("search-icon");
// const searchResults = document.querySelector(".search-results");

// // Function to fetch search results
// async function fetchSearchResults(query) {
//   try {
//     // Replace with your API endpoint for fetching search results
//     const response = await fetch(`http://localhost:3000/search?q=${query}`);
//     const data = await response.json();

//     // Display search results
//     displaySearchResults(data);
//   } catch (error) {
//     console.error("Error fetching search results:", error);
//   }
// }

// // Function to display search results
// function displaySearchResults(results) {
//   // Clear previous search results
//   searchResults.innerHTML = "";

//   // Iterate through the results and create HTML elements to display them
//   results.forEach((result) => {
//     const resultItem = document.createElement("div");
//     resultItem.classList.add("result-item");
//     resultItem.textContent = result.title; // Replace with the appropriate property from your API response
//     searchResults.appendChild(resultItem);
//   });

//   // Show the search results container
//   searchResults.style.display = "block";
// }

// // Event listener for input changes
// searchInput.addEventListener("input", () => {
//   const query = searchInput.value.trim();

//   // Hide the search results if the query is empty
//   if (query === "") {
//     searchResults.style.display = "none";
//     return;
//   }

//   // Fetch search results when the user types
//   fetchSearchResults(query);
// });

// // Event listener to close the search results when clicking outside
// document.addEventListener("click", (event) => {
//   if (!searchResults.contains(event.target) && event.target !== searchInput) {
//     searchResults.style.display = "none";
//   }
// });

// // Event listener to handle search when clicking the search icon
// searchIcon.addEventListener("click", () => {
//   const query = searchInput.value.trim();
//   event.preventDefault();
//   // Fetch search results when the search icon is clicked
//   fetchSearchResults(query);
// });
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
searchResultsPopup.style.display = "none";
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

function addToCart(productId) {
  console.log("in func");
  fetch(`http://localhost:3000/add-to-cart-only/${productId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Product added to cart-only successfully.");
        colorCart(productId); // Change color after successful addition to cart
      } else {
        console.error("Failed to add product to cart-only.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function colorCart(productId) {
  console.log("inside color cart");
  const cartIcon = document.querySelector(`.carting-${productId}`);
  cartIcon.style.color = "blue";
}

// Define a set to keep track of product IDs in the wishlist
const wishlist = new Set();

// Function to change the color of the wishlist icon based on the current state
// function toggleWishlist(productId) {
//   if (wishlist.has(productId)) {
//     // If the product is already in the wishlist, remove it and change the color back to the original
//     wishlist.delete(productId);
//     removeWl(productId);
//     const wishlistIcon = document.querySelector(`.wishlist-${productId}`);
//     wishlistIcon.style.color = "initial"; // Change to the original color or remove the style
//   } else {
//     // If the product is not in the wishlist, add it and change the color to red
//     wishlist.add(productId);

//     const wishlistIcon = document.querySelector(`.wishlist-${productId}`);
//     wishlistIcon.style.color = "red";
//   }
// }
function toggleWishlist(productId) {
  if (wishlist.has(productId)) {
    // If the product is already in the wishlist, remove it and change the color back to the original
    wishlist.delete(productId);
    removeWl(productId);
    const wishlistIcon = document.querySelector(`.wishlist-${productId}`);
    wishlistIcon.style.color = "initial"; // Change to the original color or remove the style
  } else {
    // If the product is not in the wishlist, add it and change the color to red
    wishlist.add(productId);

    const wishlistIcon = document.querySelector(`.wishlist-${productId}`);
    wishlistIcon.style.color = "red";
  }
}
console.log("fi");
function setColorBasedOnWishlistData() {
  wishlistData.forEach((item) => {
    const productId = item.itemId;
    const wishlistIcon = document.querySelector(`.wishlist-${productId}`);
    wishlistIcon.style.color = "red"; // Set color to red for items in the wishlist
    wishlist.add(productId); // Add the item to the wishlist set
  });
}

console.log(wishlistData);

function addToWishList(productId) {
  console.log("in func");
  fetch(`http://localhost:3000/add-to-wishlist/${productId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Product added to wishlist successfully.");
        toggleWishlist(productId); // Toggle the color when the product is added/removed from wishlist
      } else {
        console.error("Failed to add product to wishlist.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function removeWl(productId) {
  console.log("inside func");
  console.log(`http://localhost:3000/remove/${productId}`);
  fetch(`http://localhost:3000/removefromwishlist/${productId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Product removed successfully.");
      } else {
        console.error("Failed to remove product to cart.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

let wishlistData;
WishlistArray();
async function WishlistArray() {
  console.log("inside func");
  try {
    const response = await fetch(`http://localhost:3000/wishlist`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      wishlistData = await response.json();

      setColorBasedOnWishlistData();

      console.log("wishlist fetched successfully.");
    } else {
      console.log("Failed to fetch.");
    }
  } catch (err) {
    console.error(err);
  }
}

// function checkUserLoggedIn() {
//   console.log("inside checkuserlogin");
//   const userIdCookie = getCookiee("userId");
//   console.log(userIdCookie);
//   if (userIdCookie) {
//     // User is logged in
//     return true;
//   } else {
//     // User is not logged in
//     return false;
//   }
// }

// function getCookiee(cookieName) {
//   return document.cookie.userId;
// }
// function getCookie(cookieName) {
//   const cookies = document.cookie.split("; ");
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i].split("=");
//     if (cookie[0] === cookieName) {
//       return decodeURIComponent(cookie[1]);
//     }
//   }
//   return null;
// }

// Get the value of the "userID" cookie
