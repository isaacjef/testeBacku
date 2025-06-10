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
exports.LivroService = void 0;
const LivroRepository_1 = require("../repository/LivroRepository");
/*Livro:
titulo
isbn*/
//Instância de LivroRepository destinada a ser utilizada em todos os métodos da classe.
const livRep = new LivroRepository_1.LivroRepository();
class LivroService {
    //Tratar CategoriaLivro aqui.
    //Método implementado em cadastrarLivro() da classe InterfaceLivro.
    adicionarLivro(titulo, isbn, categoria, anoPublicacao) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificacao = yield livRep.findByISBN(isbn);
            //Verifica se há algum livro com o ISBN digitado pelo usuário. Se não houver, salva o livro no BD e retorna true para a classe InterfaceLivro
            //Se não, retorna falso.
            if (verificacao === null) {
                yield livRep.save(titulo, isbn, categoria, anoPublicacao);
                console.log("Livro salvo no banco de dados.");
                return true;
            }
            else {
                console.log("Este livro já está salvo no banco de dados.");
                return false;
            }
            /*return new Promise((resolve) => {
                setTimeout(() => {
                    resolve("ASync teste");
                }, 10);
            });*/
        });
    }
    //Busca um Livro no banco de dados, a partir do ID.
    //Necessário tratar retorno nulo nos métodos que o implementarem.
    //Método implementado em getEmprestimos(), de EmprestimoService.
    getLivroByID(livroId) {
        return __awaiter(this, void 0, void 0, function* () {
            const livro = JSON.parse(yield livRep.findByID(livroId));
            return livro;
        });
    }
    //Busca um Livro no banco de dados, a partir do ID.
    //Necessário tratar retorno nulo nos métodos que o implementarem.
    getLivroByISBN(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const livro = JSON.parse(yield livRep.findByISBN(isbn));
            return livro;
        });
    }
    //Busca um Livro no banco de dados, a partir do título. O banco retorna o primeiro Livro que contenha o título.
    //Necessário tratar retorno nulo nos métodos que o implementarem.
    getLivroByTitulo(titulo) {
        return __awaiter(this, void 0, void 0, function* () {
            const livro = JSON.parse(yield livRep.findFirstTitulo(titulo));
            return livro;
        });
    }
}
exports.LivroService = LivroService;
