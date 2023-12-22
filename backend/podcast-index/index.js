const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());


// Initialize the Podcast Index API with environment variables
const api = require('podcast-index-api')(process.env.PODCAST_INDEX_API_KEY, process.env.PODCAST_INDEX_API_SECRET);

// Endpoint to search podcasts by term
app.get('/search', async (req, res) => {
    try {
        const results = await api.searchByTerm(req.query.term);
        res.json(results);
    } catch (error) {
        console.error('Error searching podcasts:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/trending', async (req, res) => {
    try {
        const maxPod = req.query.max ? req.query.max : 12;
        const results = await api.podcastsTrending(max = maxPod, since = null, lang = 'en,en-us,en-gb,en-ca');
        res.json(results);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/podcasts/byfeedid', async (req, res) => {
    try {
        const feedId = req.query.id
        const results = await api.podcastsByFeedId(feedId)
        res.json(results)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
});

app.get('/episodes/byfeedid', async (req, res) => {
    try {
        const feedId = req.query.id
        const results = await api.episodesByFeedId(feedId, null, 10)
        res.json(results)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
});

app.get('/episodes/byid', async (req, res) => {
    try {
        const id = req.query.id
        const results = await api.episodesById(id)
        res.json(results)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
