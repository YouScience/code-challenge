"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const index_1 = require("./index");
describe('ListItemDrawer', () => {
    const TestComponent = (props) => {
        return <index_1.ListItemDrawer {...props}/>;
    };
    it('should render', () => {
        const { getByText } = (0, react_2.render)(<TestComponent />);
        expect(getByText('This is the drawer'));
    });
});
