import { prisma } from '../index';
import { LivroRepository } from '../repository/LivroRepository';

/*Livro:
titulo
isbn*/

export class LivroService {

    async adicionarLivro(titulo: string, isbn: string): Promise<string> {
        const repositorio = new LivroRepository();
        repositorio.save(titulo, isbn);

        await prisma.$disconnect();

        return new Promise((resolve) => {
        	setTimeout(() => {
            	resolve("ASync teste");
        	}, 10);
    	});
    }

}
