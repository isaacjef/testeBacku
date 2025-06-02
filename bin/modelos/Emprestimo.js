"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
//export class Emprestimo extends ModeloBase {
class Emprestimo {
    constructor(livroID, usuarioID) {
        this.livroID = livroID;
        this.usuarioID = usuarioID;
        //this.status = StatusEmprestimo.ATIVO;
    }
}
exports.Emprestimo = Emprestimo;
