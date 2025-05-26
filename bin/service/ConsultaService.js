"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultaService = void 0;
const ConsultaRepository_1 = require("../repository/ConsultaRepository");
class ConsultaService {
    constructor() {
        this.teste = '';
    }
    //Palavra-chave await em consultas (querys) sql são essenciais, se não os métodos (querys) retornarão
    //algo do tipo: Promise { <pending> }
    //selecionarLivro(): void {
    //	const result = await prisma.$queryRawUnsafe(`SELECT * FROM Livro`);
    //}
    consultaInicial(column, param) {
        const con = new ConsultaRepository_1.ConsultaRepository();
        this.teste = `${column} LIKE '%${param}%'`;
        con.consultarLivro(this.teste);
    }
    consultaSecundaria(column, param) {
        const con = new ConsultaRepository_1.ConsultaRepository();
        this.teste += ` AND ${column} LIKE '%${param}%'`;
        con.consultarLivro(this.teste);
    }
}
exports.ConsultaService = ConsultaService;
