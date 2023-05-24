import React, { useEffect, useState } from "react";
import { ListModel, Status } from "./sampleData";
import { v4 as uuid } from "uuid";

type DrwerProps = {
  item: ListModel;
  setListData: React.Dispatch<React.SetStateAction<ListModel[]>>;
};

const Drawer = (props: DrwerProps) => {
  const { setListData } = props;

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
    <section key={item?.id}>
      <form onSubmit={(event) => accordOnSave(event)}>
        <label htmlFor="userName">Name</label>
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
        <label htmlFor="viewed">Viewed</label>

        <label htmlFor="description">Description</label>
        <input
          type="textarea"
          id="description"
          value={item?.description}
          onChange={(e) =>
            setItem((prevState) => {
              return { ...prevState!, description: e.target.value };
            })
          }
        />

        <div onChange={changeStatus}>
          <input
            type="radio"
            name="status"
            value={Status.New}
            id="new"
            checked={item?.status === Status.New}
            onChange={changeStatus}
          />
          <label htmlFor="new">New</label>

          <input
            type="radio"
            name="status"
            value={Status.Complete}
            id="complete"
            checked={item?.status === Status.Complete}
            onChange={changeStatus}
          />
          <label htmlFor="complete">Complete</label>

          <input
            type="radio"
            name="status"
            value={Status.InProgress}
            id="inProgress"
            checked={item?.status === Status.InProgress}
            onChange={changeStatus}
          />
          <label htmlFor="inProgress">In-Progress</label>

          <input
            type="radio"
            name="status"
            value={Status.OnHold}
            id="onHold"
            checked={item?.status === Status.OnHold}
            onChange={changeStatus}
          />
          <label htmlFor="onHold">On Hold</label>

          <input
            type="radio"
            name="status"
            value={Status.Archieved}
            id="archieved"
            checked={item?.status === Status.Archieved}
            onChange={changeStatus}
          />
          <label htmlFor="archieved">Archieved</label>
        </div>

        <input type="submit" value="Save" />
      </form>
    </section>
  );
};

export default Drawer;
