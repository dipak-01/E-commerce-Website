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
          <a  onclick='addToWishList("${product._id}")' title="Add to Wishlist"><i class="bx bx-heart wishlist"></i></a>
          <a   onclick='addToCart("${product._id}")'    title="Add to cart"><i class="bx bxs-cart-add cart1"></i></a>
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
