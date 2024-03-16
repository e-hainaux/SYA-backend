var express = require("express");
var router = express.Router();

/* Route de test */

router.get("/", (req, res) => {
  console.log("Admin called GET /test");
  res.json({ result: true });
});

module.exports = router;
