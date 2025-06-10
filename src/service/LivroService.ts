import { prisma } from '../index';
import { Livro} from '../modelos/Livro';
import { CategoriaLivro } from "../enumeracao/CategoriaLivro"
import { LivroRepository } from '../repository/LivroRepository';

//Instância de LivroRepository destinada a ser utilizada em todos os métodos da classe.
const livRep = new LivroRepository();

export class LivroService {

	//Tratar CategoriaLivro aqui.
	//Método implementado em cadastrarLivro() da classe InterfaceLivro.
    async adicionarLivro(titulo: string, isbn: string, categoria: CategoriaLivro, anoPublicacao: string): Promise<boolean> {
        const verificacao = JSON.parse(await livRep.findByISBN(isbn));
        
        //Verifica se há algum livro com o ISBN digitado pelo usuário. Se não houver, salva o livro no BD e retorna true para a classe InterfaceLivro
        //Se não, retorna falso.
        if (verificacao === null) {
        	await livRep.save(titulo, isbn, categoria, anoPublicacao);
        	console.log("Livro salvo no banco de dados.")
        	
        	return true;
        } else {
        	console.log("Este livro já está salvo no banco de dados.")
        	
        	return false;
        }
    }

	//Busca um Livro no banco de dados, a partir do ID.
	//Necessário tratar retorno nulo nos métodos que o implementarem.
	//Método implementado em getEmprestimos(), de EmprestimoService.
	async getLivroByID(livroId: number): Promise<Livro> {
		const livro: Livro = JSON.parse(await livRep.findByID(livroId));
		
		return livro;
	}
	
	//Busca um Livro no banco de dados, a partir do ID.
	//Necessário tratar retorno nulo nos métodos que o implementarem.
	async getLivroByISBN(isbn: string): Promise<Livro> {
		const livro: Livro = JSON.parse(await livRep.findByISBN(isbn));
		
		return livro;
	}
	
	//Lista todos os livros do banco.
	async getLivros(): Promise<void> {
    	const livros: Array<Livro> = JSON.parse(await livRep.consultarLivros());
    	
    	if (livros !== null) {
    		livros.forEach(async (value: Livro, index: number, array: Livro[]) => {
				console.log(`Livro ${index + 1} - Título: ${value.titulo}, ISBN: ${value.isbn}, Categoria: ${value.categoria}, Ano de Publicação: ${value.anoPublicacao}`)
        	});
    	} else {
    		console.log("Não há nenhum livro cadastrado.")
    	}
    }
    
    //Atualizar titulo do livro.
    async atualizarTitulo(isbn: string, titulo: string): Promise<boolean> {
    	await livRep.updateTitulo(isbn, titulo)
    	
    	const verificacao = JSON.parse(await livRep.findByISBN(isbn));
        
        //Verifica se há algum livro com o ISBN digitado pelo usuário.
        if (verificacao !== null && verificacao.titulo != titulo) {
        	return true;
        } else {	
        	return false;
        }
    }
    
    //Deleta livro do banco de dados
    async deletar(isbn: string): Promise<boolean> {
    	await livRep.deleteByISBN(isbn);
    	
    	const verificacao = await livRep.findByISBN(isbn);
        
        //Verifica se há algum livro com o ISBN digitado pelo usuário.
        if (verificacao !== null) {
        	return true;
        } else {	
        	return false;
        }
    }
	
	//Busca um Livro no banco de dados, a partir do título. O banco retorna o primeiro Livro que contenha o título.
	//Necessário tratar retorno nulo nos métodos que o implementarem.
	//Utilizado em ?
	/*async getLivroByTitulo(titulo: string): Promise<Livro> {
		const livro: Livro = JSON.parse(await livRep.findFirstTitulo(titulo));
		
    	return livro;
	}*/
}
