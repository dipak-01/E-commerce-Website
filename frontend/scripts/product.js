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
      console.log(productCard);
      x.insertAdjacentHTML("beforeend", productCard);

      skeletonSection.style.display = "none";

      console.log("2");
    })
    .catch((err) => {
      console.log(err);
    });

  function createProductCard(product) {
    console.log("3");

    return `<div class="left single-pro-image">
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
              <button > Buy Now </button>
              <button type="submit" class="add-to-cart">Add To Cart</button>
              
            </div>
            <div class="wishlist">
              <button><i class="uil uil-heart-alt"> </i></button>
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

document.addEventListener("DOMContentLoaded", function () {
  const addToCartForm = document.getElementById("addToCartForm");

  addToCartForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get the values from the form
    // const productId = addToCartForm.querySelector('input[name="productId"]').value;
    const quantity = addToCartForm.querySelector(
      'input[name="quantity"]'
    ).value;
    const size = addToCartForm.querySelector('select[name="size"]').value;

    const data = {
      quantity: quantity,
      size: size,
    };
    // Send the data to the backend using AJAX (you can use fetch or another AJAX library)
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log(data);
          console.log("Product added to cart successfully.");
        } else {
          // Handle errors (e.g., display an error message)
          console.error("Failed to add product to cart.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
