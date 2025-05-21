import { CategoriaLivro } from "../enumeracao/CategoriaLivro"
import { Autor } from "./Autor";
import { ModeloBase } from "./ModeloBase"

export class Livro extends ModeloBase {
    private titulo: string;
    private autor?: Autor;
    private isbn: string;
    private categoria?: CategoriaLivro;
    private anoPublicacao?: number;
    private copiasDisponiveis?: number;
    private totalCopias?: number;

    constructor(
        //id: string,
        titulo: string,
        autor: Autor,
        isbn: string,
        categoria: CategoriaLivro,
        anoPublicacao: number,
        totalCopias: number
    ) {
        super();
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.categoria = categoria;
        this.anoPublicacao = anoPublicacao;
        this.copiasDisponiveis = totalCopias;
        this.totalCopias = totalCopias;
    }
}

/* DESCRIÇÃO:
 *  Classe representa um Livro em nosso sistema
 *  tal que o mesmo possui autor unico (pode ser alterado)
 * 
 */
