import { prisma } from '../index';
import { Livro} from '../modelos/Livro';
import { LivroRepository } from '../repository/LivroRepository';

/*Livro:
titulo
isbn*/

const livRep = new LivroRepository();

export class LivroService {

    async adicionarLivro(titulo: string, isbn: string): Promise<string> {
        livRep.save(titulo, isbn);

        await prisma.$disconnect();

        return new Promise((resolve) => {
        	setTimeout(() => {
            	resolve("ASync teste");
        	}, 10);
    	});
    }

	async buscarLivro(livroId: number): Promise<Livro> {
		const livro: Livro = JSON.parse(await livRep.findByID(livroId));
		
		return livro;
	}
}
