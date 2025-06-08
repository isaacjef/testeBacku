import * as readlineSync from 'readline-sync';
import { Usuario } from '../modelos/Usuario';
import { UsuarioService } from '../service/UsuarioService'
import { InterfaceConsulta } from '../console/InterfaceConsulta'

//Instância de UsuarioService destinada a ser utilizada em todos os métodos da classe.
const usuarioS = new UsuarioService();

export class InterfaceUsuario {
	
	//Página inicial do sistema. Direriona o usuário às páginas de Cadastro e Login.
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
	
	//Página destinada ao cadastro de usuários. Implementa o método adicionarUsuario() de UsuarioService.
	async cadastrarUsuario(): Promise<void> {
		console.log(`|------------------- Cadastro  -----------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		try {
			const name = readlineSync.question(`| Nome:`)
			const senha = readlineSync.question(`| Senha:`)
			const email = readlineSync.questionEMail(`| E-mail:`)
        	if(await usuarioS.adicionarUsuario(name, senha, email)) {
        		console.log("Este e-mail já está cadastrado! Tente novamente.");
        		this.cadastrarUsuario();
        	} else {
        		console.log("Usuário cadastrado com sucesso!");
        		this.home(email);
        	}
		} catch (error: any) {
                    console.error("Erro: ", error.message);
        }
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`|-----------------------------------------------|`)
	}
	
	//Página destinada ao login de usuários. Implementa o método login() de UsuarioService.
	async logarUsuario(): Promise<void> {
		console.log(`|-------------------  Login  -------------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		try {
			const email = readlineSync.questionEMail(`| E-mail:`)
			const senha = readlineSync.question(`| Senha:`)
			
			//verifica se o método login() retorna nulo, se não: direciona para a página Home.
			if (await usuarioS.login(senha, email)) {
				this.home(email);
			} else {
				console.log("Credenciais incorretas! Digite novamente.");
				this.logarUsuario();
			}
		} catch (error: any) {
                    console.error("Erro: ", error.message);
        }
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`|-----------------------------------------------|`)
	}
	
	//Página Home, de entrada ao sistema.
	//Esta classe verifica se o usuário é um Membro ou Admin.
	async home(email: string): Promise<void> {
		const usuario = await usuarioS.getUsuario(email);
		if (usuario && usuario.tipo == 'Membro') {
			console.log(`|-------------- Biblioteca Virtual -------------|`)
			console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
			console.log(`| . . . [1] Empréstimos  | [2] Devoluções . . . |`)
			console.log(`| . . . [3] Consulta     |      . . . . . . . . |`)
			try {
				const resp = readlineSync.question(`                      `, {limit: [1, 2, 3], limitMessage:  'Opção incorreta! Digite novamente: '});
				if (resp == '1') {
					//this.emprestimo(email);
				} else if (resp == '2') {
					//this.logarUsuario();
				} else {
					const consulta = new InterfaceConsulta();
					consulta.iniciarConsulta();
				}
			} catch (error: any) {
                    	console.error("Erro: ", error.message);
        	}
        	console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
			console.log(`|-----------------------------------------------|`)
		}
	}
	
	emprestimo(email: string): void {
		console.log(`|----------------  Empréstimo  -----------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		//Listar todos os livros pegos pelo usuario.
		//Seção para realizar um empréstimo
		try {
			const titulo = readlineSync.question(`| Título:`)
		} catch (error: any) {
        	console.error("Erro:", error.message);
    	}
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
	}
}
