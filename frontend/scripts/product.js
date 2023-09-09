const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const skeletonSection = document.querySelector("#dummy");
// const dataSection = document.querySelector("#prodetails");
console.log("prductId");

console.log("Product ID:", productId);
let x = document.getElementById("prodetails");

console.log("1");
const productCardGenerator = (x) => {
  fetch(`http://localhost:3000/product/${productId}`)
    .then((res) => res.json())
    .then((data) => {
      const productCard = createProductCard(data);
      // console.log(productCard);
      x.insertAdjacentHTML("beforeend", productCard);

      skeletonSection.style.display = "none";

      console.log("2");
    })
    .catch((err) => {
      console.log(err);
    });

  function createProductCard(product) {
    console.log("3");

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
        
            <form autocomplete="off">
            <input
              type="text"
              placeholder="Enter pincode"
              class="pincode-code"
              value=""
              name="pincode"
              maxlength="6"
            />
            <input
              type="submit"
              class="pincode-check pincode-button"
              value="Check"
            />
          </form>
          <div id="result"></div>
            <div class="delivery-instruction">
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

function addToCart() {
  // Get the product ID, size, and quantity here
  const productID = document.querySelector('input[name="productId"]').value;
  const size = document.querySelector('select[name="size"]').value;
  const quantity = document.querySelector('input[name="quantity"]').value;
  console.log("Product ID:", productID);
  console.log("Size:", size);
  console.log("Quantity:", quantity);
  // Create an object to hold the data
  const data = {
    size: size,
    quantity: quantity,
  };

  // Send the data to the backend using a POST
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
        console.log("Product added to cart successfully.");
        console.log(data);
      } else {
        console.error("Failed to add product to cart.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function buyNow() {
  // Get the product ID, size, and quantity here
  const productID = document.querySelector('input[name="productId"]').value;
  const size = document.querySelector('select[name="size"]').value;
  const quantity = document.querySelector('input[name="quantity"]').value;
  console.log("Product ID:", productID);
  console.log("Size:", size);
  console.log("Quantity:", quantity);
  // Create an object to hold the data
  const data = {
    size: size,
    quantity: quantity,
  };

  // Send the data to the backend using a POST
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
        console.log("Product added to cart successfully.");
        console.log(data);
        window.location.href="cart.html"
      } else {
        console.error("Failed to add product to cart.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
addToWishList = (productId) => {
  console.log("in func");
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
        console.log("Product added to wish successfully.");
      } else {
        console.error("Failed to add product to wish.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

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
      // Generate product cards and append them to the container
      for (let i = 8; i < 13; i++) {
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


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("pincode-form").addEventListener("submit", function (e) {
      e.preventDefault();
      checkPincode();
  });

  function checkPincode() {
      const enteredPincode = document.querySelector(".pincode-code").value;
      const validPincodePattern = /^\d{6}$/; // A simple pattern to check for 6-digit PIN code

      if (validPincodePattern.test(enteredPincode)) {
          // Simulate a check for delivery availability
          const isDeliveryAvailable = Math.random() < 0.5; // Example: 50% chance of delivery availability

          if (isDeliveryAvailable) {
              document.getElementById("result").textContent = "Delivery is available for this PIN code.";
          } else {
              document.getElementById("result").textContent = "Sorry, delivery is not available for this PIN code.";
          }
      } else {
          document.getElementById("result").textContent = "Please enter a valid 6-digit PIN code.";
      }
  }
});   

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
