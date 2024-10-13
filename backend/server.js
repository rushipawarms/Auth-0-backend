const express = require("express");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(cors({ origin: "http://localhost:3000" }));

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_BASE_URL,
  tokenSigningAlg: "RS256",
});

// enforce on all endpoints
//app.use(jwtCheck);

app.get("/api/protected", jwtCheck, (req, res) => {
  res.json({ message: "This is a protected route." });
});

// Public Route
app.get("/api/public", (req, res) => {
  res.json({ message: "This is a public API route." });
});

app.listen(process.env.PORT, () => {
  console.log(`Backend server running at http://localhost:${process.env.PORT}`);
});
