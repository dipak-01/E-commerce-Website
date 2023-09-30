// Get the container element

const productCardGenerator = (x) => {
  function createProductCard(product) {
    return `
        <div class="product">
        <a href="product.html?id=${product._id}">
          <img src="${product.imageUrl1}" alt=" product img" /> 
          <img id="change" src="${product.imageUrl2}" alt=" product img" />
          <div class="descr">
            <span> NIKE</span>
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
      for (let i = 0; i < 35; i++) {
        const productCard = createProductCard(data[i]);
        x.insertAdjacentHTML("beforeend", productCard);
        element.style.display = "none";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get the container element
let x = document.getElementById("productContainer");
productCardGenerator(x);

// let y = document.getElementById("dummyProductContainer");
// const cardTemplate = document.getElementById("dummySection");

// const numberOfCards = 10;

// for (let i = 0; i < numberOfCards; i++) {
//   const cardClone = cardTemplate.content.cloneNode(true);
//   y.appendChild(cardClone);
// }
const element = document.querySelector(".dummySection");
const dummyProductContainer = document.getElementById("dummyProductContainer");
const productTemplate = document.querySelector(".product");

const numberOfCards = 9;

for (let i = 0; i < numberOfCards; i++) {
  const productClone = productTemplate.cloneNode(true);
  dummyProductContainer.appendChild(productClone);
}

// addToWishList = (productId) => {
//   console.log("in func");
//   fetch(
//     `http://localhost:3000/add-to-wishlist/${productId}`,

//     {
//       method: "PUT",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   )
//     .then((response) => {
//       if (response.ok) {
//         console.log("Product added to wish successfully.");
//       } else {
//         console.error("Failed to add product to wish.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };

// addToCart = (productId) => {
//   console.log("in func");
//   fetch(
//     `http://localhost:3000/add-to-cart-only/${productId}`,

//     {
//       method: "PUT",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   )
//     .then((response) => {
//       if (response.ok) {
//         console.log("Product added to cart-only successfully.");
//       } else {
//         console.error("Failed to add product to cart-only.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };


 
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
        location.reload();
      } else {
        console.error("Failed to remove product to cart.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
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