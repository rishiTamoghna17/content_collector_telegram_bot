import express from "express";
import { socialMediaCntrollerWeb } from "../../controller/socialMediaCntroller";

const router = express.Router();
router.get("/test-me", function (req, res) {
  res.send("My test api!");
});

router.post("/download", socialMediaCntrollerWeb);

export default router;
