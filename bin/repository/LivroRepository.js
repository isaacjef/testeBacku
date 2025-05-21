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
class LivroRepository {
    save(titulo, isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.prisma.livro.create({
                data: {
                    titulo: titulo,
                    isbn: isbn,
                },
            });
        });
    }
    //O email, neste caso, é único
    findByISBN(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const livro = index_1.prisma.livro.findUnique({ where: { isbn: isbn } });
            console.log(livro);
            //return new Livro();
        });
    }
}
exports.LivroRepository = LivroRepository;
