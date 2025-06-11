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
exports.InterfaceEmprestimo = void 0;
const readlineSync = __importStar(require("readline-sync"));
const index_1 = require("../index");
const index_2 = require("../index");
const UsuarioService_1 = require("../service/UsuarioService");
const LivroService_1 = require("../service/LivroService");
const EmprestimoService_1 = require("../service/EmprestimoService");
//Instância de UsuarioService destinada a ser utilizada em todos os métodos da classe.
const empS = new EmprestimoService_1.EmprestimoService();
const userS = new UsuarioService_1.UsuarioService();
const livS = new LivroService_1.LivroService();
class InterfaceEmprestimo {
    //Página home de empréstimos
    emprestimo() {
        //Não limpar o console, para ver o resultado do Realizar Empréstimo
        console.log(`|----------------- Empréstimos -----------------|`);
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        console.log(`| . . . . . [0] Retornar            . . . . . . |`);
        console.log(`| . . . . . [1] Listar Empréstimos  . . . . . . |`);
        console.log(`| . . . . . [2] Realizar Empréstimo . . . . . . |`);
        console.log(`| . . . . . [3] Sair do Sistema     . . . . . . |`);
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        const resp = readlineSync.questionInt(`|~~> `, { limit: [0, 1, 2, 3], limitMessage: 'Opção incorreta! Digite novamente: ' });
        try {
            if (resp == 0) {
                console.clear();
                index_1.form.home();
            }
            else if (resp == 1) {
                console.clear();
                this.listarEmprestimo();
            }
            else if (resp == 2) {
                console.clear();
                this.realizarEmprestimo();
            }
            else {
                console.clear();
                index_1.form.desconectar();
            }
        }
        catch (error) {
            console.error("Erro:", error.message);
        }
    }
    //Página para listar todos os empréstimos de usuário.
    listarEmprestimo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log(`|-------------- Empréstimos Atuais -------------|`);
            try {
                yield empS.getEmprestimos(index_2.Sessao.email);
                console.log(`| . . . . . . .  [0] Retornar   . . . . . . . . |`);
                console.log(`| . . . . . . .  [1] Sair       . . . . . . . . |`);
                const resp = readlineSync.questionInt(`|~~> `, { limit: [0, 1], limitMessage: 'Opção incorreta! Digite novamente: ' });
                if (resp == 0) {
                    this.emprestimo();
                }
                else {
                    index_1.form.desconectar();
                }
            }
            catch (error) {
                console.error("Erro:", error.message);
            }
        });
    }
    //Antes de realizar o Empréstimo, o Usuário precisa informar o Livro. O Livro é encontrado via consulta. O sistema deve verificar o ID do Usuário.
    //A consulta por ISBN deve ser precisa.
    //A consulta por Título serve para o usuário verificar o ISBN do Livro.
    realizarEmprestimo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log(`|------------- Realizar Empréstimo -------------|`);
            console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
            console.log(`| . . . . [0] Retornar                    . . . |`);
            console.log(`| . . . . [1] Consultar Livro via ISBN    . . . |`);
            console.log(`| . . . . [2] Consultar Livro por Título  . . . |`);
            const resp = readlineSync.questionInt(`|~~> `, { limit: [0, 1, 2], limitMessage: 'Opção incorreta! Digite novamente: ' });
            //Busca dados de usuário no banco.
            const usuario = yield userS.getUsuario(index_2.Sessao.email);
            try {
                if (resp == 1 && usuario !== null) {
                    const isbn = readlineSync.question(`| Digite o ISBN: `);
                    //Busca livro via ISBN no banco.
                    const livro = JSON.parse(yield livS.getLivroByISBN(isbn));
                    //Verifica se o livro não é nulo
                    if (livro !== null) {
                        const v = yield empS.adicionarEmprestimo(livro.id, usuario.id);
                        if (v) {
                            console.log("O usuário já está com o livro emprestado.");
                        }
                        else {
                            console.log("Empréstimo feito!");
                        }
                        this.emprestimo();
                    }
                    else {
                        console.clear();
                        console.log("O empréstimo falhou! O livro não existe!");
                        this.emprestimo();
                    }
                }
                else if (resp == 2 && usuario !== null) {
                    const titulo = readlineSync.question(`| Digite o Título: `);
                    const livro = JSON.parse(yield empS.consultarLivroTitulo(titulo));
                    const l = livro;
                    //Verifica se o livro não é nulo
                    if (livro !== null) {
                        const v = yield empS.adicionarEmprestimo(l[0].id, usuario.id);
                        if (v) {
                            console.log("O usuário já está com o livro emprestado.");
                        }
                        else {
                            console.log("Empréstimo feito!");
                        }
                        this.emprestimo();
                    }
                    else {
                        console.clear();
                        console.log("O empréstimo falhou! O livro não existe!");
                        this.emprestimo();
                    }
                }
                else {
                    console.log("Retornando...");
                    this.emprestimo();
                }
            }
            catch (error) {
                console.error("Erro:", error.message);
                this.emprestimo();
            }
        });
    }
}
exports.InterfaceEmprestimo = InterfaceEmprestimo;
