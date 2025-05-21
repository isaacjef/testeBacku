"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
const StatusLivro_1 = require("../enumeracao/StatusLivro");
const ModeloBase_1 = require("./ModeloBase");
class Emprestimo extends ModeloBase_1.ModeloBase {
    constructor(
    //id: string,
    livroID, usuarioID, dataEmprestimo, dataVencimento) {
        super();
        this.livroID = livroID;
        this.usuarioID = usuarioID;
        this.dataEmprestimo = dataEmprestimo;
        this.dataVencimento = dataVencimento;
        this.status = StatusLivro_1.StatusEmprestimo.ATIVO;
    }
}
exports.Emprestimo = Emprestimo;
