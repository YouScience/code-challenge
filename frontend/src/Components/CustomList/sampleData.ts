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

export const data: ListModel[] = [
  {
    id: uuid(),
    name: "naruto",
    viewed: false,
    description: "decription about naruto",
    status: Status.OnHold,
  },
  {
    id: uuid(),
    name: "luffy",
    viewed: false,
    description: "decription about luffy",
    status: Status.New,
  },
  {
    id: uuid(),
    name: "zenitsu",
    viewed: false,
    description: "decription about zenitsu",
    status: Status.New,
  },
  {
    id: uuid(),
    name: "goku",
    viewed: false,
    description: "decription about goku",
    status: Status.New,
  },
  {
    id: uuid(),
    name: "itachi",
    viewed: false,
    description: "decription about itachi",
    status: Status.New,
  },
];
