import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: false,
    },
    senderRole: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: false,
    },
    recipient: {
      type: String,
      required: true,
    },
    emailType: {
      type: String,
      required: true,
    },
    tone: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    length: {
      type: String,
      required: true,
    },
    keyDetails: {
      type: String,
      required: true,
    },
    additionalInstructions: {
      type: String,
      required: false,
    },
    subject: {
      type: String,
      required: true,
    },
    generatedEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Email = mongoose.model("Email", emailSchema);

export default Email;
