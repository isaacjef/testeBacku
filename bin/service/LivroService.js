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
//Instância de LivroRepository destinada a ser utilizada em todos os métodos da classe.
const livRep = new LivroRepository_1.LivroRepository();
class LivroService {
    //Tratar CategoriaLivro aqui.
    //Método implementado em cadastrarLivro() da classe InterfaceLivro.
    adicionarLivro(titulo, isbn, categoria, anoPublicacao) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificacao = JSON.parse(yield livRep.findByISBN(isbn));
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
    //Lista todos os livros do banco.
    getLivros() {
        return __awaiter(this, void 0, void 0, function* () {
            const livros = JSON.parse(yield livRep.consultarLivros());
            if (livros !== null) {
                livros.forEach((value, index, array) => __awaiter(this, void 0, void 0, function* () {
                    console.log(`Livro ${index + 1} - Título: ${value.titulo}, ISBN: ${value.isbn}, Categoria: ${value.categoria}, Ano de Publicação: ${value.anoPublicacao}`);
                }));
            }
            else {
                console.log("Não há nenhum livro cadastrado.");
            }
        });
    }
    //Atualizar titulo do livro.
    atualizarTitulo(isbn, titulo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield livRep.updateTitulo(isbn, titulo);
            const verificacao = JSON.parse(yield livRep.findByISBN(isbn));
            //Verifica se há algum livro com o ISBN digitado pelo usuário.
            if (verificacao !== null && verificacao.titulo != titulo) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    //Deleta livro do banco de dados
    deletar(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            yield livRep.deleteByISBN(isbn);
            const verificacao = yield livRep.findByISBN(isbn);
            //Verifica se há algum livro com o ISBN digitado pelo usuário.
            if (verificacao !== null) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.LivroService = LivroService;
