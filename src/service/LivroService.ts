import { prisma } from '../index';
import { Livro} from '../modelos/Livro';
import { LivroRepository } from '../repository/LivroRepository';

/*Livro:
titulo
isbn*/

//Instância de LivroRepository destinada a ser utilizada em todos os métodos da classe.
const livRep = new LivroRepository();

export class LivroService {

    async adicionarLivro(titulo: string, isbn: string): Promise<boolean> {
        const verificacao = await livRep.findByISBN(isbn);
        
        //Verifica se há algum livro com o ISBN digitado pelo usuário. Se houver, retorna true para a classe InterfaceLivro
        //Se não, salva o Livro no BD e retorna false.
        if (verificacao) {
        	return true;
        } else {
        	livRep.save(titulo, isbn);
        	return false;
        }


        /*return new Promise((resolve) => {
        	setTimeout(() => {
            	resolve("ASync teste");
        	}, 10);
    	});*/
    }

	//Verificar se o BD não retornar nenhum Livro2
	async getLivroByID(livroId: number): Promise<Livro> {
		const livro: Livro = JSON.parse(await livRep.findByID(livroId));
		
		return livro;
	}
}
