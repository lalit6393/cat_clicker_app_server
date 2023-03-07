var express = require("express");
var bodyParser = require("body-parser");
var Cats = require("../model/Cat");

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get("/", function (req, res, next) {
  Cats.find()
    .then((cats) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ status: "success", cats: cats });
    })
    .catch((error) => {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ status: "failed", error: error });
    });
});

router.post("/", (req, res, next) => {
  var newCat = new Cats(req.body);
  newCat
    .save()
    .then((cat) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ status: "success", cat: cat });
    })
    .catch((error) => {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ status: "failed", error: error });
    });
});

router.put("/:id", (req, res, next) => {
  Cats.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((cats) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ status: "success", cats: cats });
    })
    .catch((error) => {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({ status: "failed", error: error });
    });
});

router.post("/img/:id", (req, res, next) => {
  let reqData = "";

  req.on("data", (chunk) => {
    reqData += chunk;
  });

  req.on("end", () => {
    Cats.findByIdAndUpdate(req.params.id, {image: reqData})
      .then((cat) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ status: "success", cats:cat});
      })
      .catch((error) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ status: "failed", error: error });
      });
  });
});

module.exports = router;
