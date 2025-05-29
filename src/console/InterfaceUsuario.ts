import * as readlineSync from 'readline-sync';
import { UsuarioService } from '../service/UsuarioService'
import { InterfaceConsulta } from '../console/InterfaceConsulta'

export class InterfaceUsuario {
	
	iniciar(): void {
		console.log(`|---------------Iniciando Sistema---------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . . . [1] Cadastro  . . . . . . . . |`)
		console.log(`| . . . . . . . . [2] Login     . . . . . . . . |`)
		try {
			const resp = readlineSync.question(`                      `, {limit: [1, 2], limitMessage:  'Opção incorreta! Digite novamente: '});
			if (resp == '1')
				this.cadastrarUsuario();
			else
				this.logarUsuario();
		} catch (error: any) {
                    console.error("Erro:", error.message);
        }
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`|-----------------------------------------------|`)
	}
	
	cadastrarUsuario(): void {
		console.log(`|------------------- Cadastro  -----------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		try {
			const name = readlineSync.question(`| Nome:`)
			//utilizar readlineSync.questionEMail
			const email = readlineSync.question(`| E-mail:`)
			const usuario = new UsuarioService();
        	usuario.adicionarUsuario(name, email);
		} catch (error: any) {
                    console.error("Erro:", error.message);
        }
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`|-----------------------------------------------|`)
	}

	async logarUsuario(): Promise<void> {
		console.log(`|-------------------  Login  -------------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		try {
			const name = readlineSync.question(`| Nome:`)
			//Posteriormente, substituir nome por senha...
			const email = readlineSync.question(`| E-mail:`)
			const usuario = new UsuarioService();
			//verifica se deu certo, se sim: entra no sistema.
			if (await usuario.login(name, email)) {
				this.home();
			} else {
				console.log("Credenciais incorretas! Digite novamente.");
				this.iniciar();
			}
		} catch (error: any) {
                    console.error("Erro:", error.message);
        }
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`|-----------------------------------------------|`)
	}
	
	home(): void {
		//const usuario = new Usuario
		console.log(`|-------------- Biblioteca Virtual -------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . [1] Empréstimos  | [2] Devoluções . . . |`)
		console.log(`| . . . [3] Consulta     |      . . . . . . . . |`)
		try {
			const resp = readlineSync.question(`                      `, {limit: [1, 2, 3], limitMessage:  'Opção incorreta! Digite novamente: '});
			if (resp == '1') {
				//this.cadastrarUsuario();
			} else if (resp == '2') {
				//this.logarUsuario();
			} else {
				const consulta = new InterfaceConsulta();
				consulta.iniciarConsulta();
			}
		} catch (error: any) {
                    console.error("Erro:", error.message);
        }
        console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`|-----------------------------------------------|`)
	}
}
