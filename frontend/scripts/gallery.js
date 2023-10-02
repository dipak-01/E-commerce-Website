var scrollToTopBtn = document.getElementById("scrollToTopBtn");

// To display the scrolltotop button

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// Event Listner with click it should reach the top

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
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