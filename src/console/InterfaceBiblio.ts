import { form } from '../index';
import { Sessao } from '../index';
import { InterfaceUsuario } from '../console/InterfaceUsuario'

export class InterfaceBiblio {
	async homeAdmin(): Promise<void> {
		console.log(`|--------- Bem-vindo(a) Bibliotecário(a) -------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . [1] Gerenciar Livros          . . . |`)
		console.log(`| . . . . . [2] Gerenciar Usuários        . . . |`)
		console.log(`| . . . . . [0] Sair                      . . . |`)
		try {
				const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1, 2, 3], limitMessage:  'Opção incorreta! Digite novamente: '});
				if (resp == 1) {
					interfaceEmp.emprestimo();
				} else if (resp == 2) {
					//this.logarUsuario();
				} else if (resp == 3){
					const consulta = new InterfaceConsulta();
					consulta.homeConsulta();
				} else {
					form.desconectar();
				}
		} catch (error: any) {
            	console.error("Erro: ", error.message);
        }
	}
	
	gerenciarLivro(): void {
	
	}
	
	gerenciarUsuario(): void {
	
	}
	
}
