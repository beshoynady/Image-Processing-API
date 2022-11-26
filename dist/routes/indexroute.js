"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("../resize"));
const routes = express_1.default.Router();
routes.get('/', resize_1.default, (req, res) => {
    res.send(`Enter the image name, height and width to resize`);
});
exports.default = routes;
