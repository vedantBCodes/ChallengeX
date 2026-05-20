import Subscriber from "../model/subscriber.model.js";

export const createSubscriber = async (req, res) => {
  try {
    const { email, source } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    const subscriber = await Subscriber.findOneAndUpdate(
      { email: normalizedEmail },
      {
        email: normalizedEmail,
        source: source || "footer-newsletter",
      },
      { new: true, upsert: true, runValidators: true }
    );

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      data: subscriber,
    });
  } catch (error) {
    console.log("Subscriber error:", error.message);
    return res.status(500).json({ message: "Unable to save subscription" });
  }
};
