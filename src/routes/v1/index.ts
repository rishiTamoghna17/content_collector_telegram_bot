import express from "express";
import { socialMediaCntroller } from "../../controller/socialMediaCntroller";

const router = express.Router();
router.get("/test-me", function (req, res) {
  res.send("My test api!");
});

router.post("/download", socialMediaCntroller);

export default router;
