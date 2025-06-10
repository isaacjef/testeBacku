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
//export const prisma = new PrismaClient({ log: ['query'] });
export const prisma = new PrismaClient();
export const form = new InterfaceUsuario();
export const interLivro = new InterfaceLivro();

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
	//Tratar readline de Categoria Livro; Transformar emails em minuscula antes de salvar no BD.
	form.iniciar();
	
	//empS.getDevolucoes("teste@email")
	//empS.getEmprestimos("teste@email")
	//empS.getEmprestimos("b@b")
	//empS.adicionarEmprestimo(2, 1)
	//const emprestimos = JSON.stringify(await prisma.emprestimo.findMany({ where: { usuarioID: 1, status: 'Ativo', }, }))
	//const vetor2: Emprestimo[] = JSON.parse(emprestimos);
	//console.log(vetor2);

	//verificar amanha
	//const interEmp = new InterfaceEmprestimo();
	//interEmp.realizarEmprestimo("teste@email")
	
	/*Service e Repository para testes:
	const repE = new EmprestimoRepository();
	const empS = new EmprestimoService();
	const repL = new LivroRepository();
	const livS = new LivroService();
	const repU = new UsuarioRepository();
	const userS = new UsuarioService();
	const con = new ConsultaRepository();*/
	
	//const interLivro = new InterfaceLivro();
	//const consulta = new InterfaceConsulta();
	//interLivro.cadastrarLivro();
	//consulta.consultaUnica("admin@admin");
	
	/*const repL = new LivroRepository();
	const aaa = await repL.findByISBN("A1");
	console.log(aaa)
	if (aaa !== null) {
        console.log("verificacao é nulo")
    } else {
        console.log("Verificacao contem")
    }*/
	
	/*
	const ala = new InterfaceConsulta();
	ala.iniciarConsulta();
	
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

/*
//Bibliotecário primário
await prisma.usuario.create({
    data: {
        nome: `Admin`,
        senha: `admin`,
        email: `admin@a`,
        tipo: TipoUsuario.BIBLIO,
    },
})*/
