const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();

app.use(bodyParser.json());
const upload = multer();

// Helper function to check if number is prime
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// POST endpoint for /bfhl
app.post("/bfhl", upload.single("file_b64"), (req, res) => {
  const { data, file_b64 } = req.body;
  const numbers = [];
  const alphabets = [];
  let highestLowercase = "";
  let isPrimeFound = false;
  let fileValid = false;
  let mimeType = "";
  let fileSizeKB = 0;

  // Process data
  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
      if (isPrime(parseInt(item))) {
        isPrimeFound = true;
      }
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase()) {
        if (!highestLowercase || item > highestLowercase) {
          highestLowercase = item;
        }
      }
    }
  });

  // Handle file (Base64 decoding)
  if (file_b64) {
    try {
      // Decode Base64 and check file properties
      const buffer = Buffer.from(file_b64, "base64");
      mimeType = "image/png"; // Simplified, you can use libraries to detect mime type
      fileSizeKB = buffer.length / 1024;
      fileValid = true;
    } catch (error) {
      fileValid = false;
    }
  }

  const response = {
    is_success: true,
    user_id: "0827CS211126",
    email: "kinishneema210418@acopolis.in",
    roll_number: "0827CS211126",
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    is_prime_found: isPrimeFound,
    file_valid: fileValid,
    file_mime_type: mimeType,
    file_size_kb: fileSizeKB.toString(),
  };

  res.json(response);
});

// GET endpoint for /bfhl
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
