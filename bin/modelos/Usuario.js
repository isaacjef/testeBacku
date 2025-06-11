"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const TipoUsuario_1 = require("../enumeracao/TipoUsuario");
const log_1 = require("../log");
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
__decorate([
    log_1.logAt,
    __metadata("design:type", Number)
], Usuario.prototype, "_id", void 0);
__decorate([
    log_1.logAt,
    __metadata("design:type", String)
], Usuario.prototype, "_nome", void 0);
__decorate([
    log_1.logAt,
    __metadata("design:type", String)
], Usuario.prototype, "_senha", void 0);
__decorate([
    log_1.logAt,
    __metadata("design:type", String)
], Usuario.prototype, "_email", void 0);
__decorate([
    log_1.logAt,
    __metadata("design:type", String)
], Usuario.prototype, "_tipo", void 0);
__decorate([
    log_1.logAt,
    __metadata("design:type", Array)
], Usuario.prototype, "livrosEmprestados", void 0);
exports.Usuario = Usuario = __decorate([
    (0, log_1.name)('Usuario'),
    __metadata("design:paramtypes", [Number, String, String, String, String])
], Usuario);
/* Exemplo de setter;
*    public set nome(nome: string) {
*    	this._nome = nome;
*    }
*/
