import { TipoUsuario } from "../enumeracao/TipoUsuario"
import { ModeloBase } from "./ModeloBase"

export class Usuario {
    id?: number;
    name: string;
    email: string;
    cpf?: string;
    tipo?: TipoUsuario;
    livrosEmprestados?: string[];
	
    constructor(name: string, email: string,cpf: string , tipo: TipoUsuario) {
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.tipo = tipo;
        this.livrosEmprestados = [];
    }
}
