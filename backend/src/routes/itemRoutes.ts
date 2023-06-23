import express from "express";
import itemController from "../controllers/itemController";

const router = express.Router();

router.get("/list", itemController.getAllItems);
router.get("/item/:id", itemController.getItemById);
router.post("/item", itemController.createItem);
router.put("/item/:id", itemController.updateItem);
router.delete("/item/:id", itemController.deleteItem);

export default router;
