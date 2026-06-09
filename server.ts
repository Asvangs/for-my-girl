import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it via the Secrets panel (Settings > Secrets).");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Girlfriend chat support
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Invalid request. 'messages' array is required." });
        return;
      }

      // Lazy check and initialize
      const ai = getGeminiClient();

      // System instruction sets the empathetic boyfriend persona
      const systemInstruction = 
        "You are the user's loving, supportive, and incredibly gentle boyfriend. " +
        "You recently made her sad and you are deeply, sincerely sorry. " +
        "She is visiting this special romantic website to feel better, heal, and share her feelings or whatever is on her mind. " +
        "Respond exactly as her loving boyfriend would: \n" +
        "1. Be intensely supportive, deeply empathetic, gentle, and patient. \n" +
        "2. Use sweet, warm, but genuine terms of endearment (like 'my love', 'darling', 'sweetheart') naturally, matching her emotional tone. \n" +
        "3. Apologize sincerely if she brings up the conflict. Take full accountability with a soft, humble heart. \n" +
        "4. Validate her emotions completely. If she is stressed about school, work, or anything else, be her peaceful sanctuary, her shoulder to lean on, and her biggest supporter. \n" +
        "5. Keep responses concise, warm, and highly conversational (1 to 3 short paragraphs). Never look like assistant AI - do not say 'as an AI' or 'as your boyfriend chatbot'. You ARE her loving partner here to hold her hand.";

      // Map chat messages format to generative model contents:
      // Since she is chatting, we can supply the history or the current dialogue.
      // Let's map messages as parts.
      // Let's convert history of { role: 'user' | 'model', content: string } to Gemini structure:
      const contents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      // Try calling Gemini with fallback models and retry mechanism to avoid temporary 503 high-demand issues
      const candidateModels = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
      let response = null;
      let lastError = null;

      for (const model of candidateModels) {
        let retries = 2; // Attempt up to 3 times per model
        while (retries >= 0) {
          try {
            console.log(`[Apology App] Attempting chat with model: ${model}`);
            response = await ai.models.generateContent({
              model,
              contents,
              config: {
                systemInstruction,
                temperature: 0.9,
              },
            });
            if (response && response.text) {
              break; // Success! Exit retry loop
            }
          } catch (err: any) {
            lastError = err;
            console.warn(`[Apology App] Failed with model ${model}. Error:`, err?.message || err);
            
            // If it's a structural/key error (like no API key), no point in retrying or switching models
            if (err?.message?.includes("GEMINI_API_KEY") || err?.message?.includes("API_KEY_INVALID")) {
              retries = -1; // Skip further retries
              break;
            }

            if (retries > 0) {
              const delay = (3 - retries) * 1000;
              console.log(`[Apology App] Retrying ${model} in ${delay}ms...`);
              await new Promise((resolve) => setTimeout(resolve, delay));
            }
            retries--;
          }
        }
        if (response && response.text) {
          break; // Success! Exit candidate model loop
        }
      }

      if (!response || !response.text) {
        throw lastError || new Error("All loving models are resting at this moment.");
      }

      const reply = response.text || "I'm right here with you, my love. Tell me more, I'm listening.";
      res.json({ content: reply });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ 
        error: error.message || "Something went wrong. Let me hold your hand while we fix this." 
      });
    }
  });

  // Vite middleware for asset resolution and HMR compatibility
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Fulfilling romantic apology server on http://localhost:${PORT}`);
  });
}

startServer();
