const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
console.log("prductId");

console.log("Product ID:", productId);
let x = document.getElementById("prodetails");

const loader = document.querySelector(".loader");

function showLoader() {
  loader.style.display = "block";
  // baby.style.display= 'block'
  // document.body.style.display = 'none';
}

function hideLoader() {
  loader.style.display = "none";
  // document.body.style.display = 'none';
  // baby.style.display= 'none'
}

console.log("1");
const productCardGenerator = (x) => {
  showLoader();
  fetch(`http://localhost:3000/product/${productId}`)
    .then((res) => res.json())
    .then((data) => {
      hideLoader();
      const productCard = createProductCard(data);
      x.insertAdjacentHTML("beforeend", productCard);

      console.log("2");
    })
    .catch((err) => {
      console.log(err);
      hideLoader();
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
          <input type="number" value="1" />
          <div class="details">
          ${product.description}
          </div>
          <div class="size">
            <div>Choose Your Size IND/UK</div>
            <div><a href="https://www.nike.com/in/a/how-to-measure-foot-size"> (Size Guide)</a></div>
          </div>
          <div class="size-container">
            <div> 6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
            <div class="selected">11</div>
          </div>
          <div class="order">
            <div class="cart-button">
              <button > Buy Now </button>
              <button class="add-to-cart">Add To Cart</button>
              
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
