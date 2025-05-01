const kafka = require("../config/kafkaClient");

const producer = kafka.producer();

const sendVerificationEmail = async (user) => {
  try {
    await producer.connect();
    await producer.send({
      topic: "verification_emails",
      messages: [
        {
          key: user.email,
          value: JSON.stringify(user),
        },
      ],
    });
    console.log(user);
    console.log(
      `[Kafka Producer] Sent verification email event for ${user.email}`
    );
  } catch (err) {
    console.error("[Kafka Producer] Failed to send message:", err);
  }
};

module.exports = { sendVerificationEmail };
