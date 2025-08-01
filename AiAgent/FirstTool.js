import { GoogleGenAI } from "@google/genai";
import promptSync from 'prompt-sync';

const prompt = promptSync(); // Initialize prompt-sync

// Use environment variable for API key (more secure!)
const ai = new GoogleGenAI({ apiKey: " " });

// Initialize conversation history - needs to be outside of Chat function
const history = [];

async function Chat(myQuestion) {
  // Add user message to history
  history.push({
    role: "user",
    parts: [{ text: myQuestion }], // Corrected property name: myQuestion instead of myQUestion
  });

  

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: history, // Pass the entire history array
    });

    // Add model's response to history
    history.push({
      role: "model",
      parts: [{ text: response.text }], // Correctly format model's response
    });

    console.log(response.text); // Print the model's response

  } catch (error) {
    console.error("Error during API call:", error);
  }
}

const main = async () => {
    const myQuestion = prompt("Ask me an interesting question ===============>  "); // Corrected typo
    await Chat(myQuestion);
    main();  // Recursive call - BE CAREFUL, can lead to stack overflow
};

// Initial call to main() to start the conversation
main();