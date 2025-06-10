import * as readlineSync from 'readline-sync';
import { Usuario } from '../modelos/Usuario';
import { UsuarioService } from '../service/UsuarioService'
import { limparConsole } from '../console/InterfaceConfig'
import { InterfaceConsulta } from '../console/InterfaceConsulta'
import { InterfaceEmprestimo } from '../console/InterfaceEmprestimo'


//Instância de UsuarioService destinada a ser utilizada em todos os métodos da classe.
const usuarioS = new UsuarioService();
const interfaceEmp = new InterfaceEmprestimo();

export class InterfaceUsuario {
	
	//Página inicial do sistema. Direriona o usuário às páginas de Cadastro e Login.
	iniciar(): void {
		console.log(`|---------------Iniciando Sistema---------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . . . [1] Cadastro  . . . . . . . . |`)
		console.log(`| . . . . . . . . [2] Login     . . . . . . . . |`)
		console.log(`|-----------------------------------------------|`)
		try {
			const resp = readlineSync.question(`                      `, {limit: [1, 2], limitMessage:  'Opção incorreta! Digite novamente: '});
			if (resp == '1') {
				limparConsole(2);
				this.cadastrarUsuario();
			} else {
				limparConsole(2);
				this.logarUsuario();
			}
		} catch (error: any) {
        	console.error("Erro:", error.message);
        }
	}
	
	//Página destinada ao cadastro de usuários. Implementa o método adicionarUsuario() de UsuarioService.
	async cadastrarUsuario(): Promise<void> {
		console.log(`|------------------- Cadastro  -----------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		try {
			const name = readlineSync.question(`| Nome:`)
			const senha = readlineSync.question(`| Senha:`)
			const email = readlineSync.questionEMail(`| E-mail:`)
        	if(await usuarioS.adicionarUsuario(name, senha, email)) {
        		console.log("Usuário cadastrado com sucesso!");
        		limparConsole(2);
        		this.direcionarUsuario(email);
        	} else {
        		console.log("Este e-mail já está cadastrado! Tente novamente.");
        		limparConsole(2);
        		this.cadastrarUsuario();
        	}
		} catch (error: any) {
			console.error("Erro: ", error.message);
        }
	}
	
	//Página destinada ao login de usuários. Implementa o método login() de UsuarioService.
	async logarUsuario(): Promise<void> {
		console.log(`|-------------------  Login  -------------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		try {
			const email = readlineSync.questionEMail(`| E-mail:`)
			const senha = readlineSync.question(`| Senha:`)
			
			//verifica se o método login() retorna nulo, se não: direciona para a página Home.
			if (await usuarioS.login(senha, email)) {
				this.direcionarUsuario(email);
			} else {
				console.log("Credenciais incorretas! Digite novamente.");
				this.logarUsuario();
			}
		} catch (error: any) {
        	console.error("Erro: ", error.message);
        }
	}
	
	//Página Home, de entrada ao sistema.
	//Este método verifica se o usuário é um Membro ou Admin.
	//Direciona o Usuário à páginas de acordo com o seu tipo.
	async direcionarUsuario(email: string): Promise<void> {
		const usuario = await usuarioS.getUsuario(email);
		if (usuario !== null && usuario.tipo == 'Membro') {
			console.log(`|-------------- Biblioteca Virtual -------------|`)
			console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
			console.log(`| . . . [1] Empréstimos  | [2] Devoluções . . . |`)
			console.log(`| . . . [3] Consulta     |      . . . . . . . . |`)
			try {
				const resp = readlineSync.question(`             `, {limit: [1, 2, 3], limitMessage:  'Opção incorreta! Digite novamente: '});
				if (resp == '1') {
					interfaceEmp.listarEmprestimo(email);
				} else if (resp == '2') {
					//this.logarUsuario();
				} else {
					const consulta = new InterfaceConsulta();
					consulta.iniciarConsulta();
				}
			} catch (error: any) {
                    	console.error("Erro: ", error.message);
        	}
		} else if (usuario !== null && usuario.tipo == 'Bibliotecário') {
			console.log(`|---------- Bem-vinde BIBLIOTECÁRIE ---------|`)
			console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
			console.log(`| . . . [1] Gerenciar Livros              . . . |`)
			console.log(`| . . . [2] Gerenciar Usuários          . . . . |`)
		} else {
			console.log("Usuário não cadastrado. Sistema encerrado.")
		}
	}
	
	async home(email: string): Promise<void> {
		const usuario = await usuarioS.getUsuario(email);
		if (usuario && usuario.tipo == 'Membro') {
			console.log(`|-------------- Biblioteca Virtual -------------|`)
			console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
			console.log(`| . . . [1] Empréstimos  | [2] Devoluções . . . |`)
			console.log(`| . . . [3] Consulta     |      . . . . . . . . |`)
			try {
				const resp = readlineSync.question(`             `, {limit: [1, 2, 3], limitMessage:  'Opção incorreta! Digite novamente: '});
				if (resp == '1') {
					interfaceEmp.emprestimo(email);
				} else if (resp == '2') {
					//t
				} else {
					const consulta = new InterfaceConsulta();
					consulta.iniciarConsulta();
				}
			} catch (error: any) {
                    	console.error("Erro: ", error.message);
        	}
		}
	}
}
