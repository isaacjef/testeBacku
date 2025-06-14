import { form } from '../index';
import { interfaceBiblio } from '../index';
import * as readlineSync from 'readline-sync';
import { LivroService } from '../service/LivroService'
import { CategoriaLivro } from "../enumeracao/CategoriaLivro"

//Instância de LivroService destinada a ser utilizada em todos os métodos da classe.
const livS = new LivroService();

export class InterfaceLivro {
	
	async gerenciarLivro(): Promise<void> {
		console.clear();
		console.log(`|~~~~~~~~~~~~~~~ Gerenciar Livros ~~~~~~~~~~~~~~|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . . [0] Sair            . . . . . . . |`)
		console.log(`| . . . . . . [1] Adicionar Livro . . . . . . . |`)
		console.log(`| . . . . . . [2] Listar Livros   . . . . . . . |`)
		console.log(`| . . . . . . [3] Alterar Titulo  . . . . . . . |`)
		console.log(`| . . . . . . [4] Excluir Livro   . . . . . . . |`)
		console.log(`| . . . . . . [5] Retornar        . . . . . . . |`)
		try {
			const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1, 2, 3, 4, 5], limitMessage:  'Opção incorreta! Digite novamente: '});
			switch(resp) {
				case 0:
					return form.desconectar();
				case 1:
					return this.cadastrarLivro();
				case 2:
					return this.listarLivros();
				case 3:
					return this.alterarTitulo();
				case 4:
					return this.deletarLivro();
				case 5:
					return interfaceBiblio.homeAdmin();
			}
		} catch (error: any) {
           	console.error("Erro: ", error.message);
        }
	}
	
	//Página destinada ao cadastro de Livros. Implementa o método adicionarLivro() de LivroService.
    async cadastrarLivro(): Promise<void> {
		console.log(`|--------------- Cadastrar Livro ---------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		try {
			const titulo = readlineSync.question(`| Título: `)
			const isbn = readlineSync.question(`| ISBN: `)
			console.log(`| Categorias: 1- ${CategoriaLivro.FICCAO}; 2- ${CategoriaLivro.CIENCIA}; 3- ${CategoriaLivro.HISTORIA}; 4- ${CategoriaLivro.TECNOLOGIA}; 5- ${CategoriaLivro.OUTRO}`)
			const num = readlineSync.questionInt(`| Selecione a categoria: `)
			let categoria;
			if (num == 1) {
				categoria = CategoriaLivro.FICCAO;
			} else if (num == 2) {
				categoria = CategoriaLivro.CIENCIA;
			} else if (num == 3) {
				categoria = CategoriaLivro.HISTORIA;
			} else if (num == 4) {
				categoria = CategoriaLivro.TECNOLOGIA;
			} else {
				categoria = CategoriaLivro.OUTRO;
			}
			const anoPublicacao = readlineSync.question("Ano de publicação: ")
			
        	if (await livS.adicionarLivro(titulo, isbn, categoria, anoPublicacao)) {
        		console.log("Livro cadastrado com sucesso")
        		this.gerenciarLivro();
        	} else {
        		console.log("Livro já cadastrado! Tente novamente.")
        		this.cadastrarLivro();
        	}
		} catch (error: any) {
        	console.error("Erro:", error.message);
        }
	}
	
	async listarLivros(): Promise<void> {
		console.clear();
		console.log(`|~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Livros Cadastrados ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ `)
		await livS.getLivros();
		console.log(`| . . . . . . .  [0] Retornar   . . . . . . . . |`)
		console.log(`| . . . . . . .  [1] Sair       . . . . . . . . |`)
		try {
			const resp = readlineSync.questionInt(`|~~> `, {limit: [0, 1], limitMessage:  'Opção incorreta! Digite novamente: '});
			switch(resp) {
				case 0:
					return this.gerenciarLivro();
				case 1:
					return form.desconectar();
			}
		} catch (error: any) {
            console.error("Erro: ", error.message);
        }
	}
	
	//Versão simplificado. Só permite modificar o título
	async alterarTitulo(): Promise<void> {
		console.clear();
		console.log(`| . . . . . . .  Alterar Título . . . . . . . . |`)
		try {
			const isbn = readlineSync.question(`|~~> Digite o ISBN do Livro: `);
			const titulo = readlineSync.question(`|~~> Digite o novo Título do Livro: `);
			
			if(await livS.atualizarTitulo(isbn, titulo)) {
				console.log("Título alterado com sucesso");
			} else {
				console.log("Título não foi alterado.");
			}
			
			this.gerenciarLivro();
		} catch (error: any) {
            console.error("Erro: ", error.message);
        }
	}
	
	//Página para deletar livros
	async deletarLivro(): Promise<void> {
		console.clear();
		console.log(`| . . . . . . .  Deletar Livro  . . . . . . . . |`)
		try {
			const isbn = readlineSync.question(`|~~> Digite o ISBN do Livro: `);
			
			if (await livS.deletar(isbn)) {
				console.log("Livro não foi deletado.")
			} else {
				console.log("Livro deletado com sucesso.")
			}
			
			this.gerenciarLivro();
		} catch (error: any) {
            console.error("Erro: ", error.message);
        }
	}
}
