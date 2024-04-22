document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.getElementById("searchBox");
    const matches = document.getElementById("matches");

    // Fetch the list of countries and capitals
    fetch("countriesData.json")
        .then(response => response.json())
        .then(data => {
            let countries = data.map(item => item.name.toLowerCase());

            // Event listener for input
            searchBox.addEventListener("input", function () {
                let inputText = this.value.toLowerCase();
                let suggestions = [];

                if (inputText.length > 0) {
                    suggestions = countries.filter(country =>
                        country.includes(inputText)
                    );
                }

                displayMatches(suggestions);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

    // Function to display autocomplete suggestions
    function displayMatches(suggestions) {
        if (suggestions.length > 0) {
            const html = suggestions
                .map(suggestion => `<li>${suggestion}</li>`)
                .join("");
            matches.innerHTML = html;
            matches.style.display = "block";
        } else {
            matches.innerHTML = "";
            matches.style.display = "none";
        }
    }

    // Event listener for selecting a suggestion
    matches.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            searchBox.value = e.target.textContent;
            matches.innerHTML = "";
            matches.style.display = "none";
        }
    });

    // Close the suggestions when clicking outside the input
    document.addEventListener("click", function (e) {
        if (e.target !== searchBox && e.target !== matches) {
            matches.innerHTML = "";
            matches.style.display = "none";
        }
    });
});
