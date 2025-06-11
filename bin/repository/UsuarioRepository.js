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
const TipoUsuario_1 = require("../enumeracao/TipoUsuario");
//Repository de Usuario, responsável por executar as operações de CRUD.
class UsuarioRepository {
    //Salvar usuário no banco de dados, através dos parâmetros passados.
    save(nome, senha, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield index_1.prisma.usuario.create({
                    data: {
                        nome: `${nome}`,
                        senha: `${senha}`,
                        email: `${email}`,
                        tipo: TipoUsuario_1.TipoUsuario.CLIENTE,
                    },
                });
            }
            catch (error) {
                console.log("Usuário não inserido: " + error.message);
            }
        });
    }
    //Salvar bibliotecário no banco de dados.
    saveBiblio(nome, senha, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield index_1.prisma.usuario.create({
                    data: {
                        nome: `${nome}`,
                        senha: `${senha}`,
                        email: `${email}`,
                        tipo: TipoUsuario_1.TipoUsuario.BIBLIO,
                    },
                });
            }
            catch (error) {
                console.log("Usuário não inserido: " + error.message);
            }
        });
    }
    //Tratar possível retorno nulo em UsuarioService, ou em InterfaceUsuario
    //Encontra usuário no banco de dados via e-mail. Retorna uma string JSON com os dados obtidos.
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userR = yield index_1.prisma.usuario.findUnique({ where: { email: email } });
            return JSON.stringify(userR);
        });
    }
    //Tratar possível retorno nulo em UsuarioService, ou em InterfaceUsuario
    //Encontra usuário no banco de dados via id. Retorna uma string JSON com os dados obtidos.
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userR = yield index_1.prisma.usuario.findUnique({ where: { id: id } });
            return JSON.stringify(userR);
        });
    }
    //Consulta todos os usuarios do banco de dados. Utilizado em getUsuarios() de UsuarioService
    consultarUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = JSON.stringify(yield index_1.prisma.$queryRawUnsafe(`SELECT * FROM Usuario`));
            return usuarios;
        });
    }
    //Método simples que permite modificar o nome do Usuário
    updateByEmail(email, nome) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield index_1.prisma.usuario.update({
                    where: {
                        email: `${email}`
                    },
                    data: {
                        nome: `${nome}`,
                    },
                });
            }
            catch (error) {
                console.log("Nome não atualizado: " + error.message);
            }
        });
    }
    //Método que permite deletar algum usuario via email.
    deleteByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield index_1.prisma.usuario.delete({
                    where: {
                        email: `${email}`
                    },
                });
            }
            catch (error) {
                console.log("Usuário não deletado: " + error.message);
            }
        });
    }
}
exports.UsuarioRepository = UsuarioRepository;
