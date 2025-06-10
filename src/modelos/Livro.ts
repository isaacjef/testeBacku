import { CategoriaLivro } from "../enumeracao/CategoriaLivro"
import { Autor } from "./Autor";

export class Livro {
	private _id: number;
    private _titulo: string;
    private _isbn: string;
    private _categoria: CategoriaLivro;
    private _anoPublicacao: number;
 	/*private autor?: Autor;*/

    constructor(
    	id: number,
        titulo: string,
        isbn: string,
        categoria: CategoriaLivro,
        anoPublicacao: number,
        /*autor?: number*/
    ) {
        this._id = id;
        this._titulo = titulo;
        this._isbn = isbn;
        this._categoria = categoria;
        this._anoPublicacao = anoPublicacao;
		/*this.autor = autor;*/
    }
    
    public get titulo() {
    	return this._titulo;
    }
    
    public get isbn(): string {
    	return this._isbn;
    }
    
    public get categoria(): CategoriaLivro {
    	return this._categoria;
    }
    
    public get anoPublicacao(): number {
    	return this._anoPublicacao;
    }
}

/* DESCRIÇÃO:
 *  Classe representa um Livro em nosso sistema
 *  tal que o mesmo possui autor unico (pode ser alterado)
 * 
 */
