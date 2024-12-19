// 

import express from "express";
import { nanoid } from "nanoid";
import fs from "node:fs";

const app = express();
app.use(express.json());

const filePath = "urlMap.json";

// Ensure the JSON file exists and initialize if empty
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
}

app.post("/shorten-url", (req, res) => {
    const { longurl } = req.body;

    if (!longurl || typeof longurl !== "string") {
        return res.status(400).json({ success: false, message: "Invalid or missing 'longurl'" });
    }

    try {
        const shortUrl = nanoid(10);
        const oldUrlMap = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));

        // Add new mapping
        oldUrlMap[shortUrl] = longurl;

        // Save back to file
        fs.writeFileSync(filePath, JSON.stringify(oldUrlMap, null, 2));

        res.json({
            success: true,
            shortUrl: `http://localhost:3000/${shortUrl}`,
        });
    } catch (error) {
        console.error("Error while saving URL:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

app.get("/:shorturl", (req, res) => {
    const shortUrl = req.params.shorturl;

    try {
        const urlMap = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));

        if (urlMap[shortUrl]) {
            res.redirect(urlMap[shortUrl]);
        } else {
            res.status(404).json({ success: false, message: "Short URL not found" });
        }
    } catch (error) {
        console.error("Error while reading URL:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
