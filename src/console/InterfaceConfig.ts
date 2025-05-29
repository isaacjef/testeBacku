import * as readlineSync from 'readline-sync'
import { execSync } from 'child_process'
import * as fs from 'fs'
import { stdin } from 'process'
import * as os from 'os';

/**
 * Função simples para limapr console
 * OBS: não faz nenhuma verificação condicional
 */
function limparConsole(identificadorSO: number): void {
    let cmd: string;

    switch(identificadorSO){
        case 1:
            cmd = 'cls'
        break

        case 3:
        case 2:
            cmd = 'clear'
        break

        default:
            console.log("\n\n")
            return
    }

    try {
        execSync(cmd, { stdio: 'inherit'})
    } catch(error) {
        console.log("\nErro ao executar comando limpar console")
    }
}

/**
 * Função salvamento simples da escolha do SO
 * OBS: não faz nenhuma verificação condicional
 */
function salvaSistema(osId: number, osNome: string): void{
    const dados = {
        sistemaEscolhido: {
            id: osId,
            nome: osNome
        }
    }

    const dadosJson = JSON.stringify(dados, null, 2)

    try {
        fs.writeFileSync('sistema_operacional.json', dadosJson, 'utf-8')
    } catch (error: any) {
        console.log("Erro: ", error.message)
    }

}


/**
 * Função para interface de escolha do sistema
 * OBS: não faz nenhuma verificação condicional
 */
function escolherSistema(): void{

    /*console.log(`|---------------Escolha se SO-------------------|`)
    console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`)
    console.log(`| . . . . . . . . [1] Windows  . . . . . . . .  |`)
    console.log(`| . . . . . . . . [2] Linux     . . . . . . . . |`)
    console.log(`| . . . . . . . . [3] MacOS     . . . . . . . . |`)
    console.log(`| . . . . . . . . [4] N/A . . . . . . . . . . . |`)
    console.log(`|-----------------------------------------------|`)

    const resp = readlineSync.question('', {limit: [1, 2, 3, 0]})*/
    let osId: number
    let osNome: string

    switch(os.platform()) {
        case "win32":
            osId = 1
            osNome = 'windows'
            console.log("Sistema escolhido: WINDOWS")
        break

        case "linux":
            osId = 2
            osNome = 'linux'
            console.log("Sistema escolhido: LINUX")
        break

        case "darwin":
            osId = 3
            osNome = 'macos'
            console.log("Sistema escolhido: MACOS")
        break

        default:
            osId = 0
            osNome = 'n/a'
            console.log("NENHUM SO FOI ESCOLHIDO")
            return
    }

    //Sempre ao final da escolha será feito salvamento do SO escolhido
    salvaSistema(osId, osNome)
}

/*
* Função que identifica sistema operacional salvo
* serve para salvamento caso não exista
*/
export function gerenciarInterface(opcao: string): void{

    switch (opcao) {
        case "limpar":
            while(true) {
                if (fs.existsSync('sistema_operacional.json')) {
                    const dadosJson = fs.readFileSync('sistema_operacional.json', 'utf-8')
                    const dados = JSON.parse(dadosJson)
        
                    limparConsole(dados.sistemaEscolhido.id)
                    break
        
                } else {
                    escolherSistema()
                }
            }
        break;

        case "configurar":
            escolherSistema()
        break;
    }
}  