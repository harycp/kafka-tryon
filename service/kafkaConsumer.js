const kafka = require("../config/kafkaClient");
const { verifyUser } = require("../utils/userStorage");

const startKafkaConsumer = async () => {
  const consumer = kafka.consumer({
    groupId: "email-consumer-group",
  });

  await consumer.connect();
  await new Promise((resolve) => setTimeout(resolve, 3000));

  await consumer.subscribe({
    topic: "verification_emails",
    fromBeginning: true,
  });

  console.log("[Kafka Consumer] Berhasil subscribe ke verification_emails");

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const user = JSON.parse(message.value.toString());
        console.log(
          `[Kafka Consumer] Email perlu diverifikasi : ${user.email}`
        );
        console.log(
          `Link Verifikasi: http://localhost:3000/api/auth/verify?token=${user.verificationToken}`
        );
      } catch (err) {
        console.error("[Kafka Consumer] Gagal parsing pesan:", err);
      }
    },
  });
};

module.exports = { startKafkaConsumer };
