import { StatusEmprestimo } from "../enumeracao/StatusLivro"
import { ModeloBase } from "./ModeloBase"

//export class Emprestimo extends ModeloBase {
export class Emprestimo  {
    livroID: string;
    usuarioID: string;
    //dataEmprestimo?: Date;
    //dataVencimento?: Date;
    //dataRetorno?: Date;
    status?: StatusEmprestimo;

	constructor(
        livroID: string,
        usuarioID: string,

    ) {
        this.livroID = livroID;
        this.usuarioID = usuarioID;
        //this.status = StatusEmprestimo.ATIVO;
    }

    /*constructor(
    	id: number,
        livroID: string,
        usuarioID: string,
        dataEmprestimo: Date,
        dataVencimento: Date
    ) {
        super(id);
        this.livroID = livroID;
        this.usuarioID = usuarioID;
        this.dataEmprestimo = dataEmprestimo;
        this.dataVencimento = dataVencimento;
        this.status = StatusEmprestimo.ATIVO;
    }*/
}
