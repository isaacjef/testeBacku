import * as readlineSync from 'readline-sync';
import { Livro } from './modelos/Livro';
import { Usuario } from './modelos/Usuario';
import { Emprestimo } from './modelos/Emprestimo';
import { TipoUsuario } from "./enumeracao/TipoUsuario"
import { InterfaceUsuario } from './console/InterfaceUsuario';
import { InterfaceConsulta } from './console/InterfaceConsulta';
import { InterfaceLivro } from './console/InterfaceLivro';
import { PrismaClient } from '../src/generated/prisma/client';
import { LivroRepository } from './repository/LivroRepository';
import { UsuarioRepository } from './repository/UsuarioRepository';
import { ConsultaRepository } from './repository/ConsultaRepository';
import { EmprestimoRepository } from './repository/EmprestimoRepository';
import { LivroService } from './service/LivroService';
import { UsuarioService } from './service/UsuarioService';
import { ConsultaService } from './service/ConsultaService';
import { EmprestimoService } from './service/EmprestimoService';

//Exportando a conexão com o banco de dados de forma a reaproveitá-la, para que o bd não fique sobrecarregado com muitas instâncias de 'new PrismaClient(()'
export const prisma = new PrismaClient({ log: ['query'] });

async function main() {
	
	//const repL = new LivroRepository();
	const livS = new LivroService();
	//livS.buscarLivro(1);
	const repE = new EmprestimoRepository();
	const empS = new EmprestimoService();
	empS.getEmprestimos("teste@gaao.com");
	
	//const livros: Array<number> = JSON.parse(await repE.findEmprestimos(3)); --> LOucura
	/*let livros: Array<number> = JSON.parse(await repE.findEmprestimos(3));
	livros.forEach(async (value: number) => {
    	//const livro: Livro = await livS.buscarLivro(value);
    	//console.log(`| Título: ${livro.titulo}, ISBN: ${livro.isbn}`);
    	let teste: number = value.livroID;
    	console.log(teste);
    });*/
	
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
const result2 = await prisma.$queryRawUnsafe(`SELECT * FROM Livro WHERE ${column} LIKE '%${teste}%'`)*/
