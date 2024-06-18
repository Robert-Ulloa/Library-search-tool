document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    const format = params.get('format');
    document.getElementById('search-query').value = query;
    document.getElementById('format-select').value = format;

    if (query) {
        let apiUrl = `https://www.loc.gov/${format ? format + '/' : ''}?q=${encodeURIComponent(query)}&fo=json`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const resultsContainer = document.getElementById('results-container');
                resultsContainer.innerHTML = '';

                if (data.results && data.results.length > 0) {
                    data.results.forEach(item => {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'result-item';

                        // Check for title, description, and url fields and handle accordingly
                        const title = item.title ? item.title : 'No Title';
                        const description = item.description ? item.description.join(' ') : 'No Description';
                        const url = item.url ? item.url : '#';

                        resultItem.innerHTML = `
                            <h2>${title}</h2>
                            <p>${description}</p>
                            <a href="${url}" target="_blank">More Info</a>
                        `;
                        resultsContainer.appendChild(resultItem);
                    });
                } else {
                    resultsContainer.textContent = 'No results found.';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                const resultsContainer = document.getElementById('results-container');
                resultsContainer.innerHTML = 'An error occurred while fetching data. Please try again later.';
            });
    }
});

document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const query = document.getElementById('search-query').value;
    const format = document.getElementById('format-select').value;
    const url = `search-results.html?q=${encodeURIComponent(query)}&format=${encodeURIComponent(format)}`;
    location.assign(url);
});
