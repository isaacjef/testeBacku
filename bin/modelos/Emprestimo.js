"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
class Emprestimo {
    //dataRetorno?
    constructor(livroID, usuarioID, dataEmprestimo, dataVencimento) {
        this._livroID = livroID;
        this._usuarioID = usuarioID;
        this._dataEmprestimo = dataEmprestimo;
        this._dataVencimento = dataVencimento;
    }
    get livroID() {
        return this._livroID;
    }
    get usuarioID() {
        return this._usuarioID;
    }
    get dataEmprestimo() {
        return this._dataEmprestimo;
    }
    get dataVencimento() {
        return this._dataVencimento;
    }
    get status() {
        return this._status;
    }
}
exports.Emprestimo = Emprestimo;
