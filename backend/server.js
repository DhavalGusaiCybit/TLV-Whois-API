import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/whois', async (req, res) => {
    const { domain, type } = req.query;
    const API_KEY = process.env.WHOIS_API_KEY;

    // Debugging: Print API key to check if it's loading correctly
    console.log("Using API Key:", API_KEY);

    if (!API_KEY) {
        return res.status(500).json({ error: "API key is missing or not loaded" });
    }

    if (!domain) {
        return res.status(400).json({ error: "Domain is required" });
    }

    const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${API_KEY}&domainName=${domain}&outputFormat=json`;
    console.log("API Request URL:", url);

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
