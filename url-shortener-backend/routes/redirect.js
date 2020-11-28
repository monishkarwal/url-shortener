const express = require("express");
const router = express.Router();
const UrlModel = require("../models/url");

router.get("/:short", async (req, res) => {
  const { short } = req.params;
  const shoretened = await UrlModel.findOne({
    shortened: short,
  });

  if (!shoretened) {
    return res.status(404).json({ message: "URL not found!" });
  }
  return res.status(302).redirect(shoretened.url);
});

module.exports = router;
