require('dotenv').config();
const axios = require('axios');
const translateApiKey = process.env.RAPIDAPI_KEY_TRANSLATOR;

// Function to translate text from one language to another using an external API
async function translateText(text, sourceLanguage, targetLanguage) {
    // Set up the parameters for the API request
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', sourceLanguage);
    encodedParams.set('target_language', targetLanguage);
    encodedParams.set('text', text);

    // Configuration for the API request
    const options = {
        method: 'POST',
        url: 'https://text-translator2.p.rapidapi.com/translate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': translateApiKey,  
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
        },
        data: encodedParams,
    };

    // Making the API call to translate the text
    try {
        const response = await axios.request(options);
        // Return the translated text
        return response.data.data.translatedText;
    } catch (error) {
        // Log and throw any errors encountered during the API call
        console.error("Error translating text:", error);
        throw new Error('Failed to translate');
    }
}

// Export the translateText function to be used in other modules
module.exports = translateText;
