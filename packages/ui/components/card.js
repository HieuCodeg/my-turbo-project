"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = require("react");
var Card = function (_a) {
    var children = _a.children, className = _a.className;
    return (0, jsx_runtime_1.jsx)("div", { className: "rounded-xl border bg-card text-card-foreground ".concat(className), children: children });
};
exports.Card = Card;
