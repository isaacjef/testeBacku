import { TipoUsuario } from "../enumeracao/TipoUsuario"
import { ModeloBase } from "./ModeloBase"

export class Usuario {
    private _id: number;
    private _nome: string;
    private _email: string;
    private _tipo: TipoUsuario;
    livrosEmprestados?: string[];
	
    constructor(id: number, nome: string, email: string, tipo: TipoUsuario) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._tipo = tipo;
        this.livrosEmprestados = [];
    }
    
    public get id() {
    	return this._id;
    }
    
    public get nome() {
    	return this._nome;
    }
    
    public get email(): string {
    	return this._email;
    }
    
    public get tipo(): TipoUsuario {
    	return this._tipo;
    }
}

/* Exemplo de setter;
*    public set nome(nome: string) {
*    	this._nome = nome;
*    }
*/
