const imageUrls = [
  "../Images/models/model1 (1).webp",
  "../Images/models/model1 (2).webp",
  "../Images/models/model1 (3).webp",
  "../Images/models/model1 (4).webp",
];

const imageElement = document.getElementById("changingImage");
let currentIndex1 = 0;

// Function to change the image with the help of indexing showing the current index image and hiding the other images

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

// Function for the button when clicked right   currentIndex = (currentIndex - 1 + images.length) % images.length and when clicked left currentIndex = (currentIndex + 1) % images.length

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

// Calling the autoChangeImage function to start the automatic image change

autoChangeImage();
function autoChangeImage() {
  setInterval(() => {
    transition("right");
  }, 4000);
}

hideAllImages();
showCurrentImage();

var docWidth = document.documentElement.offsetWidth;

[].forEach.call(document.querySelectorAll("*"), function (el) {
  if (el.offsetWidth > docWidth) {
  }
});

var scrollToTopBtn = document.getElementById("scrollToTopBtn");

// To display the scrolltotop button

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// Event Listner with click it should reach the top

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Product card generator returning a div for the container

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

// Product card generator 2 returning a div for the another container container

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

  fetch("http://localhost:3000/explore-all")
    .then((res) => res.json())
    .then((data) => {
      // Generate product cards and append them to the container
      for (let i = 6; i < 16; i++) {
        let productCard = createProductCard(data[i]);
        element1.style.display = "none";
        y.insertAdjacentHTML("beforeend", productCard);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Calling the function and passing the container

let x = document.getElementById("productContainer1");
productCardGenerator1(x);
let y = document.getElementById("productContainer2");
productCardGenerator2(y);

// Function for the dummy product card to showup until the actual products card are made

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
        colorCart(productId); // Change color after successful addition to cart
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

function setColorBasedOnWishlistData() {
  wishlistData.forEach((item) => {
    const productId = item.itemId;
    const wishlistIcon = document.querySelector(`.wishlist-${productId}`);
    wishlistIcon.style.color = "red"; // Set color to red for items in the wishlist
    wishlist.add(productId); // Add the item to the wishlist set
  });
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
        toggleWishlist(productId); // Toggle the color when the product is added/removed from wishlist
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
    } else {
      console.log("Failed to fetch.");
    }
  } catch (err) {
    console.error(err);
  }
}
