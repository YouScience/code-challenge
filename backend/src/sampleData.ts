import {v4 as uuid} from 'uuid';

export enum Status {
    New = "new",
    Complete = "complete",
    InProgress = "inProgress",
    OnHold = "onHold",
    Archieved = "archieved",
  }
  
export type ListModel = {
    id: string,
    name: string,
    viewed: boolean,
    description: string,
    status: Status,
  }

export let sampleData: ListModel[] = [
    {
      id: uuid(),
      name: "Naruto",
      viewed: false,
      description: "decription about naruto",
      status: Status.OnHold,
    },
    {
      id: uuid(),
      name: "Luffy",
      viewed: false,
      description: "decription about luffy",
      status: Status.New,
    },
    {
      id: uuid(),
      name: "Zenitsu",
      viewed: false,
      description: "decription about zenitsu",
      status: Status.New,
    },
    {
      id: uuid(),
      name: "Goku",
      viewed: false,
      description: "decription about goku",
      status: Status.New,
    },
    {
      id: uuid(),
      name: "Itachi",
      viewed: false,
      description: "decription about itachi",
      status: Status.New,
    },
  ];