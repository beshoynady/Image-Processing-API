"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexroute_1 = __importDefault(require("./routes/indexroute"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/image', indexroute_1.default);
app.get('/', (req, res) => {
    res.send('Hi in the API page');
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
exports.default = app;
