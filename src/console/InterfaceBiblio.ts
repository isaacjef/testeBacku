import { form } from '../index';
import { Sessao } from '../index';
import * as readlineSync from 'readline-sync';
import { InterfaceLivro } from '../console/InterfaceLivro'

//const livS = new LivroService();
const interfaceLivro = new InterfaceLivro();

export class InterfaceBiblio {
	async homeAdmin(): Promise<void> {
		console.clear();
		console.log(`|--------- Bem-vindo(a) Bibliotecário(a) -------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . [1] Gerenciar Livros          . . . |`)
		console.log(`| . . . . . [2] Gerenciar Usuários        . . . |`)
		console.log(`| . . . . . [0] Sair                      . . . |`)
		try {
				const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1, 2, 3], limitMessage:  'Opção incorreta! Digite novamente: '});
				if (resp == 1) {
					interfaceLivro.gerenciarLivro()
				} else if (resp == 2) {
					//this.gerenciarUsuario();
				} else {
					form.desconectar();
				}
		} catch (error: any) {
            	console.error("Erro: ", error.message);
        }
	}
	
	gerenciarUsuario(): void {
	
	}
	
}
