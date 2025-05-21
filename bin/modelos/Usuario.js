"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(name, email, cpf, tipo) {
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.tipo = tipo;
        this.livrosEmprestados = [];
    }
}
exports.Usuario = Usuario;
