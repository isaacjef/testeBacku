import * as readlineSync from 'readline-sync';
import { LivroService } from '../service/LivroService'
import { CategoriaLivro } from "../enumeracao/CategoriaLivro"

//Instância de LivroService destinada a ser utilizada em todos os métodos da classe.
const livro = new LivroService();

export class InterfaceLivro {
	
	//Página destinada ao cadastro de Livros. Implementa o método adicionarLivro() de LivroService.
    async cadastrarLivro(): Promise<void> {
		console.log(`|---------------Cadastrar Livro---------------|`)
		console.log(`|                                             |`)
		try {
			const titulo = readlineSync.question(`| Título:`)
			const isbn = readlineSync.question(`| ISBN:`)
			const categoria = [CategoriaLivro.FICCAO, CategoriaLivro.CIENCIA, CategoriaLivro.HISTORIA, CategoriaLivro.TECNOLOGIA, CategoriaLivro.OUTRO]
			const index = readlineSync.keyInSelect(categoria, "| Qual categoria?");
			
			const data = readlineSync.question(`| Informe a data: `);
        	if (await livro.adicionarLivro(titulo, isbn, categoria[index], data)) {
        		console.log("Livro cadastrado com sucesso")
        		//this.cadastrarLivro();
        	} else {
        		console.log("Livro já cadastrado! Tente novamente.")
        	}
		} catch (error: any) {
        	console.error("Erro:", error.message);
        }
		console.log(`|---------------------------------------------|`)
	}
}
