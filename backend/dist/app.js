"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.mongo_connect, {}).then(() => {
    console.log("monngo connected succesfully");
});
require("./models");
app.listen(8001, () => {
    console.log("server started!");
});
