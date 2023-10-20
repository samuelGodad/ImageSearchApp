const formE1 = document.querySelector("form");

const inputE1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.querySelector(".show-more");

let page = 1;

async function searchImage() {
    const query = inputE1.value;
    const apiKey = 'gHsybeO33c7HAAyoXP2hxB1fUYClmY335M9hZZ2jv3g';
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = "";
        }

        results.map((results) => {
            const imageWraper = document.createElement("div");
            imageWraper.classList.add("search-result");
            const image = document.createElement("img");
            const imageLink = document.createElement("a");

            image.src = results.urls.regular;
            image.alt = results.alt_description;
            imageLink.href = results.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = "Photo by " + results.user.name;
            imageLink.textContent = `Photo by ${results.user.name} on ${new Date(results.created_at).toLocaleDateString()} | ${results.sponsorship ? 'free' : 'pro'}`;

            imageWraper.appendChild(image);
            imageWraper.appendChild(imageLink);
            searchResults.appendChild(imageWraper);
        });

        if (results.length < 10) {
            showMore.style.display = "none";
        } else {
            showMore.style.display = "block";
        }
    } catch (error) {
        console.log(error);
    }
}

formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImage();
});

showMore.addEventListener("click", (event) => {
    event.preventDefault();
    page++;
    searchImage();
});