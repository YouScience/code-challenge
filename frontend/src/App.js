"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./styles.css");
const material_1 = require("@mui/material");
const CustomList_1 = require("./Components/CustomList");
function App() {
  return (
    <div>
      <material_1.AppBar
        position="fixed"
        style={{
          backgroundColor: "blue",
        }}
      >
        <material_1.Toolbar>
          <material_1.Typography variant="h6" noWrap>
            My List Of Stuff
          </material_1.Typography>
        </material_1.Toolbar>
      </material_1.AppBar>
      <CustomList_1.CustomList />
    </div>
  );
}
exports.default = App;
