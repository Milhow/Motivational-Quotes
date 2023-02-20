const PORT = 8000;
const express = require('express');
const fs = require('fs');

const app = express();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
    res.send("Welcome to the Quotes API");
});

app.get('/allQuotes', (req, res) => {
    getAllQuotes('filtered_motivational_quotes.json', (error, jsonData) => {
        if (error) {
            console.error(error);
            return;
        }
        res.send(jsonData);
    }).catch(error => console.error(error));
});

app.get('/randomQuote', (req, res) => {
    getRandomQuote('filtered_motivational_quotes.json', (error, jsonData) => {
        if (error) {
            console.error(error);
            return;
        }
        res.send(jsonData);
    }).catch(error => console.error(error));
});

async function getAllQuotes(filePath, callback) {
    fs.readFile(filePath, (error, data) => {
        if (error) {
            callback(error, null);
            return;
        }

        const jsonData = JSON.parse(data);
        callback(null, jsonData);
    });
}

async function getRandomQuote(filePath, callback) {
    await getAllQuotes(filePath, (error, jsonData) => {
        if (error) {
            callback(error, null);
            return;
        }

        const randomQuote = jsonData[Math.floor(Math.random() * jsonData.length)];
        callback(null, randomQuote);
    });
}
