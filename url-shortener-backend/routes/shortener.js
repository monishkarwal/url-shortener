const express = require("express");
const router = express.Router();
const UrlModel = require("../models/url");

const checkShortenedExists = (short, shortenedArr) => {
  for (let url of shortenedArr) {
    if (url.shortened === short) {
      return true;
    }
  }
  return false;
};

router.post("/", async (req, res) => {
  let { url, short } = req.body;

  const shortened = await UrlModel.find({ url });

  // If no URL exist check for short, create if not provided
  if (shortened.length === 0) {
    if (!short) {
      short = Math.random().toString(36).substr(2, 5);
    }

    let savedURL = new UrlModel({ url, shortened: short });
    let result = await savedURL.save();

    return res.json({ message: "URL created successfully!", data: result });
  } else {
    if (short && !checkShortenedExists(short, shortened)) {
      let savedURL = new UrlModel({ url, shortened: short });
      let result = await savedURL.save();
      return res.json({ message: "URL created successfully!", data: result });
    } else {
      return res.json({ message: "URL already exists!", data: shortened[0] });
    }
  }
});

module.exports = router;
