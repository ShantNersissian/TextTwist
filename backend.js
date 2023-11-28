require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const paraphrase = require('./paraphraser');
const summarizeText = require('./summarizer');
const translateText  = require('./translator');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies, enable CORS, and serve static files
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('/Users/anthonysarouk/Desktop/TextTwist'));

// Route to serve the main HTML page
app.get('/', (_, res) => {
    res.sendFile('/Users/anthonysarouk/Desktop/TextTwist/frontend.html');
});

// Route to handle text paraphrasing requests
app.post('/rewrite-text', async (req, res) => {
    try {
        const result = await paraphrase(req.body.text, req.body.strength);
        console.log("Paraphrase Result:", result);
        res.json({ paraphrased: result});
    } catch (error) {
        console.error("Error in the paraphrase route:", error);
        res.status(500).json({ error: "Error paraphrasing the text." });
    }
});

// Route to handle text summarization requests
app.post('/summarize', async (req, res) => {
    try {
        const summarized = await summarizeText(req.body.text, req.body.outputSentences);
        console.log(summarized);
        res.json({ summary: summarized.summary });
    } catch (error) {
        console.error('Error in /summarize route:', error);
        res.status(500).json({ message: error.message });
    }
});

// Route to handle text translation requests
app.post('/translate', async (req, res) => {
    try {
        const text = req.body.text;
        const sourceLanguage = req.body.source_language || 'en';  
        const targetLang = req.body.target_language;    
        const translatedText = await translateText(text, sourceLanguage, targetLang);

        res.json({ translated: translatedText });
    } catch (error) {
        console.error("Error in the translate route:", error.message);
        res.status(500).json({ error: "Error translating the text." });
    }
});

// Starts the server and listens for requests
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
