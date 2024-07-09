import express from 'express';
import { bot } from '../../controller/bot';
const router = express.Router();
router.get("/test-me", function (req, res) {
    res.send("My test api!")
}) 

 router.post("/download", bot);

export default router;