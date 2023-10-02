const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const skeletonSection = document.querySelector("#dummy");
px = document.getElementById("outerContainer");


// Fetching the product reviews for the product

fetch(`http://localhost:3000/product-review/${productId}`, {
  method: "get",
  credentials: "include",
})
  .then((res) => res.json())
  .then((data) => {
 
    for (let i = 0; i < data.length; i++) {
      let userId = data[i].userId;
      let rating = data[i].rating;
      let reviewmsg = data[i].reviewmsg;
      let createdAt = data[i].createdAt;

      // fetching the detail of the person who reviewed the products
      fetch(`http://localhost:3000/viewprofile/${userId}`)
        .then((res2) => res2.json())
        .then((data2) => {
          let firstName = data2.firstName;
          let lastName = data2.lastName;
          let avatarUrl = data2.avatarUrl;

          let productCard = createReview(
            firstName,
            lastName,
            avatarUrl,
            rating,
            reviewmsg,
            createdAt
          );
          px.insertAdjacentHTML("beforeend", productCard);
        });
    }
  });


// Function to create product card for the review

function createReview(
  firstName,
  lastName,
  avatarUrl,
  rating,
  reviewmsg,
  createdAt
) {
 
  return `
  <div class="reviewContainer">
  <div class="top">
    <div class="avatar">
      <img src="${avatarUrl}" alt="" />
    </div>
    <div class="nameStars">
      <div class="userName">${firstName} ${lastName}</div>
      <div
        class="Stars"
        style="--rating: ${rating}"
        aria-label="Rating of this product is ${rating} out of 5."
      ></div>
    </div>
  </div>
  <div class="bottom">
    <h4>Reviewed in India on ${createdAt}</h4>
    <p>
    ${reviewmsg}
    </p>
  </div>
</div>`;
}
 

// Function to create product card for products

let x = document.getElementById("prodetails");

const productCardGenerator = (x) => {
  fetch(`http://localhost:3000/product/${productId}`)
    .then((res) => res.json())
    .then((data) => {
      const productCard = createProductCard(data);
      x.insertAdjacentHTML("beforeend", productCard);

      skeletonSection.style.display = "none";
    })
    .catch((err) => {
      console.log(err);
    });

  function createProductCard(product) {
    return ` 
    <div class="left single-pro-image">
            <div class="shoe shoe1">
              <img src="${product.imageUrl1}"/>
            </div>
            <div class="shoe shoe2">
              <img src="${product.imageUrl2}" />
            </div>
          </div>
          <div class="right single-pro-details">
            <div class="pdt-names">
              <h6>Home/Shoes</h6>
              <h5>${product.title}</h5>
              <h5>Upstyle</h5>
              <div class="PdtName">
                <h2>
                  <strong
                    >${product.title}</strong
                  >
                </h2>
              </div>
            </div>
            <div class="price-tag">
              <div class="discounted-price">
                <p>₹ ${product.price}.00</p>
              </div>
              <div class="actual-price">
                <p>₹ ${product.price + 2000}.00</p>
                <span>Sale</span>
              </div>
            </div>
            <form id="addToCartForm">
            <div> Quantity <br></div>
            <input type="number" id="quantity" name="quantity" value="1" min="1" max="5">
            <div class="details">
            <p>${product.description}</p>
            </div>
            <div class="size">
              <div>Choose Your Size IND/UK</div>
              <div><a href="https://www.nike.com/in/a/how-to-measure-foot-size"> (Size Guide)</a></div>
            </div>
            <div class="size-container">
            <input type="hidden" name="productId" value="${product._id}">
            
            <select id="size" name="size">
              <option value="6"> 6</option>
              <option value="7"> 7</option>
              <option value="8"> 8</option>
              <option value="9"> 9</option>
              <option value="10"> 10</option>
              <option value="11"> 11</option>
              </select>
            </div>
            </form>
            <div class="order">
              <div class="cart-button">
                <button class="clickable" type="submit" onclick="buyNow()" > Buy Now </button>
                <button class="clickable" type="submit" onclick="addToCart()" class="add-to-cart">Add To Cart</button>
                
              </div>
              <div class="wishlist">
              
                <button class="clickable" onclick='addToWishList("${
                  product._id
                }")'><i class="uil uil-heart-alt "> </i></button>
              </div>
            </div>
            <div class="delivery">
              <div>Delivery Options</div>
              <div><i class="uil uil-truck"></i></div>
            </div>
        
             <div class="pin">
            <input
              type="text"
              placeholder="Enter pincode"
              class="pincode-code"
              value=""
              name="pincode"
              maxlength="6"
            />
            <button
      class="pincode-check pincode-button"
      onclick="checkPincode()"
    >
      Check
    </button>
                
          
            <div class="delivery-instruction availability">
              Please enter PIN code to check delivery time & Pay on Delivery
              Availability
            </div>
            <br />
            <div class="delivery-details">
              <div class="details-">100% Original Products</div>
              <div class="details-">Pay on delivery might be available</div>
              <div class="details-">Easy 14 days returns and exchanges</div>
              <div class="details-">Try & Buy might be available</div>
            </div>
            <div class="pdt-details">
              <div class="pdt-details-title">Product Details</div>
              <div class="pdt-details-list">
                <ul>
                  <li>Colour: ${product.colour}</li>
                  <li>Material: Mesh</li>
                  <li>Flexible</li>
                  <li>Enhanced cushioning</li>
                  <li>Enhanced Grip</li>
                </ul>
              </div>
            </div>
          </div>
             
          `;
  }
};
productCardGenerator(x);

// Function to add products in the cart


function addToCart() {

   const productID = document.querySelector('input[name="productId"]').value;
  const size = document.querySelector('select[name="size"]').value;
  const quantity = document.querySelector('input[name="quantity"]').value;

   const data = {
    size: size,
    quantity: quantity,
  };

  // Sending the data to the backend using a POST
  fetch(`http://localhost:3000/add-to-cart/${productId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
      } else {
        console.error("Failed to add product to cart.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function buyNow() {
   const productID = document.querySelector('input[name="productId"]').value;
  const size = document.querySelector('select[name="size"]').value;
  const quantity = document.querySelector('input[name="quantity"]').value;

   const data = {
    size: size,
    quantity: quantity,
  };

  // Sending the data to the backend using a POST
  fetch(`http://localhost:3000/add-to-cart/${productId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "cart.html";
      } else {
        console.error("Failed to add product to cart.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to add the product in the  wishlist 

addToWishList = (productId) => {
  const myElement = document.querySelector(".uil-heart-alt");

  myElement.addEventListener("click", function () {
    myElement.style.color = "red";
  });
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
      } else {
        console.error("Failed to add product to wish.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};


// Function for productcards for recommendation

const productCardGenerator1 = (pro) => {
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
       // Using math.random for random recommendations
      let a = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
      for (let i = a; i < a + 5; i++) {
        let productCard = createProductCard(data[i]);
        pro.insertAdjacentHTML("beforeend", productCard);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
let pro = document.getElementById("productContainer1");
productCardGenerator1(pro);


// Function top chech if the pincode entered is as an 6 digit number only

function checkPincode() {
  const enteredPincode = document.querySelector(".pincode-code").value;
  const validPincodePattern = /^\d{6}$/;  
  const availabilityDiv = document.querySelector(".availability");
  availabilityDiv.textContent = "";

  if (validPincodePattern.test(enteredPincode)) {
    // Check if the PIN code is "0"
    if (enteredPincode == "000000") {
      availabilityDiv.textContent = "Delivery is not available for PIN code 0.";
    } else {
      availabilityDiv.textContent = "Delivery is available for this PIN code.";
    }
  } else {
    availabilityDiv.textContent = "Please enter a valid 6-digit PIN code.";
  }
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


// Function to submit review and to send it to backend

function submitReview() {
  const rating = document.querySelector('input[name="rate"]:checked').value;

  const reviewmsg = document.getElementById("reviewText").value;

  const reviewData = {
    rating: rating,
    reviewmsg: reviewmsg,
  };

  const jsonData = JSON.stringify(reviewData);
 
  fetch(`http://localhost:3000/product-review/${productId}`, {
    credentials: "include",
    method: "PUT", // Use POST or the appropriate method for your backend
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((response) => {
      if (response.ok) {
        window.location.reload();
        // You can redirect or perform any other action here
      } else {
        alert("Error submitting review.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
