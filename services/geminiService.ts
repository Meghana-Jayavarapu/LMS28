
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables.
// In a real browser environment, this should be handled via a backend proxy
// to keep the key secure. For this project, we assume it's directly available.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Study Buddy will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const askStudyBuddy = async (lessonContent: string, question: string): Promise<string> => {
  if (!API_KEY) {
    return "I'm sorry, my connection to my knowledge base is not configured. Please contact an administrator.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a helpful and encouraging Study Buddy for an online learning platform.
      A student is asking a question about a lesson.

      Here is the content of the lesson they are currently viewing:
      ---
      ${lessonContent}
      ---
      
      Here is the student's question:
      "${question}"
      
      Please answer the question clearly and concisely, relating it back to the lesson content.
      If the question is unrelated to the lesson, politely steer them back to the topic.
      Keep your tone friendly and supportive.
      `,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
};
