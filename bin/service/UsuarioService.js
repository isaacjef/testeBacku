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
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
//Instância de UsuarioRepository destinada a ser utilizada em todos os métodos da classe.
const rep = new UsuarioRepository_1.UsuarioRepository();
class UsuarioService {
    //Utiliza o método save() de UsuarioRepository para adicionar usuários no banco de dados. 
    //É implementado na classe InterfaceUsuario
    adicionarUsuario(nome, senha, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificacao = yield rep.findByEmail(email);
            //Verifica se verificacao é nulo ou não. Se não for nulo, então já existe um usuário com o email passado como parâmetro cadastrado.
            if (verificacao) {
                return true;
            }
            else {
                rep.save(nome, senha, email);
                return false;
            }
        });
    }
    //Tratar retorno nulo de findByEmail
    login(senha, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield rep.findByEmail(email);
            //Verifica primeiro se const usuario é nulo & 
            //Se a senha e email informados pelo usuário são iguais às credenciais cadastradas anteriormente.
            if (usuario && senha == usuario.senha && email == usuario.email) {
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
    getUsuario(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userS = yield rep.findByEmail(email);
            if (userS)
                //return new Usuario(userS.id, userS.nome, userS.email, userS.tipo);
                return userS;
            else
                return null;
        });
    }
}
exports.UsuarioService = UsuarioService;
