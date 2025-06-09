import * as readlineSync from 'readline-sync';
import { prisma } from '../index';
import { ConsultaService } from '../service/ConsultaService'
import { Livro } from '../modelos/Livro';
//const r1 = await prisma.$queryRawUnsafe(`SELECT * FROM Livro WHERE isbn LIKE '%${resp}%'`)

export class InterfaceConsulta {
	categorias: string[] = ['titulo', 'isbn'];
	livros: Livro[] = [];
	
    async iniciarConsulta(): Promise<void> {
		console.log(`|------------------ Consulta -----------------|`)
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
				const num = readlineSync.questionInt(`|Digite uma opção: `, {limit: [0, 1, 9], limitMessage:  'Opção incorreta! Digite novamente: '});
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
	
	consultaUnica(email: string): void {
		console.log(`|-------------- Consulta Única ---------------|`)
		console.log(`|                                             |`)
		console.log(`|   Selecione uma das opções para consulta:   |`)
		console.log(`|            [0] Título | [1] ISBN            |`)		
		const num = readlineSync.questionInt(`|Digite uma opção: `, {limit: [0, 1], limitMessage:  'Opção incorreta! Digite novamente: '});
		if (num == 0) {
			const titulo = readlineSync.question(`| Digite o título do Livro: `);
		} else {
			const isbn = readlineSync.question(`| Digite o ISBN do Livro: `);
		}
	}
	
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
