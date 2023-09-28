console.log("wor");
let totalMrp = 0;
const productCardGenerator = (x) => {
  const element = document.getElementById("products-dummy");
  const element1 = document.getElementById("products-dummy1");
  const element2 = document.getElementById("products-dum");

  fetch(`http://localhost:3000/cart`, { method: "get", credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.length == 0) {
        element.style.display = "none";
        element1.style.display = "none";
        element2.style.display = "block";
      }
      for (let i = 0; i < data.length; i++) {
        let objId = data[i].itemId;
        console.log(objId);
        fetch(`http://localhost:3000/product/${objId}`)
          .then((res2) => res2.json())
          .then((data2) => {
            console.log(data2);
            let productCard = createProductCard(data2, data[i], objId);
            x.insertAdjacentHTML("beforeend", productCard);
            element.style.display = "none";
            element1.style.display = "none";
            logTotal();
          });
      }
    });
};
// const productCard = createProductCard(data);

// x.insertAdjacentHTML("beforeend", productCard);

console.log("2");
// };
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

function createProductCard(data2, data, objId) {
  console.log("3");
  totalMrp = totalMrp + data2.price;

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
  logTotal();
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
      console.log("Clicked on product card with objId:", objId);
      if (objId) {
        window.location.href = `product.html?id=${objId}`;
      }
    }
  }
});

function deleteProduct(objId) {
  console.log("inside func");
  console.log(`http://localhost:3000/remove/${objId}`);
  fetch(`http://localhost:3000/remove/${objId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Product removed successfully.");
        location.reload();
      } else {
        console.error("Failed to remove product to cart.");
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
    // Replace with your API endpoint for fetching search results
    const response = await fetch(`http://localhost:3000/search?query=${query}`);
    const data = await response.json();

    // Display search results
    displaySearchResults(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
}

// Function to display search results in the popup
function displaySearchResults(results) {
  searchResultsPopup.innerHTML = ""; // Clear previous results

  results.forEach((result) => {
   
    // console.log(productId);
    // const resultItem = document.createElement("div");
    // resultItem.classList.add("result-item");
    // resultItem.textContent = result.title; // Replace with the appropriate property from your API response
    // const titleLink = document.createElement("a");
    // titleLink.href = "product.html?id=${results._id}"; // Replace with the appropriate URL from your API response
    // resultItem.appendChild(titleLink);
    // titleLink.textContent = result.title;
    // searchResultsPopup.appendChild(resultItem);
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");

    // Create an anchor tag for the result item
    const resultLink = document.createElement("a");
    resultLink.href = `product.html?id=${result._id}`; // Replace with the appropriate URL from your API response

    // Create a span for the title and set its text content
    const titleSpan = document.createElement("span");
    titleSpan.textContent = result.title; // Replace with the appropriate property from your API response

    // Append the title span to the anchor tag
    resultLink.appendChild(titleSpan);

    // Append the anchor tag to the result item
    resultItem.appendChild(resultLink);

    searchResultsPopup.appendChild(resultItem);
  });

  // Show the search results popup
  searchResultsPopup.style.display = "block";
}
searchResultsPopup.style.display = "none"
// Event listener for input changes
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  // Hide the search results popup if the query is empty
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

// Event listener to handle search when clicking the search icon
searchIcon.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the default behavior of the click event
  const query = searchInput.value.trim();

  // Fetch search results when the search icon is clicked
  fetchSearchResults(query);
});