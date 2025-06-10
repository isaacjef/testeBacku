"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultaService = void 0;
const ConsultaRepository_1 = require("../repository/ConsultaRepository");
//Instância de ConsultaRepository destinada a ser utilizada em todos os métodos da classe.
const con = new ConsultaRepository_1.ConsultaRepository();
class ConsultaService {
    constructor() {
        this.teste = '';
        /*async consultaUnicaISBN(isbn: string): Promise<Livro> {
            const livro = await livRep.findByISBN(isbn);
            
            //VErifica se o livro é nulo.
            if (verificacao) {
                return true;
            } else {
                livRep.save(titulo, isbn);
                return false;
            }
        }*/
    }
    consultaInicial(column, param) {
        this.teste = `${column} LIKE '%${param}%'`;
        con.consultarLivro(this.teste);
    }
    consultaSecundaria(column, param) {
        this.teste += ` AND ${column} LIKE '%${param}%'`;
        con.consultarLivro(this.teste);
    }
}
exports.ConsultaService = ConsultaService;
