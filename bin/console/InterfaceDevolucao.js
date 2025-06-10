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
exports.InterfaceDevolucao = void 0;
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
class InterfaceDevolucao {
    //Página home de devoluções
    devolucao() {
        console.clear();
        console.log(`|----------------- Empréstimos -----------------|`);
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        console.log(`| . . . . . [0] Retornar            . . . . . . |`);
        console.log(`| . . . . . [1] Listar Devoluções   . . . . . . |`);
        console.log(`| . . . . . [2] Realizar Devolução  . . . . . . |`);
        console.log(`| . . . . . [3] Sair do Sistema     . . . . . . |`);
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
        const resp = readlineSync.questionInt(`|~~> `, { limit: [0, 1, 2, 3], limitMessage: 'Opção incorreta! Digite novamente: ' });
        try {
            if (resp == 0) {
                index_1.form.home();
            }
            else if (resp == 1) {
                //this.listarEmprestimo();
            }
            else if (resp == 2) {
                //this.realizarEmprestimo();
            }
            else {
                index_1.form.desconectar();
            }
        }
        catch (error) {
            console.error("Erro:", error.message);
        }
    }
    //Página para listar todos as devoluções do usuário.
    listarEmprestimo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log(`|-------------- Devoluções Atuais --------------|`);
            console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
            console.log(`| . . . . . . .  [0] Retornar   . . . . . . . . |`);
            console.log(`| . . . . . . .  [1] Sair       . . . . . . . . |`);
            try {
                yield empS.getDevolucoes(index_2.Sessao.email);
                const resp = readlineSync.questionInt(`|~~> `, { limit: [0, 1], limitMessage: 'Opção incorreta! Digite novamente: ' });
                if (resp == 0) {
                    this.devolucao();
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
}
exports.InterfaceDevolucao = InterfaceDevolucao;
