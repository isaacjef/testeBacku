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
const index_1 = require("../index");
const index_2 = require("../index");
const readlineSync = __importStar(require("readline-sync"));
const LivroService_1 = require("../service/LivroService");
const CategoriaLivro_1 = require("../enumeracao/CategoriaLivro");
//Instância de LivroService destinada a ser utilizada em todos os métodos da classe.
const livS = new LivroService_1.LivroService();
class InterfaceLivro {
    gerenciarLivro() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log(`|~~~~~~~~~~~~~~~ Gerenciar Livros ~~~~~~~~~~~~~~|`);
            console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
            console.log(`| . . . . . . [0] Sair            . . . . . . . |`);
            console.log(`| . . . . . . [1] Adicionar Livro . . . . . . . |`);
            console.log(`| . . . . . . [2] Listar Livros   . . . . . . . |`);
            console.log(`| . . . . . . [3] Alterar Titulo  . . . . . . . |`);
            console.log(`| . . . . . . [4] Excluir Livro   . . . . . . . |`);
            console.log(`| . . . . . . [5] Retornar        . . . . . . . |`);
            try {
                const resp = readlineSync.questionInt(`|~~> `, { limit: [0, 1, 2, 3, 4, 5], limitMessage: 'Opção incorreta! Digite novamente: ' });
                switch (resp) {
                    case 0:
                        return index_1.form.desconectar();
                    case 1:
                        return this.cadastrarLivro();
                    case 2:
                        return this.listarLivros();
                    case 3:
                        return this.alterarTitulo();
                    case 4:
                        return this.deletarLivro();
                    case 5:
                        return index_2.interfaceBiblio.homeAdmin();
                }
            }
            catch (error) {
                console.error("Erro: ", error.message);
            }
        });
    }
    //Página destinada ao cadastro de Livros. Implementa o método adicionarLivro() de LivroService.
    cadastrarLivro() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`|--------------- Cadastrar Livro ---------------|`);
            console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
            try {
                const titulo = readlineSync.question(`| Título: `);
                const isbn = readlineSync.question(`| ISBN: `);
                console.log(`| Categorias: 1- ${CategoriaLivro_1.CategoriaLivro.FICCAO}; 2- ${CategoriaLivro_1.CategoriaLivro.CIENCIA}; 3- ${CategoriaLivro_1.CategoriaLivro.HISTORIA}; 4- ${CategoriaLivro_1.CategoriaLivro.TECNOLOGIA}; 5- ${CategoriaLivro_1.CategoriaLivro.OUTRO}`);
                const num = readlineSync.questionInt(`| Selecione a categoria: `);
                let categoria;
                if (num == 1) {
                    categoria = CategoriaLivro_1.CategoriaLivro.FICCAO;
                }
                else if (num == 2) {
                    categoria = CategoriaLivro_1.CategoriaLivro.CIENCIA;
                }
                else if (num == 3) {
                    categoria = CategoriaLivro_1.CategoriaLivro.HISTORIA;
                }
                else if (num == 4) {
                    categoria = CategoriaLivro_1.CategoriaLivro.TECNOLOGIA;
                }
                else {
                    categoria = CategoriaLivro_1.CategoriaLivro.OUTRO;
                }
                const anoPublicacao = readlineSync.question("Ano de publicação: ");
                if (yield livS.adicionarLivro(titulo, isbn, categoria, anoPublicacao)) {
                    console.log("Livro cadastrado com sucesso");
                    this.gerenciarLivro();
                }
                else {
                    console.log("Livro já cadastrado! Tente novamente.");
                    this.cadastrarLivro();
                }
            }
            catch (error) {
                console.error("Erro:", error.message);
            }
        });
    }
    listarLivros() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log(`|~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Livros Cadastrados ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ `);
            yield livS.getLivros();
            console.log(`| . . . . . . .  [0] Retornar   . . . . . . . . |`);
            console.log(`| . . . . . . .  [1] Sair       . . . . . . . . |`);
            try {
                const resp = readlineSync.questionInt(`|~~> `, { limit: [0, 1], limitMessage: 'Opção incorreta! Digite novamente: ' });
                switch (resp) {
                    case 0:
                        return this.gerenciarLivro();
                    case 1:
                        return index_1.form.desconectar();
                }
            }
            catch (error) {
                console.error("Erro: ", error.message);
            }
        });
    }
    //Versão simplificado. Só permite modificar o título
    alterarTitulo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log(`| . . . . . . .  Alterar Título . . . . . . . . |`);
            try {
                const isbn = readlineSync.question(`|~~> Digite o ISBN do Livro: `);
                const titulo = readlineSync.question(`|~~> Digite o novo Título do Livro: `);
                if (yield livS.atualizarTitulo(isbn, titulo)) {
                    console.log("Título alterado com sucesso");
                }
                else {
                    console.log("Título não foi alterado.");
                }
                this.gerenciarLivro();
            }
            catch (error) {
                console.error("Erro: ", error.message);
            }
        });
    }
    //Página para deletar livros
    deletarLivro() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log(`| . . . . . . .  Deletar Livro  . . . . . . . . |`);
            try {
                const isbn = readlineSync.question(`|~~> Digite o ISBN do Livro: `);
                if (yield livS.deletar(isbn)) {
                    console.log("Livro não foi deletado.");
                }
                else {
                    console.log("Livro deletado com sucesso.");
                }
                this.gerenciarLivro();
            }
            catch (error) {
                console.error("Erro: ", error.message);
            }
        });
    }
}
exports.InterfaceLivro = InterfaceLivro;
