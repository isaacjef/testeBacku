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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sessao = exports.interfaceBiblio = exports.form = exports.prisma = void 0;
const log_1 = require("./log");
const TipoUsuario_1 = require("./enumeracao/TipoUsuario");
const Usuario_1 = require("./modelos/Usuario");
const client_1 = require("../src/generated/prisma/client");
const InterfaceBiblio_1 = require("./console/InterfaceBiblio");
const InterfaceUsuario_1 = require("./console/InterfaceUsuario");
//Exportando a conexão com o banco de dados de forma a reaproveitá-la, para que o bd não fique sobrecarregado com muitas instâncias de 'new PrismaClient(()'. Caso queira ver um log das consultas, basta descomentar e comentar a linha de baixo.
//export const prisma = new PrismaClient({ log: ['query'] });
exports.prisma = new client_1.PrismaClient();
exports.form = new InterfaceUsuario_1.InterfaceUsuario();
exports.interfaceBiblio = new InterfaceBiblio_1.InterfaceBiblio();
let Sessao = class Sessao {
};
exports.Sessao = Sessao;
Sessao.email = '';
__decorate([
    log_1.logAt,
    __metadata("design:type", String)
], Sessao, "email", void 0);
exports.Sessao = Sessao = __decorate([
    (0, log_1.name)('Sessao')
], Sessao);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //Tratar readline de Categoria Livro;
        //Para exemplificar o uso de metadados, vamos utilizar a classe Usuario e UsuarioService:
        const usuarioLog = new Usuario_1.Usuario(1, "username", "password", "email@", TipoUsuario_1.TipoUsuario.CLIENTE);
        exports.form.iniciar();
        //Para acessar a página de bibliotecario -> Login -> email: admin@a & senha: admin
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield exports.prisma.$disconnect();
    process.exit(1);
}));
/*
//Bibliotecário primário
await prisma.usuario.create({
    data: {
        nome: `Admin`,
        senha: `admin`,
        email: `admin@a`,
        tipo: TipoUsuario.BIBLIO,
    },
})*/
