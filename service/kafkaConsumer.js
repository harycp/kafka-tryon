const kafka = require("../config/kafkaClient");
const { verifyUser } = require("../utils/userStorage");

const startKafkaConsumer = async () => {
  const consumer = kafka.consumer({
    groupId: "email-consumer-group",
  });

  await consumer.connect();
  await consumer.subscribe({
    topic: "verification_emails",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const user = JSON.parse(message.value.toString());
      console.log(`[Kafka Consumer] Email perlu diverifikasi : ${user.email}`);
      console.log(
        `Link Verifikasi: http://localhost:3000/api/auth/verify?token=${user.verificationToken}`
      );
    },
  });
};

module.exports = { startKafkaConsumer };
