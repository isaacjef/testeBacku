import { prisma } from '../index';
import { UsuarioRepository } from '../repository/UsuarioRepository';

export class UsuarioService {

    async adicionarUsuario(name: string, email: string): Promise<string> {
        //palavra-chave await é extremamente necessária neste caso!!!
        const usuario = await prisma.usuario.create({
            data: {
                name: `${name}`,
                email: `${email}`,
            },
        })
        console.log(usuario);

        await prisma.$disconnect();

        return new Promise((resolve) => {
        	setTimeout(() => {
            	resolve("ASync teste");
        	}, 10);
    	});

    }
    //Palavra-chave await em consultas (querys) sql são essenciais, se não os métodos (querys) retornarão
    //algo do tipo: Promise { <pending> }
    async login(name: string, email: string): Promise<string> {
		const n = new UsuarioRepository();
		console.log("Testando usuario service " + email)
		const t = await n.findByEmail(email);
		console.log(t);
		
        await prisma.$disconnect();

        return new Promise((resolve) => {
        	setTimeout(() => {
            	resolve("ASync teste");
        	});
    	});
    }


}
