import { StatusEmprestimo } from "../enumeracao/StatusLivro"

export class Emprestimo  {
    private _livroID: string;
    private _usuarioID: string;
    private _dataEmprestimo: Date;
    private _dataVencimento: Date;
    private _status?: StatusEmprestimo;
    //dataRetorno?

	constructor(
        livroID: string,
        usuarioID: string,
		dataEmprestimo: Date,
        dataVencimento: Date
    ) {
        this._livroID = livroID;
        this._usuarioID = usuarioID;
        this._dataEmprestimo = dataEmprestimo;
        this._dataVencimento = dataVencimento;
    }
    
    public get livroID(): string {
    	return this._livroID;
    }
    
    public get usuarioID(): string {
    	return this._usuarioID;
    }
    
    public get dataEmprestimo(): Date {
    	return this._dataEmprestimo;
    }
    
    public get dataVencimento(): Date {
    	return this._dataVencimento;
    }
    
    public get status(): StatusEmprestimo | undefined {
    	return this._status;
    }
}
