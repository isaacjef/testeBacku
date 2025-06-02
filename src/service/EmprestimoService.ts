import { prisma } from '../index';
import { Livro } from '../modelos/Livro';
import { Emprestimo } from '../modelos/Emprestimo';
import { LivroService } from '../service/LivroService';
import { UsuarioService } from '../service/UsuarioService';
import { EmprestimoRepository } from '../repository/EmprestimoRepository';

const userS = new UsuarioService();
const livS = new LivroService();
const empRep = new EmprestimoRepository();

export class EmprestimoService {

	//async adicionarEmprestimo(): Promise<void> {
		//verificar se o livro foi alocado. COmo se trata de uma biblio virtual, o mesmo livro pode ser alocado infinitamente.
	//}
	
    async getEmprestimos(email: string): Promise<void> {
        const usuario = await userS.getUsuario(email);

        if (usuario) {
        	const livros: Array<number> = JSON.parse(await empRep.findEmprestimos(usuario.id));
        	console.log(`|------------- Empréstimos Atuais --------------|`);
        	
        	//tratar se não tiver nenhum livro
        	livros.forEach(async (value: number) => {
        		const livro: Livro = await livS.buscarLivro(value);
        		
        		console.log(`| Título: ${livro.titulo}, ISBN: ${livro.isbn}`);
        	});
        }
    }

}
