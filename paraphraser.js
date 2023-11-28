require('dotenv').config();
const axios = require('axios');
const paraphraseApiKey = process.env.RAPIDAPI_KEY_PARAPHRASER;

// Function to call the paraphrasing API and return the rewritten text
async function paraphrase(text, strength = 3) {
    const options = {
        method: 'POST',
        url: 'https://rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com/rewrite',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': paraphraseApiKey,
            'X-RapidAPI-Host': 'rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com',
        },
        data: {
            language: 'en',
            strength: strength, 
            text: text,
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data.rewrite;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = paraphrase;