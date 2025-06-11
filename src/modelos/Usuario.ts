import { TipoUsuario } from "../enumeracao/TipoUsuario"
import { ModeloBase } from "./ModeloBase"
import { name, logAt } from '../log';

@name('Usuario')
export class Usuario {
	@logAt
    private _id: number;
    @logAt
    private _nome: string;
    @logAt
    private _senha: string;
    @logAt
    private _email: string;
    @logAt
    private _tipo: TipoUsuario;
    @logAt
    livrosEmprestados?: string[];
	
    constructor(id: number, nome: string, senha: string, email: string, tipo: TipoUsuario) {
        this._id = id;
        this._nome = nome;
        this._senha = senha;
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
        
    public get senha() {
    	return this._senha;
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
