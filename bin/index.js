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
exports.prisma = void 0;
const client_1 = require("../src/generated/prisma/client");
const EmprestimoRepository_1 = require("./repository/EmprestimoRepository");
const LivroService_1 = require("./service/LivroService");
const EmprestimoService_1 = require("./service/EmprestimoService");
//Exportando a conexão com o banco de dados de forma a reaproveitá-la, para que o bd não fique sobrecarregado com muitas instâncias de 'new PrismaClient(()'
exports.prisma = new client_1.PrismaClient({ log: ['query'] });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //const repL = new LivroRepository();
        const livS = new LivroService_1.LivroService();
        //livS.buscarLivro(1);
        const repE = new EmprestimoRepository_1.EmprestimoRepository();
        const empS = new EmprestimoService_1.EmprestimoService();
        //const livros: Array<number> = JSON.parse(await repE.findEmprestimos(3)); --> LOucura
        let livros = JSON.parse(yield repE.findEmprestimos(3));
        console.log(typeof livros);
        //empS.getEmprestimos("facil");
        livros.forEach((value) => __awaiter(this, void 0, void 0, function* () {
            //const livro: Livro = await livS.buscarLivro(value);
            //console.log(`| Título: ${livro.titulo}, ISBN: ${livro.isbn}`);
            //console.log(value.typeof());
        }));
        /*let a2: Array<number> = [];
        a2 = JSON.parse(await repE.findEmprestimos(3));
        console.log(a2)*/
        /*
        const form = new InterfaceUsuario();
        form.iniciar();
        const ala = new InterfaceConsulta();
        ala.iniciarConsulta();
        
        //Service e Repository para testes:
        const repE = new EmprestimoRepository();
        const empS = new EmprestimoService();
        const repL = new LivroRepository();
        const livS = new LivroService();
        const repU = new UsuarioRepository();
        const userS = new UsuarioService();
        const con = new ConsultaRepository();
        if (userS) {
            const u = userS.getUsuario("facil")
            form.emprestimo(u.id);
        }
        
        //Listar instâncias nas tabelas:
        const test = await prisma.livro.findMany();
        console.log(test)
        const emp = await prisma.emprestimo.findMany();
        console.log(emp)*/
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield exports.prisma.$disconnect();
    process.exit(1);
}));
/* const form = new Formulario();
 * form.cadastrarUsuario();
 *
 * Consultar livro via ISBN. Neste aqui, o ISBN não existe, o método retorna null.
 * const rep = new LivroRepository();
 * console.log(await rep.findByISBN('asdasd12312'));
 *
 *
 *
 * model Usuario {
 * 	id    Int    @id @default(autoincrement())
 * 	email String @unique
 * 	name  String
 *  }
 */
/*------------------------------------------------------------------------------------------------------------
const result = await prisma.$queryRawUnsafe(`SELECT * FROM Livro WHERE titulo LIKE '%a%' AND isbn LIKE 'asdasd'`);
console.log(result)

const column = 'isbn'
const teste = 'a'
const result2 = await prisma.$queryRawUnsafe(`SELECT * FROM Livro WHERE ${column} LIKE '%${teste}%'`)*/
