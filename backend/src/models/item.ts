type ItemStatus = "new" | "complete" | "in progress" | "on hold" | "archived";

interface Item {
  id: number;
  name: string;
  description?: string;
  status: ItemStatus;
  viewed: boolean;
}

export default Item;
