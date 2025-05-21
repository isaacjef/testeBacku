import { Usuario } from '../modelos/Usuario';

export interface IUsuarioRepository {

/* Possíveis métodos:
*  listar registros
*  salvar no BD (criar)
*  deletar do BD
*
*/

    //adicionarUsuario(usuario: Usuario): Promise<string>
    findByEmail(email: string): Promise<Usuario | null>
    listarUsuarios(): void

}
