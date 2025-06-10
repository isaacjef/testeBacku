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
exports.InterfaceLivro = void 0;
const readlineSync = __importStar(require("readline-sync"));
const LivroService_1 = require("../service/LivroService");
const CategoriaLivro_1 = require("../enumeracao/CategoriaLivro");
//Instância de LivroService destinada a ser utilizada em todos os métodos da classe.
const livro = new LivroService_1.LivroService();
class InterfaceLivro {
    //Página destinada ao cadastro de Livros. Implementa o método adicionarLivro() de LivroService.
    cadastrarLivro() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`|---------------Cadastrar Livro---------------|`);
            console.log(`|                                             |`);
            try {
                const titulo = readlineSync.question(`| Título:`);
                const isbn = readlineSync.question(`| ISBN:`);
                const categoria = [CategoriaLivro_1.CategoriaLivro.FICCAO, CategoriaLivro_1.CategoriaLivro.CIENCIA, CategoriaLivro_1.CategoriaLivro.HISTORIA, CategoriaLivro_1.CategoriaLivro.TECNOLOGIA, CategoriaLivro_1.CategoriaLivro.OUTRO];
                const index = readlineSync.keyInSelect(categoria, "| Qual categoria?");
                const data = readlineSync.question(`| Informe a data: `);
                if (yield livro.adicionarLivro(titulo, isbn, categoria[index], data)) {
                    console.log("Livro cadastrado com sucesso");
                    //this.cadastrarLivro();
                }
                else {
                    console.log("Livro já cadastrado! Tente novamente.");
                }
            }
            catch (error) {
                console.error("Erro:", error.message);
            }
            console.log(`|---------------------------------------------|`);
        });
    }
}
exports.InterfaceLivro = InterfaceLivro;
