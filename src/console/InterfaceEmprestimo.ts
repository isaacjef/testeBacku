import * as readlineSync from 'readline-sync';
import { form } from '../index';
import { Sessao } from '../index';
import { Usuario } from '../modelos/Usuario';
import { UsuarioService } from '../service/UsuarioService'
import { LivroService } from '../service/LivroService';
import { EmprestimoService } from '../service/EmprestimoService'

//Instância de UsuarioService destinada a ser utilizada em todos os métodos da classe.
const empS = new EmprestimoService();
const userS = new UsuarioService();
const livS = new LivroService();

export class InterfaceEmprestimo {
	
	//Página home de empréstimos
	emprestimo(): void {
		console.clear()
		empS.verificarEmprestimos(Sessao.email);
        console.log(`|----------------- Empréstimos -----------------|`)	
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . [0] Retornar            . . . . . . |`)
		console.log(`| . . . . . [1] Listar Empréstimos  . . . . . . |`)
		console.log(`| . . . . . [2] Realizar Empréstimo . . . . . . |`)
		console.log(`| . . . . . [3] Sair do Sistema     . . . . . . |`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1, 2, 3], limitMessage:  'Opção incorreta! Digite novamente: '});		
		try {
			if (resp == 0) {
				form.home();
			} else if (resp == 1) {
				this.listarEmprestimo();
			} else if (resp == 2) {
				this.realizarEmprestimo();
			} else {
				form.desconectar();
			}
		} catch (error: any) {
        	console.error("Erro:", error.message);
    	}
	}
	
	//Página para listar todos os empréstimos de usuário.
	async listarEmprestimo(): Promise<void> {
		console.clear()
        console.log(`|-------------- Empréstimos Atuais -------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . .  [0] Retornar   . . . . . . . . |`)
		console.log(`| . . . . . . .  [1] Sair       . . . . . . . . |`)
		try {
			await empS.getEmprestimos(Sessao.email);
			
			const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1], limitMessage:  'Opção incorreta! Digite novamente: '});
			
			if (resp == 0) {
				this.emprestimo();
    		} else {
    			form.desconectar();
    		}
		} catch (error: any) {
        	console.error("Erro:", error.message);
    	}
	}
	
	//Antes de realizar o Empréstimo, o Usuário precisa informar o Livro. O Livro é encontrado via consulta. O sistema deve verificar o ID do Usuário.
	//A consulta por ISBN deve ser precisa.
	//A consulta por Título serve para o usuário verificar o ISBN do Livro.
	async realizarEmprestimo(): Promise<void> {
		console.clear()
        console.log(`|------------- Realizar Empréstimo -------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . [1] Consultar Livro via ISBN  . . . . |`)
		console.log(`| . . . . [2] Consultar Livro por Título  . . . |`)
		const resp = readlineSync.question(`|~~> `, {limit: [1, 2], limitMessage:  'Opção incorreta! Digite novamente: '});
		//Busca dados de usuário no banco.
		const usuario = await userS.getUsuario(Sessao.email);

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
