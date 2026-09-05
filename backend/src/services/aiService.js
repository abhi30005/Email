import OpenAI from "openai";
import { buildEmailPrompt } from "./promptService.js";


function fallbackEmail({
  recipient,
  designation,
  emailType,
  tone,
  length,
  keyDetails,
  additionalInstructions,
  senderName,
  senderRole,
  companyName
}) {
  const name = senderName || "Abhijit Bhunia";
  const role = senderRole || "Trainee";
  const company = companyName || "TechValley India Pvt. Ltd.";

  const outSubject = `${emailType || "Email"} - Generated Draft`.slice(0, 90);

  const email = `Hi ${recipient || "Sir"},

I hope you are doing well.

I am writing regarding the following details:
${keyDetails}

${additionalInstructions ? `Additional context: ${additionalInstructions}` : ''}

Kindly review this and share your feedback.

Thank you.`;

  return { subject: outSubject, email, model: "fallback-demo" };
}

export async function createEmailDraft(payload) {
  if (!process.env.OPENAI_API_KEY) {
    return fallbackEmail(payload);
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = buildEmailPrompt(payload);

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You generate polished professional emails and return valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.4,
      response_format: { type: "json_object" }
    });

    const raw = completion.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw);

    return {
      subject: parsed.subject || "Generated Email",
      email: parsed.email || fallbackEmail(payload).email,
      model: process.env.OPENAI_MODEL || "gpt-4o-mini"
    };
  } catch (error) {
    console.log("OpenAI error:", error.message);
    return fallbackEmail(payload);
  }
}
