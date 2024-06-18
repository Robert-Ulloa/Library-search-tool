// scripts/main.js
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const query = document.getElementById('search-query').value;
    const format = document.getElementById('format-select').value;
    const url = `search-results.html?q=${encodeURIComponent(query)}&format=${encodeURIComponent(format)}`;
    location.assign(url);
});

