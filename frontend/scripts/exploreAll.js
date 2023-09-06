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
            <a href="#" title="Add to Wishlist"><i class="bx bx-heart wishlist"></i></a>
            <a href="http://localhost:3000/user-signin" method="GET" title="Add to cart"><i class="bx bxs-cart-add cart1"></i></a>
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
const element=document.querySelector(".dummySection")
const dummyProductContainer = document.getElementById("dummyProductContainer");
const productTemplate = document.querySelector(".product");

const numberOfCards = 9;

for (let i = 0; i < numberOfCards; i++) {
  const productClone = productTemplate.cloneNode(true);
  dummyProductContainer.appendChild(productClone);
}


// Function to create an empty product card HTML element
// function createEmptyProductCard() {
//   const productCard = document.createElement('div');
//   productCard.classList.add('product');
//   return productCard;
// }

// // Function to append empty product cards to the dummySection
// function appendEmptyProductCards() {
//   const dummyProductContainer = document.querySelector('#dummyProductContainer');

//   for (let i = 0; i < 10; i++) {
//     const productCard = createEmptyProductCard();
//     dummyProductContainer.appendChild(productCard);
//   }
// }

// // Call the function to append empty product cards when the page loads
// window.addEventListener('load', appendEmptyProductCards);
