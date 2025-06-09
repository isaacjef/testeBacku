import * as readlineSync from 'readline-sync';
import { LivroService } from '../service/LivroService'

export class InterfaceLivro {
	
	//Página destinada ao cadastro de Livros. Implementa o método adicionarLivro() de LivroService.
    async cadastrarLivro(): Promise<void> {
		console.log(`|---------------Cadastrar Livro---------------|`)
		console.log(`|                                             |`)
		try {
			const titulo = readlineSync.question(`| Título:`)
			const genero = readlineSync.question(`| Gênero:`)
			const isbn = readlineSync.question(`| ISBN:`)
			const livro = new LivroService();
        	if (await livro.adicionarLivro(titulo, isbn)) {
        		console.log("Livro já cadastrado! Tente novamente.")
        		this.cadastrarLivro();
        	} else {
        		console.log("Livro cadastrado com sucesso")
        	
        	}
		} catch (error: any) {
        	console.error("Erro:", error.message);
        }
		console.log(`|---------------------------------------------|`)
	}
}
