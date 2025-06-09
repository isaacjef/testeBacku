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
exports.LivroRepository = void 0;
const index_1 = require("../index");
const Livro_1 = require("../modelos/Livro");
class LivroRepository {
    save(titulo, isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield index_1.prisma.livro.create({
                    data: {
                        titulo: titulo,
                        isbn: isbn,
                    },
                });
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    //Busca um Livro no BD via id, e retorna os dados do Livro como uma string JSON.
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const livro = yield index_1.prisma.livro.findUnique({ where: { id: id } });
            return JSON.stringify(livro);
        });
    }
    //O try...catch pode ser implementado em LivroService, quando este chamar por findByISBN.
    //Tratar possível retorno nulo em LivroService, ou em InterfaceLivro
    findByISBN(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            //Busca no banco de dados por um livro que contenha o ISBN passado via parâmetro.
            const livro = yield index_1.prisma.livro.findUnique({ where: { isbn: isbn } });
            console.log("Possível mensagem de log. Repository.");
            if (livro) { //Se livro tiver um valor
                return new Livro_1.Livro(livro.id, livro.titulo, livro.isbn);
            }
            else {
                return null;
            }
        });
    }
}
exports.LivroRepository = LivroRepository;
