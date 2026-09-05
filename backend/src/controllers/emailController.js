import { createEmailDraft } from "../services/aiService.js";
import Email from "../models/Email.js";

export async function generateEmail(req, res) {
  try {
    const { 
      recipient, 
      designation,
      emailType, 
      tone, 
      length,
      keyDetails, 
      additionalInstructions, 
      senderName, 
      senderRole, 
      companyName,
      senderEmail,
      senderEmployeeId 
    } = req.body;

    if (!keyDetails || !recipient) {
      return res.status(400).json({ error: "Recipient and key details are required" });
    }

    const result = await createEmailDraft({
      recipient,
      designation,
      emailType,
      tone,
      length,
      keyDetails,
      additionalInstructions,
      senderName,
      senderRole,
      companyName,
      senderEmail,
      senderEmployeeId
    });

    const newEmail = new Email({
      senderName,
      senderRole,
      companyName,
      recipient,
      designation,
      emailType,
      tone,
      length,
      keyDetails,
      additionalInstructions,
      subject: result.subject,
      generatedEmail: result.email
    });
    
    await newEmail.save();

    res.json(result);
  } catch (error) {
    console.log("Email generation error:", error.message);
    res.status(500).json({ error: "Failed to generate email" });
  }
}

export async function getEmailHistory(req, res) {
  try {
    const history = await Email.find().sort({ createdAt: -1 }).limit(50);
    res.json(history);
  } catch (error) {
    console.log("Error fetching email history:", error.message);
    res.status(500).json({ error: "Failed to fetch email history" });
  }
}

export async function clearEmailHistory(req, res) {
  try {
    await Email.deleteMany({});
    res.json({ message: "History cleared successfully" });
  } catch (error) {
    console.log("Error clearing email history:", error.message);
    res.status(500).json({ error: "Failed to clear email history" });
  }
}
