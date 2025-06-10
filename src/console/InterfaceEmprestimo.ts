import * as readlineSync from 'readline-sync';
import { Usuario } from '../modelos/Usuario';
import { UsuarioService } from '../service/UsuarioService'
import { LivroService } from '../service/LivroService';
//import { ConsultaService } from '../service/ConsultaService';
import { EmprestimoService } from '../service/EmprestimoService'
//import { InterfaceConsulta } from '../console/InterfaceConsulta'


//Instância de UsuarioService destinada a ser utilizada em todos os métodos da classe.
const empS = new EmprestimoService();
const userS = new UsuarioService();
const livS = new LivroService();

export class InterfaceEmprestimo {
	
	emprestimo(email: string): void {
        console.log(`|----------------- Empréstimos -----------------|`);	
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . [1] Listar Empréstimos  . . . . . . |`)
		console.log(`| . . . . . [2] Realizar Empréstimo . . . . . . |`)		
		const resp = readlineSync.question(`|~~> `, {limit: [1, 2], limitMessage:  'Opção incorreta! Digite novamente: '});		
		try {
			if (resp == '1') {
				this.listarEmprestimo(email);
			} else if (resp == '2') {
				this.realizarEmprestimo(email);
			} else {
				// não sei
			}
		} catch (error: any) {
        	console.error("Erro:", error.message);
    	}
	}
	
	listarEmprestimo(email: string): void {
        console.log(`|-------------- Empréstimos Atuais -------------|`);	
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		//Listar todos os livros emprestados pelo usuario.
		try {
			empS.getEmprestimos(email);
			//this.emprestimo(email);
		} catch (error: any) {
        	console.error("Erro:", error.message);
    	}
	}
	
	//Antes de realizar o Empréstimo, o Usuário precisa informar o Livro. O Livro é encontrado via consulta. O sistema deve verificar o ID do Usuário.
	//A consulta por ISBN deve ser precisa.
	//A consulta por Título serve para o usuário verificar o ISBN do Livro.
	async realizarEmprestimo(email: string): Promise<void> {
        console.log(`|------------- Realizar Empréstimo -------------|`);	
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . [1] Consultar Livro via ISBN  . . . . |`)
		console.log(`| . . . . [2] Consultar Livro por Título  . . . |`)
		const resp = readlineSync.question(` |~~>`, {limit: [1, 2], limitMessage:  'Opção incorreta! Digite novamente: '});
		//Busca dados de usuário no banco.
		const usuario = await userS.getUsuario(email);

		try {
			if (resp == '1' && usuario !== null) {
				const isbn = readlineSync.question(`| Digite o ISBN: `);
				//Busca livro via ISBN no banco.
    			const livro = await livS.getLivroByISBN(isbn);
    			
    			if (livro !== null) {
    				//Adiciona empréstimo do livro ao usuário.
    				await empS.adicionarEmprestimo(livro.id, usuario.id)
    			} else {
    				console.log("O empréstimo falhou! O livro não existe!");
    			}
    		} else {
    			console.log("Algum erro! InterfaceEmp");

    		}
		} catch (error: any) {
        	console.error("Erro:", error.message);
    	}
	}
}
