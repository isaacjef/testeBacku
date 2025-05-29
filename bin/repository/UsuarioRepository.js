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
exports.UsuarioRepository = void 0;
const index_1 = require("../index");
const Usuario_1 = require("../modelos/Usuario");
const TipoUsuario_1 = require("../enumeracao/TipoUsuario");
class UsuarioRepository {
    save(nome, email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.prisma.usuario.create({
                data: {
                    nome: `${nome}`,
                    email: `${email}`,
                    tipo: TipoUsuario_1.TipoUsuario.CLIENTE,
                },
            });
        });
    }
    //Tratar possível retorno nulo em UsuarioService, ou em InterfaceUsuario
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = yield index_1.prisma.usuario.findUnique({ where: { email: email } });
            if (r && r.tipo == 'Membro') {
                return new Usuario_1.Usuario(r.id, r.nome, r.email, TipoUsuario_1.TipoUsuario.CLIENTE);
            }
            else if (r && r.tipo == 'Administrador') {
                return new Usuario_1.Usuario(r.id, r.nome, r.email, TipoUsuario_1.TipoUsuario.ADMIN);
            }
            else {
                return null;
            }
        });
    }
    listarUsuarios() {
        throw new Error("Method not implemented.");
    }
}
exports.UsuarioRepository = UsuarioRepository;
