import * as readlineSync from 'readline-sync';
import { LivroService } from '../service/LivroService'

export class GerenciarLivro {

    cadastrarLivro(): void {
		console.log(`|---------------Cadastrar Livro---------------|`)
		console.log(`|                                             |`)
		try {
			const titulo = readlineSync.question(`| Título:`)
			const genero = readlineSync.question(`| Gênero:`)
			const isbn = readlineSync.question(`| ISBN:`)
			const livro = new LivroService();
        	livro.adicionarLivro(titulo, isbn);
		} catch (error: any) {
                    console.error("Erro:", error.message);
        }
		console.log(`|---------------------------------------------|`)
	}

}
