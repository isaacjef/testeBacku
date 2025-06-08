"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const index_1 = require("../index");
let Usuario = class Usuario {
    constructor(id, nome, senha, email, tipo) {
        this._id = id;
        this._nome = nome;
        this._senha = senha;
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
    get senha() {
        return this._senha;
    }
    get email() {
        return this._email;
    }
    get tipo() {
        return this._tipo;
    }
};
exports.Usuario = Usuario;
exports.Usuario = Usuario = __decorate([
    index_1.simples
], Usuario);
/* Exemplo de setter;
*    public set nome(nome: string) {
*    	this._nome = nome;
*    }
*/
