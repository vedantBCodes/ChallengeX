import ContactMessage from "../model/contact.model.js";

export const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    const contactMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Contact message saved successfully",
      data: contactMessage,
    });
  } catch (error) {
    console.log("Contact message error:", error.message);
    return res.status(500).json({ message: "Unable to save contact message" });
  }
};
