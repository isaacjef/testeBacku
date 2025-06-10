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
            const verificacao = JSON.parse(yield rep.findByEmail(email));
            //Verifica se verificacao é nulo ou não &
            //Se não for nulo, então já existe um usuário com o email passado como parâmetro cadastrado.
            //Utilizado no método cadastrarUsuario() de InterfaceUsuario.
            if (verificacao === null) {
                yield rep.save(nome, senha, email);
                console.log("Usuário foi salvo no banco de dados com sucesso.");
                return true;
            }
            else {
                console.log("Usuário já cadastrado!");
                return false;
            }
        });
    }
    //Tratar retorno nulo de findByEmail
    login(senha, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = JSON.parse(yield rep.findByEmail(email));
            //Verifica primeiro se usuario é nulo & 
            //Se a senha informada pelo usuário é iguais à credencial cadastrada anteriormente.
            //Utilizado no método logarUsuario() de InterfaceUsuario.
            if (usuario !== null && senha == usuario.senha) {
                return true;
            }
            else {
                console.log("Usuário não cadastrado!");
                return false;
            }
            /*return new Promise((resolve) => {
                setTimeout(() => {
                    resolve("ASync teste");
                });
            });*/
        });
    }
    //Utiliza o método findByEmail de repository e converte o objeto Usuario que foi retornado em formato JSON.
    //Verifica se o objeto Usuario é nulo.
    //Método implementado em getEmprestimo(), de EmprestimoService; Em home(), de InterfaceUsuario.
    getUsuario(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userS = JSON.parse(yield rep.findByEmail(email));
            if (userS !== null)
                return userS;
            else
                return null;
        });
    }
    //Utiliza o método findByID de repository e converte o objeto Usuario que foi retornado em formato JSON.
    //Verifica se o objeto Usuario é nulo.
    //
    getUsuarioByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userS = JSON.parse(yield rep.findByID(id));
            if (userS !== null)
                return userS;
            else
                return null;
        });
    }
}
exports.UsuarioService = UsuarioService;
