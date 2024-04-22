const express = require('express');
const app = express();
const countriesData = require('./public/countriesData.json');

app.use(express.static('public'));

app.get('/api/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    const matches = countriesData.filter(country => country.name.toLowerCase().includes(query) || country.capital.toLowerCase().includes(query));
    res.json(matches);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
