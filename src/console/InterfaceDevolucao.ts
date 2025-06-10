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
				//this.listarEmprestimo();
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
}
