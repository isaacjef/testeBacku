import * as readlineSync from 'readline-sync';
import { UsuarioService } from '../service/UsuarioService'

export class Formulario {
	
	cadastrarUsuario(): void {
		console.log(`|---------------Teste de User---------------|`)
		console.log(`| Olá . . . Admin . . . 					 |`)
		try {
			const name = readlineSync.question(`| Nome:`)
			//Controller  adicionáar valores ao bd, atraveś do model ORM
			const email = readlineSync.question(`| E-mail:`)
			const usuario = new UsuarioService();
        	usuario.adicionarUsuario(name, email);
		} catch (error: any) {
                    console.error("Erro:", error.message);
        }
		console.log(`|-------------------------------------------|`)
	}

	logarUsuario(): void {
		console.log(`|---------------    Login    ---------------|`)
		console.log(`|                        					 |`)
		try {
			const name = readlineSync.question(`| Nome:`)
			//Posteriormente, substituir nome por senha.
			const email = readlineSync.question(`| E-mail:`)
			const usuario = new UsuarioService();
        	
			usuario.login(name, email);
		} catch (error: any) {
                    console.error("Erro:", error.message);
        }
		console.log(`|-------------------------------------------|`)

	}
}     
