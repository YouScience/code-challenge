import express from "express";
import { v4 as uuid } from "uuid";
import { ListModel, Status } from "../sampleData";

const router = express.Router();

router
  .route("/:id")
  .post((req, res) => {
    const { listItems, itemData } = req.body;

    try {
      const updatedListItems = [...listItems, { ...itemData, id: uuid() }];

      setTimeout(() => {
        res.json(updatedListItems);
      }, 1000);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .put((req, res) => {
    const id = req.params.id;
    const { listItems, itemData } = req.body;

    try {
      const updatedListItems = listItems.map((data: ListModel) => {
        if (data.id === id) {
          const status =
            data.status === Status.Complete ? Status.Complete : itemData.status;

          return { ...itemData, status };
        } else return data;
      });

      setTimeout(() => {
        res.json(updatedListItems);
      }, 1000);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .delete((req, res) => {
    const id = req.params.id;
    const { listItems } = req.body;

    try {
      const updatedListItems = listItems.filter(
        (data: ListModel) => data.id !== id
      );

      setTimeout(() => {
        res.json(updatedListItems);
      }, 1000);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

export default router;
