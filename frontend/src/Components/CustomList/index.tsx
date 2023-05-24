import React, { useState, useEffect } from "react";
import Spinner from "../spinner/spinner";
import { Status, data } from "./sampleData";
import type { ListModel } from "./sampleData";
import Drawer from "./drawer";

import "./customList.css";

export function CustomList() {
  const [listData, setListData] = useState<ListModel[]>([]);
  const [selectedItem, setSelectedItem] = useState<ListModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function accordOnClick(item: ListModel) {
    if (selectedItem?.id === item.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  }

  function addNewItem() {
    setSelectedItem({
      id: "new",
      name: "",
      viewed: false,
      status: Status.New,
      description: "",
    });
  }

  function removeItem(
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    item: ListModel
  ) {
    event.stopPropagation();

    if (item.id === selectedItem?.id) setSelectedItem(null);

    setListData((prevState) => {
      return prevState.filter((data) => data.id !== item.id);
    });
  }

  const listItems = () =>
    listData.map((item, index) => {
      return (
        <li
          key={item.id}
          className="listItems"
          onClick={(_) => accordOnClick(item)}
        >
          <h3 className="listItemHeader">{item.name}</h3>
          <p
            className="deleteIcon"
            title="Remove Item"
            onClick={(event) => removeItem(event, item)}
          >
            X
          </p>
        </li>
      );
    });

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setListData(data);
      setIsLoading(false);
    }, 2000);
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <section className="custom-list-section">
      <ul className="list-header">
        {listItems()}
        <li>
          <input
            type="button"
            value="Add New"
            id="addNewButton"
            onClick={addNewItem}
          />
        </li>
      </ul>
      {selectedItem && <Drawer item={selectedItem} setListData={setListData} />}
    </section>
  );
}
