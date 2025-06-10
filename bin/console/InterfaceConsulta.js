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
exports.InterfaceConsulta = void 0;
const readlineSync = __importStar(require("readline-sync"));
const LivroService_1 = require("../service/LivroService");
const ConsultaService_1 = require("../service/ConsultaService");
//import { limparConsole } from '../console/InterfaceConfig'
//Instância de LivroService destinada a ser utilizada em todos os métodos da classe.
const livS = new LivroService_1.LivroService();
class InterfaceConsulta {
    constructor() {
        this.categorias = ['titulo', 'isbn'];
        this.livros = [];
        /*recursaoConsulta(index: number) {
            const con = new ConsultaService();
            const num = readlineSync.questionInt(`|`, {limit: [0, 1, 9], limitMessage:  'Opção incorreta! Digite novamente: '});
            const paramn = readlineSync.question(`| Digite sua consulta: `);
            if (index == 2) {
                con.consultaInicial(this.categorias[num], paramn);
            } else if (index == 1) {
                con.consultaSecundaria(this.categorias[num], paramn);
            } else {
                index = 0;
                break;
            }
            index--;
            
            this.recursaoConsulta(index);
        }*/
    }
    iniciarConsulta() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`|------------------ Consulta -----------------|`);
            console.log(`|                                             |`);
            console.log(`|   Selecione uma das opções para consulta:   |`);
            console.log(`|            [0] Título | [1] ISBN            |`);
            console.log(`|            [9] Cancelar                     |`);
            console.log(`|---------------------------------------------|`);
            const con = new ConsultaService_1.ConsultaService();
            let result;
            let i = 2;
            try {
                do {
                    const num = readlineSync.questionInt(`|Digite uma opção: `, { limit: [0, 1, 9], limitMessage: 'Opção incorreta! Digite novamente: ' });
                    if (i == 2 && num == 0 || num == 1) {
                        const q1 = readlineSync.question(`| Digite sua consulta: `);
                        result = con.consultaInicial(this.categorias[num], q1);
                    }
                    else if (i == 1 && num == 0 || num == 1) {
                        const q2 = readlineSync.question(`| Digite sua consulta: `);
                        result = con.consultaSecundaria(this.categorias[num], q2);
                    }
                    else if (i == 0 || num == 9) {
                        i = 0;
                        break;
                    }
                    //console.log(await result);
                    i--;
                } while (i > 0);
            }
            catch (error) {
                console.log("Erro: ", error.message);
            }
        });
    }
    consultaUnica(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`|-------------- Consulta Única ---------------|`);
            console.log(`|                                             |`);
            console.log(`|   Selecione uma das opções para consulta:   |`);
            console.log(`|            [0] Título | [1] ISBN            |`);
            const num = readlineSync.questionInt(`|Digite uma opção: `, { limit: [0, 1], limitMessage: 'Opção incorreta! Digite novamente: ' });
            if (num == 0) {
                const titulo = readlineSync.question(`| Digite o título do Livro: `);
                const livro = yield livS.getLivroByTitulo(titulo);
                if (livro) {
                    console.log(livro);
                }
                else {
                    console.log("Não há nenhum livro com o  título informado.");
                }
            }
            else {
                const isbn = readlineSync.question(`| Digite o ISBN do Livro: `);
            }
        });
    }
}
exports.InterfaceConsulta = InterfaceConsulta;
