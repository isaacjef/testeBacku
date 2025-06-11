import { Livro } from '../modelos/Livro';
import { ConsultaRepository } from '../repository/ConsultaRepository';

//Instância de ConsultaRepository destinada a ser utilizada em todos os métodos da classe.
const con = new ConsultaRepository();

export class ConsultaService {
	teste: string = '';

    consultaInicial(column: string, param: string): void { //Livro[] | null
    	this.teste = `${column} LIKE '%${param}%'`;
		con.consultarLivro(this.teste);
    }
    
    consultaSecundaria(column: string, param: string): void {
    	this.teste += ` AND ${column} LIKE '%${param}%'`;
		con.consultarLivro(this.teste);
    }
    
    /*async consultaUnicaISBN(isbn: string): Promise<Livro> {
    	const livro = await livRep.findByISBN(isbn);
        
        //VErifica se o livro é nulo.
        if (livro !== null) {
        	return true;
        } else {
        	livRep.save(titulo, isbn);
        	return false;
        }
    }*/
}
