import { TipoUsuario } from "../enumeracao/TipoUsuario"
import { Livro } from "./Livro";
import { Usuario } from "./Usuario";

export class Autor extends Usuario {
    livrosEscritosID: Livro[]; //Passar ID dos livros escritos

    constructor(id: number, nome: string, email: string, tipo: TipoUsuario, livrosEscritosID: Livro[]) {
        super(_id, _nome, _email, _tipo);
        this.livrosEscritosID = livrosEscritosID;
    }
}
