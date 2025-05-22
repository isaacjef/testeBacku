"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
const ModeloBase_1 = require("./ModeloBase");
class Livro extends ModeloBase_1.ModeloBase {
    /*private autor?: Autor;
    private categoria?: CategoriaLivro;
    private anoPublicacao?: number;
    private copiasDisponiveis?: number;
    private totalCopias?: number;*/
    constructor(id, titulo, isbn) {
        super(id);
        this.titulo = titulo;
        this.isbn = isbn;
        /*this.autor = autor;
        this.categoria = categoria;
        this.anoPublicacao = anoPublicacao;
        this.copiasDisponiveis = totalCopias;
        this.totalCopias = totalCopias;*/
    }
}
exports.Livro = Livro;
/* DESCRIÇÃO:
 *  Classe representa um Livro em nosso sistema
 *  tal que o mesmo possui autor unico (pode ser alterado)
 *
 */
