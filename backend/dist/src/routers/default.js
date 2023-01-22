"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
/* Creación de un nuevo objeto de enrutador. */
exports.defaultRouter = express.Router();
/* Esta es una ruta general que se usará si ninguna otra ruta coincide. */
exports.defaultRouter.all('*', (_, res) => {
    res.status(404).send();
});
