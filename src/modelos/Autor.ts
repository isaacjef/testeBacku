import { TipoUsuario } from "../enumeracao/TipoUsuario"
import { Livro } from "./Livro";
import { Usuario } from "./Usuario";

export class Autor extends Usuario {
    livrosEscritosID: Livro[]; //Passar ID dos livros escritos

    constructor(nome: string, email: string,cpf: string , tipo: TipoUsuario, livrosEscritosID: Livro[]) {
        super(nome, email, cpf, tipo);
        this.livrosEscritosID = livrosEscritosID;
    }
}