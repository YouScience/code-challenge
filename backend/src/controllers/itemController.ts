import { Request, Response } from "express";
import Item from "../models/item";

let items: Item[] = [];
let itemIdCounter = 1;

const itemController = {
  getAllItems: (req: Request, res: Response) => {
    res.json(items);
  },

  getItemById: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const item = items.find((item) => item.id === id);

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  },

  createItem: (req: Request, res: Response) => {
    const { name, description, status, viewed } = req.body;

    const newItem: Item = {
      id: itemIdCounter++,
      name,
      description,
      status,
      viewed,
    };
    items.push(newItem);

    res.status(201).json(newItem);
  },

  updateItem: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    console.log(id, req.params.id, "----req.params.id");
    const { name, description, status, viewed } = req.body;

    const existingItem = items.find((item) => item.id === id);

    if (existingItem) {
      console.log(id, req.params.id, "----coming updata");

      existingItem.name = name;
      existingItem.description = description;
      existingItem.status = status;
      existingItem.viewed = viewed;

      res.json(existingItem);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  },

  deleteItem: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const index = items.findIndex((item) => item.id === id);

    if (index !== -1) {
      const deletedItem = items.splice(index, 1)[0];
      res.json(deletedItem);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  },
};

export default itemController;
