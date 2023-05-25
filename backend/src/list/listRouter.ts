import express from "express";
import { sampleData } from "../sampleData";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    setTimeout(() => {
      res.json(sampleData);
    }, 2000);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
