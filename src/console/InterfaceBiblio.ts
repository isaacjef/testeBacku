import { form } from '../index';
import { Sessao } from '../index';
import * as readlineSync from 'readline-sync';
import { InterfaceLivro } from '../console/InterfaceLivro'
import { UsuarioService } from '../service/UsuarioService'

const userS = new UsuarioService();
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
			const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1, 2], limitMessage:  'Opção incorreta! Digite novamente: '});
			if (resp == 1) {
				interfaceLivro.gerenciarLivro()
			} else if (resp == 2) {
				this.gerenciarUsuario();
			} else {
				form.desconectar();
			}
		} catch (error: any) {
            console.error("Erro: ", error.message);
        }
	}
	
	async gerenciarUsuario(): Promise<void> {
		console.clear();
		console.log(`|~~~~~~~~~~~~~~ Gerenciar Usuarios ~~~~~~~~~~~~~|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . [0] Sair              . . . . . . |`)
		console.log(`| . . . . . . [1] Adicionar Biblio... . . . . . |`)
		console.log(`| . . . . . . [2] Listar Usuarios   . . . . . . |`)
		console.log(`| . . . . . . [3] Alterar Usuario   . . . . . . |`)
		console.log(`| . . . . . . [4] Excluir Usuario   . . . . . . |`)
		console.log(`| . . . . . . [5] Retornar          . . . . . . |`)
		try {
			const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1, 2, 3, 4, 5], limitMessage:  'Opção incorreta! Digite novamente: '});
			switch(resp) {
				case 0:
					return form.desconectar();
				case 1:
					return this.cadastrarBiblio();
				case 2:
					return this.listarUsuarios();
				case 3:
					return this.alterarNome();
				case 4:
					return this.deletarUsuario();
				case 5:
					return this.homeAdmin();
			}
		} catch (error: any) {
           	console.error("Erro: ", error.message);
        }
	}
	
	//Página destinada ao cadastro de bibliotecário. Somente um bibliotecário pode adicionar outro.
    async cadastrarBiblio(): Promise<void> {
		console.log(`|----------- Cadastrar Bibliotecário -----------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		try {
			const nome = readlineSync.question(`| Nome: `)
			const senha = readlineSync.question(`| Senha: `)
			const email = readlineSync.questionEMail(`| E-mail: `)
			
        	if (await userS.adicionarBiblio(nome, senha, email)) {
        		console.log("Usuário cadastrado com sucesso")
        		this.gerenciarUsuario();
        	} else {
        		console.log("Bibliotecário já cadastrado! Tente novamente.")
        		this.cadastrarBiblio();
        	}
		} catch (error: any) {
        	console.error("Erro:", error.message);
        }
	}
	
	async listarUsuarios(): Promise<void> {
		console.clear();
		console.log(`|~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Usuarios Cadastrados ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ `)
		await userS.getUsuarios();
		console.log(`| . . . . . . .  [0] Retornar   . . . . . . . . |`)
		console.log(`| . . . . . . .  [1] Sair       . . . . . . . . |`)
		try {
			const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1], limitMessage:  'Opção incorreta! Digite novamente: '});
			switch(resp) {
				case 0:
					return this.gerenciarUsuario();
				case 1:
					return form.desconectar();
			}
		} catch (error: any) {
            console.error("Erro: ", error.message);
        }
	}
	
	//Permite modificar o nome
	async alterarNome(): Promise<void> {
		console.clear();
		console.log(`| . . . . . . . .  Alterar Nome  . . . . . . . . |`)
		try {
			const email = readlineSync.question(`|~~> Digite o e-mail do Usuário: `);
			const nome = readlineSync.question(`|~~> Digite o novo nome do Usuário: `);
			
			if(await userS.atualizarNome(email, nome)) {
				console.log("Nome alterado com sucesso");
			} else {
				console.log("Nome não foi alterado.");
			}
			
			this.gerenciarUsuario();
		} catch (error: any) {
            console.error("Erro: ", error.message);
        }
	}
	
	//Página para deletar usuarios
	async deletarUsuario(): Promise<void> {
		console.clear();
		console.log(`| . . . . . . .  Deletar Usuario  . . . . . . . . |`)
		try {
			const email = readlineSync.question(`|~~> Digite o e-mail do Usuário: `);
			
			if (await userS.deletar(email)) {
				console.log("Usuário não foi deletado.")
			} else {
				console.log("Usuário deletado com sucesso.")
			}
			
			this.gerenciarUsuario();
		} catch (error: any) {
            console.error("Erro: ", error.message);
        }
	}
}
