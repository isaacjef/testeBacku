import * as readlineSync from 'readline-sync';
import { LivroService } from '../service/LivroService'
import { CategoriaLivro } from "../enumeracao/CategoriaLivro"

//Instância de LivroService destinada a ser utilizada em todos os métodos da classe.
const livro = new LivroService();

export class InterfaceLivro {
	
	async gerenciarLivro(): Promise<void> {
		console.log(`|--------------- Gerenciar Livro ---------------|`)
		console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
		console.log(`| . . . . . [1] Cadastrar Livro . . . . . . . . |`)
		console.log(`| . . . . . [2] Atualizar Livro . . . . . . . . |`)
		console.log(`| . . . . . [3] Deletar Livro   . . . . . . . . |`)
		const resp = readlineSync.question(`|--> `, {limit: [1, 2, 3], limitMessage:  'Opção incorreta! Digite novamente: '});
		try {
			if (resp == '1') {
				this.cadastrarLivro();
			} else if (resp == '2') {
				//this.atualizarLivro();
			} else {
				//this.deletarLivro();
			}
		} catch (error: any) {
        	console.error("Erro:", error.message);
        }
	}
	
	//Página destinada ao cadastro de Livros. Implementa o método adicionarLivro() de LivroService.
    async cadastrarLivro(): Promise<void> {
		console.log(`|---------------Cadastrar Livro---------------|`)
		console.log(`|                                             |`)
		try {
			const titulo = readlineSync.question(`| Título: `)
			const isbn = readlineSync.question(`| ISBN: `)
			const categoria = [CategoriaLivro.FICCAO, CategoriaLivro.CIENCIA, CategoriaLivro.HISTORIA, CategoriaLivro.TECNOLOGIA, CategoriaLivro.OUTRO]
			const index = readlineSync.keyInSelect(categoria, "| Selecione a categoria: ");
			const anoPublicacao = readlineSync.question("Ano de publicação: ")
			
        	if (await livro.adicionarLivro(titulo, isbn, categoria[index], anoPublicacao)) {
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
}
