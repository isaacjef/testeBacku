import * as readlineSync from 'readline-sync';
import { name, logAt } from './log';
import { Livro } from './modelos/Livro';
import { Usuario } from './modelos/Usuario';
import { Emprestimo } from './modelos/Emprestimo';
import { TipoUsuario } from "./enumeracao/TipoUsuario"
import { StatusEmprestimo } from "./enumeracao/StatusLivro"
import { CategoriaLivro } from "./enumeracao/CategoriaLivro"
import { InterfaceLivro } from './console/InterfaceLivro';
import { InterfaceUsuario } from './console/InterfaceUsuario';
import { InterfaceConsulta } from './console/InterfaceConsulta';
import { InterfaceEmprestimo } from './console/InterfaceEmprestimo';
import { PrismaClient } from '../src/generated/prisma/client';
import { LivroRepository } from './repository/LivroRepository';
import { UsuarioRepository } from './repository/UsuarioRepository';
import { ConsultaRepository } from './repository/ConsultaRepository';
import { EmprestimoRepository } from './repository/EmprestimoRepository';
import { LivroService } from './service/LivroService';
import { UsuarioService } from './service/UsuarioService';
import { ConsultaService } from './service/ConsultaService';
import { EmprestimoService } from './service/EmprestimoService';

//Aparentemente, duas classes não podem se inter-importar no typescript.

//Exportando a conexão com o banco de dados de forma a reaproveitá-la, para que o bd não fique sobrecarregado com muitas instâncias de 'new PrismaClient(()'
export const prisma = new PrismaClient({ log: ['query'] });
export const form = new InterfaceUsuario();

@name('Sessao')
export class Sessao {
	@logAt
	static email: string = '';
}

class Aba {
	
	metodo(email: string) {
		console.log("DEu certo " + email)
	}
}

export function simples(C: any) {
	console.log(`CLASSEZONA`)
	return C;
}

async function main() {
	const d1 = new Date(Date.now()).toJSON();
	const d3 = new Date(d1);
	d3.setDate(d3.getDate() - 7);

	/*await prisma.emprestimo.create({
		data: {
			livroID: 1,
			usuarioID: 4,
			dataEmprestimo: d1,
  			dataVencimento: d3.toJSON(),
  			status: StatusEmprestimo.ATIVO,
		},
	})*/
	const empS = new EmprestimoService();
	empS.verificarEmprestimos("asd@asd");
	empS.getDevolucoes("asd@asd");

	/*const d1 = new Date(Date.now());
	console.log(d1)
	console.log(d2)
	const d3 = new Date(d1);
	d3.setDate(d3.getDate() - 7);
	const d4 = new Date(`${d1.getUTCFullYear()}-${d1.getUTCMonth() + 1}-${d1.getUTCDate()}`).toJSON();
	console.log(d3.toJSON());
	console.log(d4);*/

	//empS.getDevolucoes("teste@email")
	//empS.getEmprestimos("teste@email")
	//empS.getEmprestimos("b@b")
	//empS.adicionarEmprestimo(2, 1)
	//const emprestimos = JSON.stringify(await prisma.emprestimo.findMany({ where: { usuarioID: 1, status: 'Ativo', }, }))
	//const vetor2: Emprestimo[] = JSON.parse(emprestimos);
	//console.log(vetor2);
	
	//form.iniciar();
	


	//verificar amanha
	//const interEmp = new InterfaceEmprestimo();
	//interEmp.realizarEmprestimo("teste@email")
	
	//const interLivro = new InterfaceLivro();
	//const consulta = new InterfaceConsulta();
	//interLivro.cadastrarLivro();
	//consulta.consultaUnica("admin@admin");
	
	//form.home();
	
	/*const repL = new LivroRepository();
	const aaa = await repL.findByISBN("A1");
	console.log(aaa)
	if (aaa !== null) {
        console.log("verificacao é nulo")
    } else {
        console.log("Verificacao contem")
    }*/
	
	/*let livros: Array<number> = JSON.parse(await repE.findEmprestimos(3));
	livros.forEach(async (value: number) => {
    	//const livro: Livro = await livS.buscarLivro(value);
    	//console.log(`| Título: ${livro.titulo}, ISBN: ${livro.isbn}`);
    	let teste: number = value.livroID;
    	console.log(teste);
    });*/
	
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
	
	//Listar instâncias nas tabelas:
	const test = await prisma.livro.findMany();
	console.log(test)
	const emp = await prisma.emprestimo.findMany();
	console.log(emp)*/
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})

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
const result2 = await prisma.$queryRawUnsafe(`SELECT * FROM Livro WHERE ${column} LIKE '%${teste}%'`)

//Admin primário
await prisma.usuario.create({
    data: {
        nome: `Admin`,
        senha: `12345`,
        email: `admin`,
        tipo: TipoUsuario.BIBLIO,
    },
})*/
