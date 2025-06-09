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
exports.EmprestimoRepository = void 0;
const index_1 = require("../index");
const LivroService_1 = require("../service/LivroService");
const UsuarioService_1 = require("../service/UsuarioService");
const userS = new UsuarioService_1.UsuarioService();
const livS = new LivroService_1.LivroService();
class EmprestimoRepository {
    constructor() {
        this.vetor = [];
    }
    //Salva um empréstimo no BD com ID de Livro e de Usuário passado via parâmetro.
    //Antes, verifica se os IDs passados são válidos, isto é, existentes no BD.
    save(livroId, usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.prisma.emprestimo.create({
                data: {
                    livroID: livroId,
                    usuarioID: usuarioId,
                },
            });
        });
    }
    //Busca no BD por um empréstimo que contenha o ID de Livro e Usuario passados via parâmetro.
    //Converte o retorno do BD em uma string JSON.
    //O método que o implementar, deve tratar saída nula.
    findEmprestimo(livroId, usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const emprestimo = yield index_1.prisma.emprestimo.findUnique({
                where: {
                    livroID_usuarioID: {
                        livroID: livroId,
                        usuarioID: usuarioId,
                    },
                },
            });
            return JSON.stringify(emprestimo);
        });
    }
    //Busca no BD por todos os empréstimos do Usuario.
    //Converte o retorno do BD em um array de números.
    //O método que o implementar, deve tratar saída nula.
    findEmprestimos(usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const emprestimos = yield index_1.prisma.emprestimo.findMany({
                where: {
                    usuarioID: usuarioId,
                },
                omit: {
                    usuarioID: true,
                },
            });
            for (let i = 0; i < emprestimos.length; i++) {
                this.vetor[i] = emprestimos[i].livroID;
            }
            if (emprestimos) {
                return this.vetor;
            }
            else {
                return [];
            }
        });
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
