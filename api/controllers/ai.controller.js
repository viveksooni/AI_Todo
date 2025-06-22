import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
export const generateDescription = async (req, res) => {
  const { title, description } = req.body;

  try {
    // if(description=="")
    // {
        
    // }
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Generate a concise todo description (max 150 words) for: "${title}". with some bullet points
Focus on specific, actionable steps needed to complete the task. 
Break down into clear sequential actions if applicable. 
Avoid markdown and vague terms like "properly" or "appropriately". 
Include practical considerations like time management, resources needed, or prioritization clues.

Example format for "Organize team meeting":
"Create agenda with 3 discussion topics, book conference room, 
send Outlook invites by EOD Tuesday, prepare shared document 
for notes, confirm AV setup in morning".`,
    });
    res.json({ description: response.text });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate description" });
  }
};
