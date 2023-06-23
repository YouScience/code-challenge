"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomList = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const ListItemDrawer_1 = require("../ListItemDrawer");
function CustomList() {
  const data = ["item", "item", "item", "item"];
  return (
    <div>
      <material_1.List>
        {data.map((item) => (
          <material_1.ListItem>{item}</material_1.ListItem>
        ))}
      </material_1.List>
      <ListItemDrawer_1.ListItemDrawer />
    </div>
  );
}
exports.CustomList = CustomList;
