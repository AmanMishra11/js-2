import { GoogleGenerativeAI } from "@google/generative-ai";

const genreInput = document.getElementById("genre");
const languageInput = document.getElementById("language");
const countryInput = document.getElementById("country");
const yearInput = document.getElementById("year");
const moodInput = document.getElementById("mood");
const instrumentsInput = document.getElementById("instruments");
const additionalInput = document.getElementById("additional");
const suggestButton = document.getElementById("suggest-btn");
const outputDiv = document.getElementById("output");
const loadingDiv = document.getElementById("loading");

async function getArtistSuggestions() {
    try {
        loadingDiv.classList.remove("hidden");
        outputDiv.innerHTML = "";
        const prompt = `Based on the following musical preferences, suggest artists and specific songs/albums:

Genre: ${genreInput.value || "Not specified"}
Language: ${languageInput.value || "Not specified"}
Country/Region: ${countryInput.value || "Not specified"}
Year/Era: ${yearInput.value || "Not specified"}
Mood: ${moodInput.value || "Not specified"}
Preferred Instruments: ${instrumentsInput.value || "Not specified"}
Additional Preferences: ${additionalInput.value || "Not specified"}

Please provide:
1. A list of 5-7 artists that best match these preferences
2. For each artist, recommend their most relevant songs or albums
3. Brief explanation of why each artist matches the preferences
4. Additional similar artists the user might enjoy
5. Any specific musical elements or characteristics that make these suggestions relevant

Format the response in a clear, organized way with appropriate headings and sections.`;

        const genAI = new GoogleGenerativeAI("AIzaSyC5tC2mLTvZ9xCgPorSCZR4HG9XQegnRG4"); 
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        loadingDiv.classList.add("hidden");
        outputDiv.innerHTML = response;

    } catch (error) {
        loadingDiv.classList.add("hidden");
        outputDiv.innerHTML = "Sorry, there was an error generating suggestions. Please try again.";
        console.error("Error:", error);
    }
}

suggestButton.addEventListener("click", getArtistSuggestions);

const inputs = [genreInput, languageInput, countryInput, yearInput, moodInput, instrumentsInput, additionalInput];
inputs.forEach(input => {
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            getArtistSuggestions();
        }
    });
});