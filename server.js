const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");

const { startKafkaConsumer } = require("./service/kafkaConsumer");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

startKafkaConsumer().catch(console.error);

app.listen(3000, () => {
  console.log(`Server running on http:localhost:3000`);
});
