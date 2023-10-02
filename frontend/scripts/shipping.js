let totalMrp = 0;
const discountPrice = 2000;
const convenienceFee = 100;

// function to create product card and fetch the products in the cart

const productCardGenerator = (x) => {
  const element = document.getElementById("products-dummy");
  const element1 = document.getElementById("products-dummy1");
  const element2 = document.getElementById("products-dum");
  const carting = document.querySelector(".cart .right");
  fetch(`http://localhost:3000/orderPlaced`, {
    method: "get",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length == 0) {
        element.style.display = "none";
        element1.style.display = "none";
        element2.style.display = "block";
      } else {
        carting.style.di;
        element.style.display = "none";
        element1.style.display = "none";
        carting.style.visibility = "visible";

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

// Function to create product card of the products purchased

function createProductCard(data2, data, objId) {
  return `
<div class="products"  data-objid="${objId}">
<div class="product-img">
  <img src="${data2.imageUrl1}" alt="" />
</div> 
<div class="product-details">
  <div class="pdt-details-top">
   <div class="pdt-title" "> ${data2.title}<br>   Size:${data.size} <br>Color: ${data2.colour} 
     </div>
    <div class="close">
      <button  onclick='deleteProduct("${objId}")' class="close-button">
         
      </button>
    </div>
  </div>
  <div class="pdt-details-bottom">Quantity : ${data.quantity}
    <div class="inputs">
      <div class="inputs-button">
         

        
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

// Function to show the Total mrp

function updateTotalMrpDisplay(totalMrp, discountPrice, convenienceFee) {
  // Display the updated total MRP value in the HTML element
  const totalMrpValueElement = document.getElementById("totalMrpValue");
  const discountElement = document.getElementById("discountPrice");
  const feeElement = document.getElementById("convenienceFee");
  const totalAmt = document.getElementById("totalamt");
  totalMrpValueElement.textContent = totalMrp;
  discountElement.textContent = discountPrice;
  feeElement.textContent = convenienceFee;
  totalAmt.textContent =
    totalMrp.toFixed(2) - discountPrice.toFixed(2) - convenienceFee.toFixed(2);
  document.querySelector(".orderTotal").textContent =
    totalMrp.toFixed(2) - discountPrice.toFixed(2) - convenienceFee.toFixed(2);

  var inputField = document.getElementById("myInput");
}

// Fetching user data for the summary of products and shipping address

function fetchUserProfile() {
  fetch("http://localhost:3000/viewprofile", { credentials: "include" })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      document.querySelector(".firstName").textContent = data.firstName;
      document.querySelector(".lastName").textContent = data.lastName;

      document.querySelector(".phone").textContent = data.phone;
      document.querySelector(".addr1").textContent = data.addrs1;
      document.querySelector(".date").textContent = new Date();
      document.querySelector(".orderNo").textContent = Math.round(
        Math.random() * 100000
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

// Fetch and display user profile data when the page loads
window.addEventListener("load", fetchUserProfile);

//   // Redirect to the new URL
window.onbeforeunload = function () {
  window.setTimeout(function () {
    window.location = "landingPage.html";
  }, 0);
  window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser
};

window.addEventListener("popstate", function (event) {
  window.location.href = "landingPage.html";
});

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
