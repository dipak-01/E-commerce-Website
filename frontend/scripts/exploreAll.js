// Product card generator returning a div for the container

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

  // Fetching the all the products from the backend

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

// Calling the function and passing the container

let x = document.getElementById("productContainer");
productCardGenerator(x);

const element = document.querySelector(".dummySection");
const dummyProductContainer = document.getElementById("dummyProductContainer");
const productTemplate = document.querySelector(".product");

const numberOfCards = 9;

for (let i = 0; i < numberOfCards; i++) {
  const productClone = productTemplate.cloneNode(true);
  dummyProductContainer.appendChild(productClone);
}

// Function to add products in the users cart using fetch with put method and passing product id

function addToCart(productId) {
  fetch(`http://localhost:3000/add-to-cart-only/${productId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        colorCart(productId); // Calling the color cart so it will color the cart icon
      } else {
        console.error("Failed to add product to cart-only.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to color the cart icon if product is added to cart

function colorCart(productId) {
  const cartIcon = document.querySelector(`.carting-${productId}`);
  cartIcon.style.color = "blue";
}

// Set to keep track of product IDs in the wishlist

const wishlist = new Set();

// Function to change the color of the wishlist icon based on the current state

function toggleWishlist(productId) {
  if (wishlist.has(productId)) {
    // If the product is already in the wishlist, remove it and change the color back to the original

    wishlist.delete(productId);
    removeWl(productId);
    const wishlistIcon = document.querySelector(`.wishlist-${productId}`);
    wishlistIcon.style.color = "initial";
  } else {
    // If the product is not in the wishlist, add it and change the color to red

    wishlist.add(productId);
    const wishlistIcon = document.querySelector(`.wishlist-${productId}`);
    wishlistIcon.style.color = "red";
  }
}


// Function to add product in the wishlist by passing product id and using fetch with put method

function addToWishList(productId) {
  fetch(`http://localhost:3000/add-to-wishlist/${productId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Toggle the color when the product is added/removed from wishlist

        toggleWishlist(productId);
      } else {
        console.error("Failed to add product to wishlist.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to remove product from the wishlist by passing product id and using fetch with delete method

function removeWl(productId) {
  fetch(`http://localhost:3000/removefromwishlist/${productId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
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
    const response = await fetch(`http://localhost:3000/search?query=${query}`);
    const data = await response.json();

    displaySearchResults(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

// Function to display search results in the popup

function displaySearchResults(results) {
  searchResultsPopup.innerHTML = "";

  results.forEach((result) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");

    //  Anchor tag for the result item
    const resultLink = document.createElement("a");
    resultLink.href = `product.html?id=${result._id}`;

    // Span for the title and set its text content
    const titleSpan = document.createElement("span");
    titleSpan.textContent = result.title;

    // Append the title span to the anchor tag

    resultLink.appendChild(titleSpan);

    // Append the anchor tag to the result item

    resultItem.appendChild(resultLink);

    searchResultsPopup.appendChild(resultItem);
  });

  searchResultsPopup.style.display = "block";
}
searchResultsPopup.style.display = "none";

// Event listener for input changes

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  if (query === "") {
    searchResultsPopup.style.display = "none";
    return;
  }

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
  event.preventDefault();
  const query = searchInput.value.trim();

  fetchSearchResults(query);
});
