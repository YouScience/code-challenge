import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Spinner from "../spinner/spinner";
import { Status } from "./customListModel";
import type { ListModel } from "./customListModel";
import Drawer from "../Drawer/drawer";
import { DeleteOutline, Edit } from "@mui/icons-material";

import "./customList.css";

export function CustomList() {
  const [listData, setListData] = useState<ListModel[]>([]);
  const [selectedItem, setSelectedItem] = useState<ListModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function editItem(item: ListModel) {
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
    setIsLoading(true);

    setSelectedItem(null);

    try {
      const payload = { listItems: listData };

      axios
        .delete(`http://localhost:8000/item/${item.id}`, { data: payload })
        .then((response) => {
          setListData(response.data);
          setIsLoading(false);
        });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);

    try {
      axios.get("http://localhost:8000/list").then((response) => {
        setListData(response.data);
        setIsLoading(false);
      });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }, []);

  /*To render List of items.
    Only re-renders when listData is changed.*/
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
                onClick={(event) => editItem(item)}
              >
                {<Edit />}
              </p>
              <p
                className="deleteIcon"
                title="Remove Item"
                onClick={(event) => removeItem(event, item)}
              >
                {<DeleteOutline />}
              </p>
            </div>
          </li>
        );
      }),
    [listData]
  );

  return (
    <>
      {isLoading && <Spinner />}
      <section className="customListSection">
        <ul className="listHeader">
          {listItems.length > 0 ? listItems : <div className="noDataContainer">
              <h4 className="noDataLabel">No Data Found</h4>
            </div>}
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
            listData={listData}
            setListData={setListData}
            setIsLoading={setIsLoading}
            setSelectedItem={setSelectedItem}
          />
        )}
      </section>
    </>
  );
}
