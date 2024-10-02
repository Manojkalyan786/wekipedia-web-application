let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let { title, snippet, pageid } = result;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = `https://en.wikipedia.org/?curid=${pageid}`;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = `https://en.wikipedia.org/?curid=${pageid}`;
    urlEl.target = "_blank";
    urlEl.textContent = `https://en.wikipedia.org/?curid=${pageid}`;
    resultItemEl.appendChild(urlEl);

    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.innerHTML = snippet;
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");
    searchResultsEl.textContent = "";

    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value.trim();
        if (searchInput === "") {
            spinnerEl.classList.add("d-none");
            return;
        }

        let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchInput}&format=json&origin=*`;

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonData) {
                let { search } = jsonData.query;
                displayResults(search);
            })
            .catch(function (error) {
                spinnerEl.classList.add("d-none");
                console.error("Error fetching search results:", error);
                alert("Something went wrong. Please try again later.");
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
