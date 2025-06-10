"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.InterfaceUsuario = void 0;
const readlineSync = __importStar(require("readline-sync"));
const index_1 = require("../index");
const UsuarioService_1 = require("../service/UsuarioService");
const InterfaceConsulta_1 = require("../console/InterfaceConsulta");
const InterfaceEmprestimo_1 = require("../console/InterfaceEmprestimo");
//Instância de UsuarioService destinada a ser utilizada em todos os métodos da classe.
const usuarioS = new UsuarioService_1.UsuarioService();
const interfaceEmp = new InterfaceEmprestimo_1.InterfaceEmprestimo();
class InterfaceUsuario {
    //Página inicial do sistema. Direriona o usuário às páginas de Cadastro e Login.
    iniciar() {
        console.log(`|---------------Iniciando Sistema---------------|`);
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        console.log(`| . . . . . . . . [1] Cadastro  . . . . . . . . |`);
        console.log(`| . . . . . . . . [2] Login     . . . . . . . . |`);
        console.log(`| . . . . . . . . [0] Sair      . . . . . . . . |`);
        console.log(`|-----------------------------------------------|`);
        try {
            const resp = readlineSync.questionInt(`|~~> `, { limit: [0, 1, 2], limitMessage: 'Opção incorreta! Digite novamente: ' });
            if (resp == 1) {
                this.cadastrarUsuario();
            }
            else if (resp == 2) {
                this.logarUsuario();
            }
            else {
                this.desconectar();
            }
        }
        catch (error) {
            console.error("Erro:", error.message);
        }
    }
    //Página destinada ao cadastro de usuários. Implementa o método adicionarUsuario() de UsuarioService.
    cadastrarUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log(`|------------------- Cadastro  -----------------|`);
            console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
            console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
            try {
                const name = readlineSync.question(`|~~~> Nome:`);
                const senha = readlineSync.question(`|~~~> Senha:`);
                const email = readlineSync.questionEMail(`|~~~> E-mail:`);
                if (yield usuarioS.adicionarUsuario(name, senha, email)) {
                    console.clear();
                    console.log("Usuário cadastrado com sucesso!");
                    //Salva o email do usuário que está usando na classe Sessao, no atributo estático email;
                    index_1.Sessao.email = email;
                    //Direciona usuário a home();
                    this.home();
                }
                else {
                    console.clear();
                    console.log("Este e-mail já está cadastrado! Tente novamente.");
                    this.cadastrarUsuario();
                }
            }
            catch (error) {
                console.error("Erro: ", error.message);
            }
        });
    }
    //Página destinada ao login de usuários. Implementa o método login() de UsuarioService.
    logarUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log(`|-------------------  Login  -------------------|`);
            console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
            console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
            try {
                const email = readlineSync.questionEMail(`|~~~> E-mail:`);
                const senha = readlineSync.question(`|~~~> Senha:`);
                //verifica se o método login() retorna nulo, se não: direciona para a página Home.
                if (yield usuarioS.login(senha, email)) {
                    //Salva o email do usuário que está usando na classe Sessao, no atributo estático email;
                    index_1.Sessao.email = email;
                    //Direciona usuário a home();
                    this.home();
                }
                else {
                    console.log("Credenciais incorretas! Tente novamente.");
                    this.iniciar();
                }
            }
            catch (error) {
                console.error("Erro: ", error.message);
            }
        });
    }
    //Página Home, de entrada ao sistema.
    //Este método verifica se o usuário é um Membro ou Admin.
    //Direciona o Usuário à páginas de acordo com o seu tipo.
    home() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuarioS.getUsuario(index_1.Sessao.email);
            if (usuario !== null && usuario.tipo == 'Membro') {
                console.clear();
                console.log(`|-------------- Biblioteca Virtual -------------|`);
                console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
                console.log(`| . . . [1] Empréstimos  | [2] Devoluções . . . |`);
                console.log(`| . . . [3] Consulta     | [0] Sair       . . . |`);
                try {
                    const resp = readlineSync.questionInt(`|~~> `, { limit: [0, 1, 2, 3], limitMessage: 'Opção incorreta! Digite novamente: ' });
                    if (resp == 1) {
                        interfaceEmp.emprestimo();
                    }
                    else if (resp == 2) {
                        //this.logarUsuario();
                    }
                    else if (resp == 3) {
                        const consulta = new InterfaceConsulta_1.InterfaceConsulta();
                        consulta.homeConsulta();
                    }
                    else {
                        this.desconectar();
                    }
                }
                catch (error) {
                    console.error("Erro: ", error.message);
                }
            }
            else if (usuario !== null && usuario.tipo == 'Bibliotecário') {
                console.log(`|--------- Bem-vindo(a) Bibliotecário(a) -------|`);
                console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
                console.log(`| . . . . . [1] Gerenciar Livros          . . . |`);
                console.log(`| . . . . . [2] Gerenciar Usuários        . . . |`);
            }
            else {
                console.log("Usuário não cadastrado. Sistema encerrado.");
            }
        });
    }
    desconectar() {
        console.clear();
        console.log(`|~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~|`);
        console.log(`| .   .   .   .   .   .   .   .   .   .   .   . |`);
        console.log(`|   .   .   .   .   .   .   .   .   .   .   .   |`);
        console.log(`| .   .   .   .   DESCONECTADO    .   .   .   . |`);
        console.log(`|   .   .   .   .   .   .   .   .   .   .   .   |`);
        console.log(`| .   .   .   .   .   .   .   .   .   .   .   . |`);
        console.log(`|~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~|`);
        index_1.Sessao.email = '';
    }
}
exports.InterfaceUsuario = InterfaceUsuario;
