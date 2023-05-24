import React, { useEffect, useState } from "react";
import { ListModel, Status } from "../CustomList/sampleData";
import { v4 as uuid } from "uuid";

import "./drawer.css";

type DrawerProps = {
  item: ListModel;
  setListData: React.Dispatch<React.SetStateAction<ListModel[]>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<ListModel | null>>;
};

const Drawer = (props: DrawerProps) => {
  const { setListData, setSelectedItem } = props;

  const [item, setItem] = useState<ListModel>();

  function accordOnSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setListData((prevState) => {
      let newList: ListModel[] = [];
      if (item?.id === "new") {
        newList = [...prevState, { ...item, id: uuid() }];
      } else {
        newList = prevState.map((data) => {
          if (data.id === item?.id) return item;
          else return data;
        });
      }

      return newList;
    });

    setSelectedItem(null);
  }

  function changeStatus(event: React.ChangeEvent<HTMLInputElement>) {
    setItem((prevState) => {
      return { ...prevState!, status: event.target.value as Status };
    });
  }

  useEffect(() => {
    setItem(props.item);
  }, [props.item]);

  return (
    <section key={item?.id} id="drawerSection">
      <form onSubmit={(event) => accordOnSave(event)} id="drawerForm">
        <div id="drawerInputSection">
          <div id="drawerCloseButton" onClick={(_) => setSelectedItem(null)}>
            X
          </div>

          <div>
            <label
              htmlFor="userName"
              id="drawerUserName"
              className="formHeaderLabels"
            >
              Name:
            </label>
            <input
              type="text"
              id="userName"
              value={item?.name}
              onChange={(e) =>
                setItem((prevState) => {
                  return { ...prevState!, name: e.target.value };
                })
              }
            />
          </div>

          <div id="viewedContainer">
            <input
              type="checkbox"
              id="viewed"
              checked={item?.viewed}
              onChange={(e) =>
                setItem((prevState) => {
                  return { ...prevState!, viewed: e.target.checked };
                })
              }
            />
            <label
              htmlFor="viewed"
              id="drawerCheckboxLabel"
              className="formHeaderLabels"
            >
              Viewed
            </label>
          </div>

          <div>
            <label
              htmlFor="description"
              id="drawerDescription"
              className="formHeaderLabels"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={item?.description}
              rows={4}
              onChange={(e) =>
                setItem((prevState) => {
                  return { ...prevState!, description: e.target.value };
                })
              }
            />
          </div>

          <div
            className={
              props.item?.status === Status.Complete
                ? "drawerRadioGroup readOnly"
                : "drawerRadioGroup"
            }
          >
            <label id="drawerStatusLabel" className="formHeaderLabels">
              Status:
            </label>
            <div className="drawerRadioButtonContainer">
              <input
                type="radio"
                name="status"
                value={Status.New}
                id="new"
                className="statusRadioButtons"
                checked={item?.status === Status.New}
                onChange={changeStatus}
              />
              <label htmlFor="new">New</label>
            </div>

            <div className="drawerRadioButtonContainer">
              <input
                type="radio"
                name="status"
                value={Status.Complete}
                id="complete"
                className="statusRadioButtons"
                checked={item?.status === Status.Complete}
                onChange={changeStatus}
              />
              <label htmlFor="complete">Complete</label>
            </div>

            <div className="drawerRadioButtonContainer">
              <input
                type="radio"
                name="status"
                value={Status.InProgress}
                id="inProgress"
                className="statusRadioButtons"
                checked={item?.status === Status.InProgress}
                onChange={changeStatus}
              />
              <label htmlFor="inProgress">In-Progress</label>
            </div>

            <div className="drawerRadioButtonContainer">
              <input
                type="radio"
                name="status"
                value={Status.OnHold}
                id="onHold"
                className="statusRadioButtons"
                checked={item?.status === Status.OnHold}
                onChange={changeStatus}
              />
              <label htmlFor="onHold">On Hold</label>
            </div>

            <div className="drawerRadioButtonContainer">
              <input
                type="radio"
                name="status"
                value={Status.Archieved}
                id="archieved"
                className="statusRadioButtons"
                checked={item?.status === Status.Archieved}
                onChange={changeStatus}
              />
              <label htmlFor="archieved">Archieved</label>
            </div>
          </div>
        </div>

        <input type="submit" value="Save" id="drawerSaveButton" />
      </form>
    </section>
  );
};

export default Drawer;
