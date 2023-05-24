import React, { useState, useEffect, useMemo } from "react";
import Spinner from "../spinner/spinner";
import { Status, data } from "./sampleData";
import type { ListModel } from "./sampleData";
import Drawer from "../Drawer/drawer";
import {DeleteOutline, Edit} from '@mui/icons-material';

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

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setListData(data);
      setIsLoading(false);
    }, 2000);
  }, []);

  const listItems = useMemo(
    () =>
      listData.map((item) => {
        return (
          <li key={item.id} className="listItems">
            <h3 className="listItemHeader">{item.name}</h3>
            <div className="listIconGroup">
              <p
                className="editIcon"
                title="Edit Item"
                onClick={(event) => accordOnClick(item)}
              >
                {<Edit/>}
              </p>
              <p
                className="deleteIcon"
                title="Remove Item"
                onClick={(event) => removeItem(event, item)}
              >
                {<DeleteOutline/>}
              </p>
            </div>
          </li>
        );
      }),
    [listData]
  );

  return isLoading ? (
    <Spinner />
  ) : (
    <section className="custom-list-section">
      <ul className="list-header">
        {listItems}
        <li>
          <input
            type="button"
            value="Add New"
            id="addNewButton"
            onClick={addNewItem}
          />
        </li>
      </ul>
      {selectedItem && (
        <Drawer
          item={selectedItem}
          setListData={setListData}
          setSelectedItem={setSelectedItem}
        />
      )}
    </section>
  );
}
