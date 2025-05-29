"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autor = void 0;
const Usuario_1 = require("./Usuario");
class Autor extends Usuario_1.Usuario {
    constructor(id, nome, email, tipo, livrosEscritosID) {
        super(id, nome, email, tipo);
        this.livrosEscritosID = livrosEscritosID;
    }
}
exports.Autor = Autor;
