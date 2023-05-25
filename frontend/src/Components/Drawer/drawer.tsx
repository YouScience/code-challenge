import React, { useEffect, useState } from "react";
import { ListModel, Status } from "../CustomList/customListModel";

import "./drawer.css";
import axios from "axios";

type DrawerProps = {
  item: ListModel;
  listData: ListModel[];
  setListData: React.Dispatch<React.SetStateAction<ListModel[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<ListModel | null>>;
};

const Drawer = (props: DrawerProps) => {
  const { listData, setListData, setIsLoading, setSelectedItem } = props;

  const [item, setItem] = useState<ListModel>();

  function onSave(event: React.FormEvent<HTMLFormElement>) {
    //To prevent default form submit action.
    event.preventDefault();

    //Validations before update / insert.
    if (
      (item?.name.length ?? 0) > 32 ||
      (item?.description.length ?? 0) > 100
    ) {
      alert("Kindly clear all errors before saving");
      return;
    }

    const payload = { listItems: listData, itemData: item };

    setIsLoading(true);

    if (item?.id === "new") {
      //Add new Item.
      axios
        .post(`http://localhost:8000/item/${item?.id}`, payload)
        .then((response) => {
          setListData(response.data);
        })
        .catch((e) => {
          console.log(e);
          alert("Operation Failed");
        })
        .finally(() => setIsLoading(false));
    } else {
      //Update existing item.
      axios
        .put(`http://localhost:8000/item/${item?.id}`, payload)
        .then((response) => {
          setListData(response.data);
        })
        .catch((e) => {
          console.log(e);
          alert("Operation Failed");
        })
        .finally(() => setIsLoading(false));
    }

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
      <form onSubmit={(event) => onSave(event)} id="drawerForm">
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
              required={true}
              autoFocus={true}
              onChange={(e) =>
                setItem((prevState) => {
                  return { ...prevState!, name: e.target.value };
                })
              }
            />
            {(item?.name.length ?? 0) > 32 && (
              <p className="drawerErrorLabel">
                * Name should should not exceed 32 characters
              </p>
            )}
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
            {(item?.description.length ?? 0) > 100 && (
              <p className="drawerErrorLabel">
                * Description should should not exceed 100 characters
              </p>
            )}
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
