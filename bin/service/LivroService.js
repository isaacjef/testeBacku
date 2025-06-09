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
    adicionarLivro(titulo, isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificacao = yield livRep.findByISBN(isbn);
            //Verifica se há algum livro com o ISBN digitado pelo usuário. Se houver, retorna true para a classe InterfaceLivro
            //Se não, salva o Livro no BD e retorna false.
            if (verificacao) {
                return true;
            }
            else {
                livRep.save(titulo, isbn);
                return false;
            }
            /*return new Promise((resolve) => {
                setTimeout(() => {
                    resolve("ASync teste");
                }, 10);
            });*/
        });
    }
    //Verificar se o BD não retornar nenhum Livro2
    getLivroByID(livroId) {
        return __awaiter(this, void 0, void 0, function* () {
            const livro = JSON.parse(yield livRep.findByID(livroId));
            return livro;
        });
    }
}
exports.LivroService = LivroService;
