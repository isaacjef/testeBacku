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
const index_1 = require("../index");
const LivroRepository_1 = require("../repository/LivroRepository");
/*Livro:
titulo
isbn*/
class LivroService {
    adicionarLivro(titulo, isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const repositorio = new LivroRepository_1.LivroRepository();
            repositorio.save(titulo, isbn);
            yield index_1.prisma.$disconnect();
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve("ASync teste");
                }, 10);
            });
        });
    }
}
exports.LivroService = LivroService;
