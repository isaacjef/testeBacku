import * as readlineSync from 'readline-sync';
//import { Usuario } from '../modelos/Usuario';
//import { UsuarioService } from '../service/UsuarioService'
import { EmprestimoService } from '../service/EmprestimoService'
//import { InterfaceConsulta } from '../console/InterfaceConsulta'

//Instância de UsuarioService destinada a ser utilizada em todos os métodos da classe.
const empS = new EmprestimoService();

export class InterfaceEmprestimo {
	
	emprestimo(email: string): void {
        console.log(`|----------------- Empréstimos -----------------|`);	
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . [1] Listar Empréstimos  . . . . . . |`)
		console.log(`| . . . . . [2] Realizar Empréstimo . . . . . . |`)		
		const resp = readlineSync.question(`             `, {limit: [1, 2], limitMessage:  'Opção incorreta! Digite novamente: '});		
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
		} catch (error: any) {
        	console.error("Erro:", error.message);
    	}
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
	}
	
	//Antes de realizar o Empréstimo, o Usuário precisa informar o Livro. O Livro é encontrado via consulta. O sistema deve verificar o ID do Usuário.
	//A consulta por ISBN deve ser precisa.
	//A consulta por Título serve para o usuário verificar o ISBN do Livro.
	async realizarEmprestimo(email: string): Promise<void> {
        console.log(`|------------- Realizar Empréstimo -------------|`);	
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . [1] Consultar Livro via ISBN  . . . . |`)
		console.log(`| . . . . [2] Consultar Livro por Título  . . . |`)
		//PEgar id de livro e de usuario
		try {
			/*if (await empS.adicionarEmprestimo(idLivro, idUsuario)) {
    			console.log("O usuário já está com o livro emprestado.");
    			this.emprestimo(email);
    		} else {
    			console.log("Livro emprestado com sucesso.");
				this.emprestimo(email);
    		}*/
		} catch (error: any) {
        	console.error("Erro:", error.message);
    	}
	}
}
