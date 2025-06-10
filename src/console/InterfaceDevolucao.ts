import * as readlineSync from 'readline-sync';
import { form } from '../index';
import { Sessao } from '../index';
import { Usuario } from '../modelos/Usuario';
import { UsuarioService } from '../service/UsuarioService'
import { LivroService } from '../service/LivroService';
import { EmprestimoService } from '../service/EmprestimoService'
import { EmprestimoRepository } from '../repository/EmprestimoRepository';

//Instância de UsuarioService destinada a ser utilizada em todos os métodos da classe.
const empS = new EmprestimoService();
const userS = new UsuarioService();
const livS = new LivroService();
const empRep = new EmprestimoRepository();

export class InterfaceDevolucao {
	
	//Página home de devoluções
	devolucao(): void {
		console.clear()
        console.log(`|----------------- Empréstimos -----------------|`)	
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . [0] Retornar            . . . . . . |`)
		console.log(`| . . . . . [1] Listar Devoluções   . . . . . . |`)
		console.log(`| . . . . . [2] Realizar Devolução  . . . . . . |`)
		console.log(`| . . . . . [3] Sair do Sistema     . . . . . . |`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1, 2, 3], limitMessage:  'Opção incorreta! Digite novamente: '});		
		try {
			if (resp == 0) {
				form.home();
			} else if (resp == 1) {
				this.listarDevolucoes();
			} else if (resp == 2) {
				//this.realizarEmprestimo();
			} else {
				form.desconectar();
			}
		} catch (error: any) {
        	console.error("Erro:", error.message);
    	}
	}
	
	//Página para listar todos as devoluções do usuário.
	async listarDevolucoes(): Promise<void> {
		console.clear()
        console.log(`|-------------- Devoluções Atuais --------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . .  [0] Retornar   . . . . . . . . |`)
		console.log(`| . . . . . . .  [1] Sair       . . . . . . . . |`)
		try {
			await empS.getDevolucoes(Sessao.email);
			
			const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1], limitMessage:  'Opção incorreta! Digite novamente: '});

			if (resp == 0) {
				this.devolucao();
    		} else {
    			form.desconectar();
    		}
		} catch (error: any) {
        	console.error("Erro:", error.message);
    	}
	}
	
	//Se der tempo, fazer método RealizarDevoluções
	//Antes de realizar a Devolução, o Usuário precisa informar o Livro.
	//O usuário deve informar um ISBN válido, para o sistema buscar o livro.
	async realizarDevolucao(): Promise<void> {
		console.clear()
        console.log(`|-------------- Realizar Devolucao -------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . . . [0] Retornar  . . . . . . . . |`)
		const resp = readlineSync.questionInt(`|~~> `, {limit: [0], limitMessage:  'Opção incorreta! Digite novamente: '});
		
		//Busca dados de usuário no banco.
		const usuario = await userS.getUsuario(Sessao.email);
		try {
			if (resp == 0) {
				this.devolucao();
				const isbn = readlineSync.question(`| Digite o ISBN: `);
				
				//Busca livro via ISBN no banco.
    			const livro = await livS.getLivroByISBN(isbn);
    			
    			if (livro !== null) {
    				//Verifica se há algum empréstimo do livro pelo usuário.
    				if (await empS.validarEmprestimo(livro.id, usuario.id)) {
    					console.log("Devolvendo livro...")
    					
    					empRep.updateStatus(livro.id, usuario.id);
    					this.devolucao()
    				} else {
    					console.log("Não há nenhum empréstimo feito com este livro.")
    					
    					this.devolucao();
    				}
    			} else {
    				console.log("O empréstimo falhou! O livro não existe!");
    			}
    		} else {
    			console.log("Usuário nulo!");
    		} 
		} catch (error: any) {
        	console.error("Erro:", error.message);
    	}
	}
}
