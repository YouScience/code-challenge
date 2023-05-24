import React, { useState, useEffect } from "react";
import Spinner from "../spinner/spinner";
import { Status, data } from "./sampleData";
import chevronDown from "../../assets/image/chevronDown.png";
import type { ListModel } from "./sampleData";

import "./customList.css";
import Drawer from "./drawer";

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

  const listItems = () =>
    listData.map((item, index) => {
      return (
        <li key={item.id}>
          <h2 className="listItemHeader" onClick={(_) => accordOnClick(item)}>
            {item.name}
          </h2>
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
