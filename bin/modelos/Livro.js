"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
const ModeloBase_1 = require("./ModeloBase");
class Livro extends ModeloBase_1.ModeloBase {
    /*private autor?: Autor;
    private _categoria?: CategoriaLivro;
    private _anoPublicacao?: number;
    private _copiasDisponiveis?: number;
    private _totalCopias?: number;*/
    constructor(id, titulo, isbn) {
        super(id);
        this._titulo = titulo;
        this._isbn = isbn;
        /*this.autor = autor;
        this.categoria = categoria;
        this.anoPublicacao = anoPublicacao;
        this.copiasDisponiveis = totalCopias;
        this.totalCopias = totalCopias;*/
    }
    get titulo() {
        return this._titulo;
    }
    get isbn() {
        return this._isbn;
    }
}
exports.Livro = Livro;
/* DESCRIÇÃO:
 *  Classe representa um Livro em nosso sistema
 *  tal que o mesmo possui autor unico (pode ser alterado)
 *
 */
