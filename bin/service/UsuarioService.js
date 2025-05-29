"use strict";
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
exports.UsuarioService = void 0;
const index_1 = require("../index");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
class UsuarioService {
    //Palavra-chave await em consultas (querys) sql são essenciais, se não os métodos (querys) retornarão
    //algo do tipo: Promise { <pending> }
    adicionarUsuario(nome, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const repositorio = new UsuarioRepository_1.UsuarioRepository();
            repositorio.save(nome, email);
            yield index_1.prisma.$disconnect();
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve("ASync teste");
                }, 10);
            });
        });
    }
    //Tratar retorno nulo de findByEmail
    login(nome, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const n = new UsuarioRepository_1.UsuarioRepository();
            console.log("Testando usuario service " + email);
            const t = yield n.findByEmail(email);
            if (t && nome == t.nome && email == t.email) {
                return true;
            }
            else {
                return false;
            }
            /*return new Promise((resolve) => {
                setTimeout(() => {
                    resolve("ASync teste");
                });
            });*/
        });
    }
}
exports.UsuarioService = UsuarioService;
