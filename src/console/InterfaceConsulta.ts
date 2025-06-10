import * as readlineSync from 'readline-sync';
import { form } from '../index';
import { Sessao } from '../index';
import { Livro } from '../modelos/Livro';
import { LivroService } from '../service/LivroService'
import { ConsultaService } from '../service/ConsultaService'

//Instância de LivroService destinada a ser utilizada em todos os métodos da classe.
const livS = new LivroService();

export class InterfaceConsulta {
	categorias: string[] = ['titulo', 'isbn'];
	livros: Livro[] = [];
	
	homeConsulta(): void {
		console.log(`|------------------ Consulta -----------------|`)
		console.log(`|                                             |`)
		console.log(`|              [0] Retornar                   |`)		
		console.log(`|              [1] Consulta Variada           |`)
		console.log(`|              [2] Consulta Única             |`)
		console.log(`|---------------------------------------------|`)
		const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1, 2], limitMessage:  'Opção incorreta! Digite novamente: '});
		if (resp == 0) {
			//Retorna o usuário ao método home() de InterfaceUsuario
			form.home();
		} else if (resp == 1) {
			this.consultaVariada();
		} else {
			//this.consultaUnica();
		}
	}
	
    async consultaVariada(): Promise<void> {
   		console.clear();
		console.log(`|-------------- Consulta Variada -------------|`)
		console.log(`|                                             |`)
		console.log(`|   Selecione uma das opções para consulta:   |`)
		console.log(`|            [0] Título | [1] ISBN            |`)
		console.log(`|            [9] Cancelar                     |`)
		console.log(`|---------------------------------------------|`)
		const con = new ConsultaService();
		let result;
		let i = 2;
		
		try {
			do {
				const num = readlineSync.questionInt(`|~~> `, {limit: [0, 1, 9], limitMessage:  'Opção incorreta! Digite novamente: '});
				if (i == 2 && num == 0 || num == 1) {
					const q1 = readlineSync.question(`| Digite sua consulta: `);
					result = con.consultaInicial(this.categorias[num], q1);
				} else if (i == 1 && num == 0 || num == 1) {
					const q2 = readlineSync.question(`| Digite sua consulta: `);
					result = con.consultaSecundaria(this.categorias[num], q2);
				} else if (i == 0 || num == 9) {
					i = 0;
					break;
				}
				//console.log(await result);
				i--;
			} while (i > 0);
		} catch (error: any) {
			console.log("Erro: ", error.message)
		}
		
	}
	
	/*async consultaUnica(email: string): Promise<void> {
		console.log(`|-------------- Consulta Única ---------------|`)
		console.log(`|                                             |`)
		console.log(`|   Selecione uma das opções para consulta:   |`)
		console.log(`|            [0] Título | [1] ISBN            |`)		
		const num = readlineSync.questionInt(`|~~> `, {limit: [0, 1], limitMessage:  'Opção incorreta! Digite novamente: '});
		if (num == 0) {
			const titulo = readlineSync.question(`| Digite o título do Livro: `);
			const livro = await livS.getLivroByTitulo(titulo);
			if (livro !== null) {
				console.log(livro)
			} else {
				console.log("Não há nenhum livro com o  título informado.")
			}
		} else {
			const isbn = readlineSync.question(`| Digite o ISBN do Livro: `);
		}
	}*/
	
	/*recursaoConsulta(index: number) {
		const con = new ConsultaService();
		const num = readlineSync.questionInt(`|`, {limit: [0, 1, 9], limitMessage:  'Opção incorreta! Digite novamente: '});
		const paramn = readlineSync.question(`| Digite sua consulta: `);
		if (index == 2) {
			con.consultaInicial(this.categorias[num], paramn);
		} else if (index == 1) {
			con.consultaSecundaria(this.categorias[num], paramn);
		} else {
			index = 0;
			break;
		}
		index--;
		
		this.recursaoConsulta(index);
	}*/

}
