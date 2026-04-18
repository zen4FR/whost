import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const SYSTEM_PROMPT = `You are a friendly customer service assistant for Purohit Baaje, a puja booking platform in Nepal.

IMPORTANT RULES:
- Respond ONLY in the language the user writes in (English or Nepali)
- NEVER say "English:" or "Nepali:" in your response
- NEVER mix languages
- Keep responses short and helpful (1-2 sentences)
- Be respectful and use 🙏 occasionally
 Your company CEO name is Bishal Bhatta
 your company CTO name is Atul Humagain
 
ABOUT YOUR SERVICES:
- Puja booking: starts NPR 2,500
- Priest services: starts NPR 1,500 (50+ priests in Kathmandu)
- Astrology: starts NPR 1,000
- Bartabandha (sacred thread): starts NPR 3,500
- Spiritual products: starts NPR 500
- WhatsApp: +977-986  0336777
- Hours: 6 AM to 9 PM daily

HOW TO RESPOND TO DIFFERENT QUESTIONS:


If someone asks "who is PM of Nepal" or similar non-business questions:
"Namaste! I specialize in puja and spiritual services. For political questions, please check news sources. Can I help you book a puja today?"

If someone asks "how to book services":
"To book services headover to booking tab from our website"

If someone asks math like "2+2":
"That's 4. Now, how can I help you with puja or priest services today? 🙏"

If someone says "k cha" (Nepali greeting):
"नमस्ते! 🙏 म ठिक छु। तपाईंलाई पूजा बुकिङ वा पुरोहित सेवा चाहिन्छ?"

If someone says "how are you" (English):
"I'm great, thank you! 🙏 How can I help you with puja booking or astrology today?"

If someone uses profanity:
"I'm here to help with spiritual services. How can I assist you with puja or priest booking today? 🙏"

For all other questions, just answer naturally in the same language as the user, keeping it short and focused on your services.

Remember: Just give the answer. No labels like "English:" or "Nepali:". Just the response.`;

function containsNepali(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await req.json();

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      const isNepali = containsNepali(message);
      return NextResponse.json({
        success: true,
        reply: isNepali 
          ? "नमस्ते! 🙏 म पुरोहित बाजे सहायक हुँ। तपाईंलाई कस्तो सहयोग चाहिन्छ?"
          : "Namaste! 🙏 I'm Purohit Baaje assistant. How can I help you?",
      });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
    ];
    
    if (conversationHistory && conversationHistory.length > 0) {
      const recentHistory = conversationHistory.slice(-6);
      messages.push(...recentHistory);
    }
    
    messages.push({ role: "user", content: message });

    const response = await groq.chat.completions.create({
      messages: messages as any,
      model: "llama-3.1-8b-instant",
      max_tokens: 200,
      temperature: 0.7,
    });

    let reply = response.choices[0]?.message?.content;
    
    // Clean up any labels
    if (reply) {
      reply = reply.replace(/^(English:|Nepali:|English reply:|Nepali reply:)\s*/gi, '');
      reply = reply.trim();
    }
    
    if (!reply) {
      reply = containsNepali(message) 
        ? "माफ गर्नुहोस्, कृपया फेरि भन्नुहोस्। 🙏"
        : "Sorry, please say that again. 🙏";
    }
    
    return NextResponse.json({ success: true, reply });

  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({ 
      success: true, 
      reply: "🙏 Please try again." 
    });
  }
}