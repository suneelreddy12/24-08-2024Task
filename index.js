const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const folderPath = path.join(__dirname, "files");

// Ensure the directory exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}
app.post("/create-file", (req, res) => {
  const currentDateTime = new Date().toISOString().replace(/:/g, "-");
  const fileName = `${currentDateTime}.txt`;
  const filePath = path.join(folderPath, fileName);

  // Content of the file is the current timestamp
  fs.writeFile(filePath, currentDateTime, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to create file", error: err });
    }
    res.status(200).json({ message: "File created successfully", fileName });
  });
});

app.get("/get-files", (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to read directory", error: err });
    }
    const textFiles = files.filter((file) => path.extname(file) === ".txt");
    res.status(200).json({ files: textFiles });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
