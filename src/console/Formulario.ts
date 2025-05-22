import * as readlineSync from 'readline-sync';
import { UsuarioService } from '../service/UsuarioService'

export class Formulario {
	
	iniciar(): void {
		console.log(`|---------------Iniciando Sistema---------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . . . [1] Cadastro  . . . . . . . . |`)
		console.log(`| . . . . . . . . [2] Login     . . . . . . . . |`)
		try {
			const resp = readlineSync.question(`                      `, {limit: [1, 2]});
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

	logarUsuario(): void {
		console.log(`|-------------------  Login  -------------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		try {
			const name = readlineSync.question(`| Nome:`)
			//Posteriormente, substituir nome por senha...
			const email = readlineSync.question(`| E-mail:`)
			const usuario = new UsuarioService();
        	
			usuario.login(name, email);
		} catch (error: any) {
                    console.error("Erro:", error.message);
        }
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`|-----------------------------------------------|`)
	}
}     
