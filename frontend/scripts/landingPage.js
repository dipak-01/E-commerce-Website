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
        <a  onclick='addToWishList("${product._id}")' title="Add to Wishlist"><i class="bx bx-heart wishlist"></i></a>
        <a   onclick='addToCart("${product._id}")'    title="Add to cart"><i class="bx bxs-cart-add cart1"></i></a>
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
        let productCard = createProductCard(data[i]);
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
        <a  onclick='addToWishList("${product._id}")' title="Add to Wishlist"><i class="bx bx-heart wishlist"></i></a>
        <a   onclick='addToCart("${product._id}")'    title="Add to cart"><i class="bx bxs-cart-add cart1"></i></a>
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
const searchInput = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");
const searchResults = document.querySelector(".search-results");

// Function to fetch search results
async function fetchSearchResults(query) {
  try {
    // Replace with your API endpoint for fetching search results
    const response = await fetch(`YOUR_API_ENDPOINT?q=${query}`);
    const data = await response.json();

    // Display search results
    displaySearchResults(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

// Function to display search results
function displaySearchResults(results) {
  // Clear previous search results
  searchResults.innerHTML = "";

  // Iterate through the results and create HTML elements to display them
  results.forEach((result) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    resultItem.textContent = result.title; // Replace with the appropriate property from your API response
    searchResults.appendChild(resultItem);
  });

  // Show the search results container
  searchResults.style.display = "block";
}

// Event listener for input changes
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  // Hide the search results if the query is empty
  if (query === "") {
    searchResults.style.display = "none";
    return;
  }

  // Fetch search results when the user types
  fetchSearchResults(query);
});

// Event listener to close the search results when clicking outside
document.addEventListener("click", (event) => {
  if (!searchResults.contains(event.target) && event.target !== searchInput) {
    searchResults.style.display = "none";
  }
});

// Event listener to handle search when clicking the search icon
searchIcon.addEventListener("click", () => {
  const query = searchInput.value.trim();

  // Fetch search results when the search icon is clicked
  fetchSearchResults(query);
});

// document.getElementById("").addEventListener("submit", function (event) {
//   event.preventDefault(); // Prevent the form from submitting via browser default behavior

//   // Get the input field values
//   const inputField1Value = document.getElementById("inputusremail").value;
//   const inputField2Value = document.getElementById("inputusrpassword").value;

//   // Create a data object to send to the backend
//   const data = {
//     usremail: inputField1Value,
//     usrpassword: inputField2Value,
//   };



addToWishList = (productId) => {
  console.log("in func");
  fetch(
    `http://localhost:3000/add-to-wishlist/${productId}`,

    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        console.log("Product added to wish successfully.");
      } else {
        console.error("Failed to add product to wish.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

addToCart = (productId) => {
  console.log("in func");
  fetch(
    `http://localhost:3000/add-to-cart-only/${productId}`,

    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        console.log("Product added to cart-only successfully.");
      } else {
        console.error("Failed to add product to cart-only.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};


 