import * as readlineSync from 'readline-sync';
import { Sessao } from '../index';
import { Usuario } from '../modelos/Usuario';
import { EmprestimoService } from '../service/EmprestimoService'
import { UsuarioService } from '../service/UsuarioService'
import { InterfaceBiblio } from '../console/InterfaceBiblio'
import { InterfaceConsulta } from '../console/InterfaceConsulta'
import { InterfaceDevolucao } from '../console/InterfaceDevolucao'
import { InterfaceEmprestimo } from '../console/InterfaceEmprestimo'

//Instância de UsuarioService destinada a ser utilizada em todos os métodos da classe.
const usuarioS = new UsuarioService();
const interfaceEmp = new InterfaceEmprestimo();
const interfaceDev = new InterfaceDevolucao();
const interfaceBiblio = new InterfaceBiblio();
const empS = new EmprestimoService();

export class InterfaceUsuario {
	
	//Página inicial do sistema. Direriona o usuário às páginas de Cadastro e Login.
	iniciar(): void {
		console.log(`|---------------Iniciando Sistema---------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . . . [1] Cadastro  . . . . . . . . |`)
		console.log(`| . . . . . . . . [2] Login     . . . . . . . . |`)
		console.log(`| . . . . . . . . [0] Sair      . . . . . . . . |`)
		console.log(`|-----------------------------------------------|`)
		try {
			const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1, 2], limitMessage:  'Opção incorreta! Digite novamente: '});
			if (resp == 1) {
				this.cadastrarUsuario();
			} else if (resp == 2) {
				this.logarUsuario();
			} else {
				this.desconectar();
			}
		} catch (error: any) {
        	console.error("Erro:", error.message);
        }
	}
	
	//Página destinada ao cadastro de usuários. Implementa o método adicionarUsuario() de UsuarioService.
	async cadastrarUsuario(): Promise<void> {
		console.clear()
		console.log(`|------------------- Cadastro  -----------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		try {
			const name = readlineSync.question(`|~~~> Nome: `)
			const senha = readlineSync.question(`|~~~> Senha: `)
			const email = readlineSync.questionEMail(`|~~~> E-mail: `)
        	if(await usuarioS.adicionarUsuario(name, senha, email)) {
        		console.clear()
        		console.log("Usuário cadastrado com sucesso!");
        		
        		//Salva o email do usuário que está usando na classe Sessao, no atributo estático email;
        		Sessao.email = email;
        		
        		//Direciona usuário a home();
        		this.home();
        	} else {
        		console.clear()
        		console.log("Este e-mail já está cadastrado! Tente novamente.");
        		this.cadastrarUsuario();
        	}
		} catch (error: any) {
			console.error("Erro: ", error.message);
        }
	}
	
	//Página destinada ao login de usuários. Implementa o método login() de UsuarioService.
	async logarUsuario(): Promise<void> {
		console.clear();
		console.log(`|-------------------  Login  -------------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		try {
			const email = readlineSync.questionEMail(`|~~~> E-mail: `)
			const senha = readlineSync.question(`|~~~> Senha: `)
			
			//verifica se o método login() retorna nulo, se não: direciona para a página Home.
			if (await usuarioS.login(senha, email)) {
				//Salva o email do usuário que está usando na classe Sessao, no atributo estático email;
				Sessao.email = email;
				
				//Direciona usuário a home();
				this.home();
			} else {
				console.log("Credenciais incorretas! Tente novamente.");
				this.iniciar();
			}
		} catch (error: any) {
        	console.error("Erro: ", error.message);
        }
	}
	
	//Página Home, de entrada ao sistema.
	//Este método verifica se o usuário é um Membro ou Admin.
	//Direciona o Usuário à páginas de acordo com o seu tipo.
	async home(): Promise<void> {
		//Verifica a data de vencimento quando o usuário 'loga' no sistema
		empS.verificarEmprestimos(Sessao.email);
	
		const usuario = await usuarioS.getUsuario(Sessao.email);
		if (usuario !== null && usuario.tipo == 'Membro') {
			console.clear();
			
			console.log(`|-------------- Biblioteca Virtual -------------|`)
			console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
			console.log(`| . . . [1] Empréstimos  | [2] Devoluções . . . |`)
			console.log(`| . . . [3] Consulta     | [0] Sair       . . . |`)
			try {
				const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1, 2, 3], limitMessage:  'Opção incorreta! Digite novamente: '});
				if (resp == 1) {
					interfaceEmp.emprestimo();
				} else if (resp == 2) {
					interfaceDev.devolucao();
				} else if (resp == 3){
					const consulta = new InterfaceConsulta();
					consulta.homeConsulta();
				} else {
					this.desconectar();
				}
			} catch (error: any) {
            	console.error("Erro: ", error.message);
        	}
		} else if (usuario !== null && usuario.tipo == 'Bibliotecário') {
			interfaceBiblio.homeAdmin();
		} else {
			console.clear();
			console.log("Usuário não cadastrado. Sistema encerrado.");
			this.desconectar();
		}
	}
	
	desconectar(): void {
		console.clear();
		console.log(`|~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~|`)
		console.log(`| .   .   .   .   .   .   .   .   .   .   .   . |`)
		console.log(`|   .   .   .   .   .   .   .   .   .   .   .   |`)
		console.log(`| .   .   .   .   DESCONECTADO    .   .   .   . |`)
		console.log(`|   .   .   .   .   .   .   .   .   .   .   .   |`)
		console.log(`| .   .   .   .   .   .   .   .   .   .   .   . |`)
		console.log(`|~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~|`)
		Sessao.email = '';
	}
}
