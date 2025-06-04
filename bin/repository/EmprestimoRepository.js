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
class EmprestimoRepository {
    constructor() {
        this.vetor = [];
    }
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
    //tratar saída 0 ou nula.
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
            console.log(emprestimos.length);
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
