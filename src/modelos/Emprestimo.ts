import { StatusEmprestimo } from "../enumeracao/StatusLivro"
import { ModeloBase } from "./ModeloBase"

export class Emprestimo extends ModeloBase {
    livroID: string;
    usuarioID: string;
    dataEmprestimo?: Date;
    dataVencimento?: Date;
    dataRetorno?: Date;
    status?: StatusEmprestimo;

    constructor(
        //id: string,
        livroID: string,
        usuarioID: string,
        dataEmprestimo: Date,
        dataVencimento: Date
    ) {
        super();
        this.livroID = livroID;
        this.usuarioID = usuarioID;
        this.dataEmprestimo = dataEmprestimo;
        this.dataVencimento = dataVencimento;
        this.status = StatusEmprestimo.ATIVO;
    }
}
