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
const UsuarioService_1 = require("../service/UsuarioService");
const LivroService_1 = require("../service/LivroService");
//import { ConsultaService } from '../service/ConsultaService';
const EmprestimoService_1 = require("../service/EmprestimoService");
//import { InterfaceConsulta } from '../console/InterfaceConsulta'
//Instância de UsuarioService destinada a ser utilizada em todos os métodos da classe.
const empS = new EmprestimoService_1.EmprestimoService();
const userS = new UsuarioService_1.UsuarioService();
const livS = new LivroService_1.LivroService();
class InterfaceEmprestimo {
    emprestimo(email) {
        console.log(`|----------------- Empréstimos -----------------|`);
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        console.log(`| . . . . . [1] Listar Empréstimos  . . . . . . |`);
        console.log(`| . . . . . [2] Realizar Empréstimo . . . . . . |`);
        const resp = readlineSync.question(`|~~> `, { limit: [1, 2], limitMessage: 'Opção incorreta! Digite novamente: ' });
        try {
            if (resp == '1') {
                this.listarEmprestimo(email);
            }
            else if (resp == '2') {
                this.realizarEmprestimo(email);
            }
            else {
                // não sei
            }
        }
        catch (error) {
            console.error("Erro:", error.message);
        }
    }
    listarEmprestimo(email) {
        console.log(`|-------------- Empréstimos Atuais -------------|`);
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        //Listar todos os livros emprestados pelo usuario.
        try {
            empS.getEmprestimos(email);
            //this.emprestimo(email);
        }
        catch (error) {
            console.error("Erro:", error.message);
        }
    }
    //Antes de realizar o Empréstimo, o Usuário precisa informar o Livro. O Livro é encontrado via consulta. O sistema deve verificar o ID do Usuário.
    //A consulta por ISBN deve ser precisa.
    //A consulta por Título serve para o usuário verificar o ISBN do Livro.
    realizarEmprestimo(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`|------------- Realizar Empréstimo -------------|`);
            console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
            console.log(`| . . . . [1] Consultar Livro via ISBN  . . . . |`);
            console.log(`| . . . . [2] Consultar Livro por Título  . . . |`);
            const resp = readlineSync.question(` |~~>`, { limit: [1, 2], limitMessage: 'Opção incorreta! Digite novamente: ' });
            //Busca dados de usuário no banco.
            const usuario = yield userS.getUsuario(email);
            try {
                if (resp == '1' && usuario !== null) {
                    const isbn = readlineSync.question(`| Digite o ISBN: `);
                    //Busca livro via ISBN no banco.
                    const livro = yield livS.getLivroByISBN(isbn);
                    if (livro !== null) {
                        //Adiciona empréstimo do livro ao usuário.
                        yield empS.adicionarEmprestimo(livro.id, usuario.id);
                    }
                    else {
                        console.log("O empréstimo falhou! O livro não existe!");
                    }
                }
                else {
                    console.log("Algum erro! InterfaceEmp");
                }
            }
            catch (error) {
                console.error("Erro:", error.message);
            }
        });
    }
}
exports.InterfaceEmprestimo = InterfaceEmprestimo;
