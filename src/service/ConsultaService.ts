import { ConsultaRepository } from '../repository/ConsultaRepository';
import { Livro } from '../modelos/Livro';

export class ConsultaService {
	teste: string = '';

	//Palavra-chave await em consultas (querys) sql são essenciais, se não os métodos (querys) retornarão
    //algo do tipo: Promise { <pending> }
    
    
    //selecionarLivro(): void {
    //	const result = await prisma.$queryRawUnsafe(`SELECT * FROM Livro`);
    //}
    
    consultaInicial(column: string, param: string): void { //Livro[] | null
    	const con = new ConsultaRepository();
    	this.teste = `${column} LIKE '%${param}%'`;
		con.consultarLivro(this.teste);
    }
    
    consultaSecundaria(column: string, param: string): void {
    	const con = new ConsultaRepository();
    	this.teste += ` AND ${column} LIKE '%${param}%'`;
		con.consultarLivro(this.teste);
    }
    
    /*async consultaUnicaISBN(isbn: string): Promise<Livro> {
    	const livro = await livRep.findByISBN(isbn);
        
        //VErifica se o livro é nulo.
        if (verificacao) {
        	return true;
        } else {
        	livRep.save(titulo, isbn);
        	return false;
        }
    }*/
}
