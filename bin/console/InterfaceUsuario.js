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
const UsuarioService_1 = require("../service/UsuarioService");
const InterfaceConsulta_1 = require("../console/InterfaceConsulta");
const usuarioS = new UsuarioService_1.UsuarioService();
class InterfaceUsuario {
    iniciar() {
        console.log(`|---------------Iniciando Sistema---------------|`);
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        console.log(`| . . . . . . . . [1] Cadastro  . . . . . . . . |`);
        console.log(`| . . . . . . . . [2] Login     . . . . . . . . |`);
        try {
            const resp = readlineSync.question(`                      `, { limit: [1, 2], limitMessage: 'Opção incorreta! Digite novamente: ' });
            if (resp == '1')
                this.cadastrarUsuario();
            else
                this.logarUsuario();
        }
        catch (error) {
            console.error("Erro:", error.message);
        }
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        console.log(`|-----------------------------------------------|`);
    }
    cadastrarUsuario() {
        console.log(`|------------------- Cadastro  -----------------|`);
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        try {
            const name = readlineSync.question(`| Nome:`);
            //utilizar readlineSync.questionEMail
            const email = readlineSync.question(`| E-mail:`);
            usuarioS.adicionarUsuario(name, email);
        }
        catch (error) {
            console.error("Erro: ", error.message);
        }
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        console.log(`|-----------------------------------------------|`);
    }
    logarUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`|-------------------  Login  -------------------|`);
            console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
            try {
                const name = readlineSync.question(`| Nome:`);
                //Posteriormente, substituir nome por senha...
                const email = readlineSync.question(`| E-mail:`);
                //const usuario = new UsuarioService();
                //verifica se deu certo, se sim: entra no sistema.
                if (yield usuarioS.login(name, email)) {
                    this.home(email);
                }
                else {
                    console.log("Credenciais incorretas! Digite novamente.");
                    this.iniciar();
                }
            }
            catch (error) {
                console.error("Erro: ", error.message);
            }
            console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
            console.log(`|-----------------------------------------------|`);
        });
    }
    home(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuarioS.getUsuario(email);
            if (usuario && usuario.tipo == 'Membro') {
                console.log(`|-------------- Biblioteca Virtual -------------|`);
                console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
                console.log(`| . . . [1] Empréstimos  | [2] Devoluções . . . |`);
                console.log(`| . . . [3] Consulta     |      . . . . . . . . |`);
                try {
                    const resp = readlineSync.question(`                      `, { limit: [1, 2, 3], limitMessage: 'Opção incorreta! Digite novamente: ' });
                    if (resp == '1') {
                        //this.emprestimo(email);
                    }
                    else if (resp == '2') {
                        //this.logarUsuario();
                    }
                    else {
                        const consulta = new InterfaceConsulta_1.InterfaceConsulta();
                        consulta.iniciarConsulta();
                    }
                }
                catch (error) {
                    console.error("Erro: ", error.message);
                }
                console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
                console.log(`|-----------------------------------------------|`);
            }
        });
    }
    emprestimo(email) {
        console.log(`|----------------  Empréstimo  -----------------|`);
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        //Listar todos os livros pegos pelo usuario.
        //Seção para realizar um empréstimo
        try {
            const titulo = readlineSync.question(`| Título:`);
        }
        catch (error) {
            console.error("Erro:", error.message);
        }
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
    }
}
exports.InterfaceUsuario = InterfaceUsuario;
