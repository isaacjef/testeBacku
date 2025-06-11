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
		//Não limpar o console, para ver o resultado do Realizar Empréstimo
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
				console.clear();
				form.home();
			} else if (resp == 1) {
				console.clear();
				this.listarEmprestimo();
			} else if (resp == 2) {
				console.clear();
				this.realizarEmprestimo();
			} else {
				console.clear();
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
		try {
			await empS.getEmprestimos(Sessao.email);
			
			console.log(`| . . . . . . .  [0] Retornar   . . . . . . . . |`)
			console.log(`| . . . . . . .  [1] Sair       . . . . . . . . |`)
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
		console.log(`| . . . . [0] Retornar                    . . . |`)
		console.log(`| . . . . [1] Consultar Livro via ISBN    . . . |`)
		console.log(`| . . . . [2] Consultar Livro por Título  . . . |`)
		const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1, 2], limitMessage:  'Opção incorreta! Digite novamente: '});
		//Busca dados de usuário no banco.
		const usuario = await userS.getUsuario(Sessao.email);
		
		try {
			if (resp == 1 && usuario !== null) {
				const isbn = readlineSync.question(`| Digite o ISBN: `);
				//Busca livro via ISBN no banco.
    			const livro = JSON.parse(await livS.getLivroByISBN(isbn));
    			
    			//Verifica se o livro não é nulo
    			if (livro !== null) {
    				const v = await empS.adicionarEmprestimo(livro.id, usuario.id);
    				
    				if (v) {
    					console.log("O usuário já está com o livro emprestado.")
    				} else {
    					console.log("Empréstimo feito!")
    				}
    				
    				this.emprestimo();
    			} else {
    				console.clear();
    				console.log("O empréstimo falhou! O livro não existe!");
    				this.emprestimo();
    			}
    		} else if (resp == 2 && usuario !== null) {
    			const titulo = readlineSync.question(`| Digite o Título: `);
    			const livro = JSON.parse(await empS.consultarLivroTitulo(titulo));
    			const l = livro;
    			
    			//Verifica se o livro não é nulo
    			if (livro !== null) {
    				const v = await empS.adicionarEmprestimo(l[0].id, usuario.id);
    				
    				if (v) {
    					console.log("O usuário já está com o livro emprestado.")
    				} else {
    					console.log("Empréstimo feito!")
    				}
    				
    				this.emprestimo();
    			} else {
    				console.clear();
    				console.log("O empréstimo falhou! O livro não existe!");
    				this.emprestimo();
    			}
    		} else {
    			console.log("Retornando...");
    			
    			this.emprestimo();
    		}
		} catch (error: any) {
        	console.error("Erro:", error.message);
        	this.emprestimo();
    	}
	}
}
