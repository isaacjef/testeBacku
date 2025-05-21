"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
const ModeloBase_1 = require("./ModeloBase");
class Livro extends ModeloBase_1.ModeloBase {
    constructor(
    //id: string,
    titulo, autor, isbn, categoria, anoPublicacao, totalCopias) {
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
exports.Livro = Livro;
/* DESCRIÇÃO:
 *  Classe representa um Livro em nosso sistema
 *  tal que o mesmo possui autor unico (pode ser alterado)
 *
 */
