"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(id, nome, email, tipo) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._tipo = tipo;
        this.livrosEmprestados = [];
    }
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get email() {
        return this._email;
    }
    get tipo() {
        return this._tipo;
    }
}
exports.Usuario = Usuario;
/* Exemplo de setter;
*    public set nome(nome: string) {
*    	this._nome = nome;
*    }
*/
