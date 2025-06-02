import { CategoriaLivro } from "../enumeracao/CategoriaLivro"
import { Autor } from "./Autor";
import { ModeloBase } from "./ModeloBase"

export class Livro extends ModeloBase {
    private _titulo: string;
    private _isbn: string;
    /*private autor?: Autor;
    private _categoria?: CategoriaLivro;
    private _anoPublicacao?: number;
    private _copiasDisponiveis?: number;
    private _totalCopias?: number;*/

    constructor(
    	id: number,
        titulo: string,
        isbn: string,
        /*autor?: Autor,
        categoria?: CategoriaLivro,
        anoPublicacao?: number,
        copiasDisponiveis?: number,
        totalCopias?: number*/
    ) {
        super(id);
        this._titulo = titulo;
        this._isbn = isbn;
        /*this.autor = autor;
        this.categoria = categoria;
        this.anoPublicacao = anoPublicacao;
        this.copiasDisponiveis = totalCopias;
        this.totalCopias = totalCopias;*/
    }
    
    public get titulo() {
    	return this._titulo;
    }
    
    public get isbn(): string {
    	return this._isbn;
    }
}

/* DESCRIÇÃO:
 *  Classe representa um Livro em nosso sistema
 *  tal que o mesmo possui autor unico (pode ser alterado)
 * 
 */
