import { CategoriaLivro } from "../enumeracao/CategoriaLivro"
import { Autor } from "./Autor";
import { ModeloBase } from "./ModeloBase"

export class Livro extends ModeloBase {
    private titulo: string;
    private isbn: string;
    private autor?: Autor;
    private categoria?: CategoriaLivro;
    private anoPublicacao?: number;
    private copiasDisponiveis?: number;
    private totalCopias?: number;

    constructor(
        titulo: string,
        isbn: string,
        autor: Autor,
        categoria: CategoriaLivro,
        anoPublicacao: number,
        totalCopias: number
    ) {
        super(id);
        this.titulo = titulo;
        this.isbn = isbn;
        this.autor = autor;
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
