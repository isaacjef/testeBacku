"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
class Livro {
    /*private autor?: Autor;*/
    constructor(id, titulo, isbn, categoria, anoPublicacao) {
        this._id = id;
        this._titulo = titulo;
        this._isbn = isbn;
        this._categoria = categoria;
        this._anoPublicacao = anoPublicacao;
        /*this.autor = autor;*/
    }
    get titulo() {
        return this._titulo;
    }
    get isbn() {
        return this._isbn;
    }
    get categoria() {
        return this._categoria;
    }
    get anoPublicacao() {
        return this._anoPublicacao;
    }
}
exports.Livro = Livro;
/* DESCRIÇÃO:
 *  Classe representa um Livro em nosso sistema
 *  tal que o mesmo possui autor unico (pode ser alterado)
 *
 */
