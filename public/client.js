document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.getElementById("searchBox");
    const matches = document.getElementById("matches");

    let countriesData = [];
    fetch("countriesData.json")
        .then(response => response.json())
        .then(data => {
            countriesData = data;

            searchBox.addEventListener("input", function () {
                let inputText = this.value.toLowerCase();
                let suggestions = [];

                if (inputText.length > 0) {
                    suggestions = countriesData.filter(country =>
                        country.name.toLowerCase().includes(inputText) || country.capital.toLowerCase().includes(inputText)
                    );
                }

                displayMatches(suggestions);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

    function displayMatches(suggestions) {
        if (suggestions.length > 0) {
            const html = suggestions
                .map(suggestion => `<li>${suggestion.name} - ${suggestion.capital}</li>`)
                .join("");
            matches.innerHTML = html;
            matches.style.display = "block";
        } else {
            matches.innerHTML = "";
            matches.style.display = "none";
        }
    }

    matches.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            searchBox.value = e.target.textContent.split(" - ")[0];
            matches.innerHTML = "";
            matches.style.display = "none";
        }
    });

    document.addEventListener("click", function (e) {
        if (e.target !== searchBox && e.target !== matches) {
            matches.innerHTML = "";
            matches.style.display = "none";
        }
    });
});
