require('dotenv').config();
const axios = require('axios');
const summarizerApiKey = process.env.RAPIDAPI_KEY_SUMMARIZER;

// Function to summarize the input text using an external API
async function summarizeText(inputText, outputSentences = 1) {
    // Check if input text is valid
    if (typeof inputText !== 'string' || inputText.length < 100) {
        throw new Error('Input text should be a string and longer than 100 characters.');
    }

    // Configuration for the API request
    const options = {
        method: 'POST',
        url: 'https://text-summarizer1.p.rapidapi.com/summarize',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': summarizerApiKey,
            'X-RapidAPI-Host': 'text-summarizer1.p.rapidapi.com'
        },
        data: {
            text: inputText,
            language: 'en',
            output_sentences: outputSentences // Number of sentences for the summary
        }
    };

    // Making the API call to summarize the text
    try {
        const response = await axios.request(options);
        // Handle any potential errors from the API response
        if (response.data && response.data.detail) {
            throw new Error(response.data.detail[0].msg);
        }
        // Return the summarized text
        return response.data;
    } catch (error) {
        // Log and throw any errors encountered during the API call
        console.error('Error while requesting the summarization:', error.message);
        throw new Error('Error summarizing the text.');
    }
}

// Export the summarizeText function to be used in other modules
module.exports = summarizeText;
