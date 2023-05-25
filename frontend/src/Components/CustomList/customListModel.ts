export type ListModel = {
  id: string,
  name: string,
  viewed: boolean,
  description: string,
  status: Status,
}

export enum Status {
  New = "new",
  Complete = "complete",
  InProgress = "inProgress",
  OnHold = "onHold",
  Archieved = "archieved",
}
