let totalMrp = 0;

// product card generator using fetch and dynamically inserting data in the container

const productCardGenerator = (x) => {
  const element = document.getElementById("products-dummy");
  const element1 = document.getElementById("products-dummy1");
  const element2 = document.getElementById("products-dum");
  const element3 = document.querySelector(".breakdown");
  const carting = document.querySelector(".cart .right");
  const element4 = document.getElementById("pay");

// Fetching the cart from backend where users products are stored

  fetch(`http://localhost:3000/cart`, { method: "get", credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
       if (data.length == 0) {
        element.style.display = "none";
        element1.style.display = "none";
        element2.style.display = "block";
      } else {
        carting.style.display = "block";
        carting.style.visibility = "visible";
        element3.style.display = "block";
        element4.style.display = "block";
        for (let i = 0; i < data.length; i++) {
          let objId = data[i].itemId;
          fetch(`http://localhost:3000/product/${objId}`)
            .then((res2) => res2.json())
            .then((data2) => {
              totalMrp += data2.price * data[i].quantity;
              let productCard = createProductCard(data2, data[i], objId);
              x.insertAdjacentHTML("beforeend", productCard);
              element.style.display = "none";
              element1.style.display = "none";
              updateTotalMrpDisplay(totalMrp, discountPrice, convenienceFee);
            });
        }
      }
    });
};

// Function returning productcards with the given backend data

function createProductCard(data2, data, objId) {
  return `
  <div class="products"  data-objid="${objId}">
    <div class="product-img">
      <img src="${data2.imageUrl1}" alt="" />
    </div> 
    <div class="product-details">
      <div class="pdt-details-top">
       <div class="pdt-title" "> ${data2.title} size:${data.size} <p> Color: ${data2.colour}</p> 
         </div>
        <div class="close">
          <button  onclick='deleteProduct("${objId}")' class="close-button">
            <i class="uil uil-times point"></i>
          </button>
        </div>
      </div>
      <div class="pdt-details-bottom">
        <div class="inputs">
          <div class="inputs-button">
            <button  class="point"><i class="uil uil-minus"></i></button>
            <span class="Qty">${data.quantity} </span>
            <button class="add">
              <i class="uil uil-plus point"></i>
            </button>
          </div>
        </div>
        <div class="mrp">₹ ${data2.price}.00</div>
      </div>
    </div> 
    </div>
  </div>`;
}

let x = document.getElementById("products");
productCardGenerator(x);

// Event listner to handle the clicks on the products when clickes on the products

x.addEventListener("click", function (event) {
  if (
    !event.target.closest(".inputs-button") &&
    !event.target.closest(".close-button")
  ) {
    let target = event.target.closest(".products");
    if (target) {
      let objId = target.getAttribute("data-objid");

      if (objId) {
        window.location.href = `product.html?id=${objId}`;
      }
    }
  }
});

// Function to delete products from cart when clicked on the cross using fetch with delete method

function deleteProduct(objId) {
  fetch(`http://localhost:3000/remove/${objId}`, {
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
  searchResultsPopup.innerHTML = ""; // Clear previous results

  results.forEach((result) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");

    const resultLink = document.createElement("a");
    resultLink.href = `product.html?id=${result._id}`;

    const titleSpan = document.createElement("span");
    titleSpan.textContent = result.title;

    resultLink.appendChild(titleSpan);

    resultItem.appendChild(resultLink);

    searchResultsPopup.appendChild(resultItem);
  });

  searchResultsPopup.style.display = "block";
}
searchResultsPopup.style.display = "none";

// Event listener for input changes

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  // Hide the search results popup if query is empty
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

searchIcon.addEventListener("click", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();

  // Fetch search results when the search icon is clicked
  fetchSearchResults(query);
});

const discountPrice = 2000;
const convenienceFee = 100;

// Function to update and display the total amount

function updateTotalMrpDisplay(totalMrp, discountPrice, convenienceFee) {
  const totalMrpValueElement = document.getElementById("totalMrpValue");
  const discountElement = document.getElementById("discountPrice");
  const feeElement = document.getElementById("convenienceFee");
  const totalAmt = document.getElementById("totalamt");
  totalMrpValueElement.textContent = totalMrp;
  discountElement.textContent = discountPrice;
  feeElement.textContent = convenienceFee;
  totalAmt.textContent = totalMrp.toFixed(2) - discountPrice - convenienceFee;

  var inputField = document.getElementById("myInput");

  inputField.value = totalMrp - discountPrice - convenienceFee;
}
