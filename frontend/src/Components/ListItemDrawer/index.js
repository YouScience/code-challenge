"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemDrawer = void 0;
// The following links may provide some assistance
// https://material-ui.com/components/text-fields/#api
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
function ListItemDrawer(props) {
    const [drawerOpen, openDrawer] = react_1.default.useState(true);
    const defaultState = {
        name: '',
        viewed: 'false',
        description: '',
        status: false,
    };
    return (<material_1.Drawer open={drawerOpen} onClose={openDrawer} anchor='right' variant='persistent' style={{ width: 200, flexShrink: 0 }}>
      <h2>This is the drawer</h2>
      <material_1.Input name='name' value='' onChange={() => { }}/>
      <label>Description</label>
      <input name='somethingElse' value={defaultState.name} type='text' onChange={() => { }}/>
      <material_1.FormLabel>This is a label</material_1.FormLabel>
      <material_1.Checkbox value={false}/>
      <material_1.RadioGroup name='status' value={defaultState.status}>
        <material_1.FormControlLabel value='' label='option' control={<material_1.Radio />}/>
        <label>
          {' '}
          this is a label
          <material_1.Radio />
        </label>
        <material_1.Radio checked onChange={() => { }} value='a' name='radio-button-demo'/>
      </material_1.RadioGroup>
    </material_1.Drawer>);
}
exports.ListItemDrawer = ListItemDrawer;
