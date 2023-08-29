const imageUrls = [
  "Images/models/model1 (1).webp",
  "Images/models/model1 (2).webp",
  "Images/models/model1 (3).webp",
  "Images/models/model1 (4).webp",
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

const container = document.getElementById("product-container");
// where "container" is the id of the container
container.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) {
    container.scrollLeft += 100;
    e.preventDefault();
    // prevenDefault() will help avoid worrisome
    // inclusion of vertical scroll
  } else {
    container.scrollLeft -= 100;
    e.preventDefault();
  }
});
// wishlist
document.addEventListener("DOMContentLoaded", function () {
  var colorButton = document.getElementById("colorButton");

  colorButton.addEventListener("click", function () {
    // Toggle the 'active' class on button click
    colorButton.classList.toggle("active");
  });
});

// creating cards
// <!-- Your HTML container where you want to display the product cards -->
// <div id="productContainer"></div>

// Function to create a product card HTML structure
function createProductCard(product) {
  return `
    <div class="product">
      <img src="${product.imgSrc1}" alt="${product.altText}" />
      <img id="change" src="${product.imgSrc2}" alt="${product.altText}" />
      <div class="descr">
        <span>DUNK</span>
        <h4>${product.productName}</h4>
        <h5>${product.price}</h5>
      </div>
      <div class="cart">
        <a href="#" title="Add to Wishlist"><i class="bx bx-heart wishlist"></i></a>
        <a href="#" title="Add to cart"><i class="bx bxs-cart-add cart1"></i></a>
      </div>
    </div>`;
}

// Get the container element
const productCardGenerator=(x)=>{
  function createProductCard(product) {
    return `
      <div class="product">
        <img src="${product.imageUrl1}" alt=" product img" />
        <img id="change" src="${product.imageUrl2}" alt=" product img" />
        <div class="descr">
          <span>DUNK</span>
          <h4>${product.title}</h4>
          <h5>₹ ${product.price}</h5>
        </div>
        <div class="cart">
          <a href="#" title="Add to Wishlist"><i class="bx bx-heart wishlist"></i></a>
          <a href="#" title="Add to cart"><i class="bx bxs-cart-add cart1"></i></a>
        </div>
      </div>`;
  }
  fetch("http://localhost:3000/product")
  .then((res) => res.json())
  .then((data) => {
    // Generate product cards and append them to the container
    for (let i = 0; i < 35; i++) {
      const productCard = createProductCard(data[i]);
      x.insertAdjacentHTML("beforeend", productCard);
    };
  })
  .catch((err) => {
    console.log(err);
  });
}

// Get the container element
let x = document.getElementById("productContainer1");
productCardGenerator(x);
  x = document.getElementById("productContainer2");
productCardGenerator(x);
