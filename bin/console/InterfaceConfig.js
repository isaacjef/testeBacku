"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.limparConsole = limparConsole;
exports.escolherSistema = escolherSistema;
exports.gerenciarInterface = gerenciarInterface;
const readlineSync = __importStar(require("readline-sync"));
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
/**
 * Função simples para limapr console
 * OBS: não faz nenhuma verificação condicional
 */
function limparConsole(identificadorSO) {
    let cmd;
    switch (identificadorSO) {
        case 1:
            cmd = 'cls';
            break;
        case 3:
        case 2:
            cmd = 'clear';
            break;
        default:
            console.log("\n\n");
            return;
    }
    try {
        (0, child_process_1.execSync)(cmd, { stdio: 'inherit' });
    }
    catch (error) {
        console.log("\nErro ao executar comando limpar console");
    }
}
/**
 * Função salvamento simples da escolha do SO
 * OBS: não faz nenhuma verificação condicional
 */
function salvaSistema(osId, osNome) {
    const dados = {
        sistemaEscolhido: {
            id: osId,
            nome: osNome
        }
    };
    const dadosJson = JSON.stringify(dados, null, 2);
    try {
        fs.writeFileSync('sistema_operacional.json', dadosJson, 'utf-8');
    }
    catch (error) {
        console.log("Erro: ", error.message);
    }
}
/**
 * Função para interface de escolha do sistema
 * OBS: não faz nenhuma verificação condicional
 */
function escolherSistema() {
    console.log(`|---------------Escolha se SO-------------------|`);
    console.log(`| . . . . . . . . . . . . . . . . . . . . . . . |`);
    console.log(`| . . . . . . . . [1] Windows  . . . . . . . .  |`);
    console.log(`| . . . . . . . . [2] Linux     . . . . . . . . |`);
    console.log(`| . . . . . . . . [3] MacOS     . . . . . . . . |`);
    console.log(`| . . . . . . . . [4] N/A . . . . . . . . . . . |`);
    console.log(`|-----------------------------------------------|`);
    const resp = readlineSync.question('', { limit: [1, 2, 3, 0] });
    let osId;
    let osNome;
    switch (os.platform()) {
        case "win32":
            osId = 1;
            osNome = 'windows';
            console.log("Sistema escolhido: WINDOWS");
            break;
        case "linux":
            osId = 2;
            osNome = 'linux';
            console.log("Sistema escolhido: LINUX");
            break;
        case "darwin":
            osId = 3;
            osNome = 'macos';
            console.log("Sistema escolhido: MACOS");
            break;
        default:
            osId = 0;
            osNome = 'n/a';
            console.log("NENHUM SO FOI ESCOLHIDO");
            return;
    }
    //Sempre ao final da escolha será feito salvamento do SO escolhido
    salvaSistema(osId, osNome);
}
/*
* Função que identifica sistema operacional salvo
* serve para salvamento caso não exista
*/
function gerenciarInterface(opcao) {
    switch (opcao) {
        case "limpar":
            while (true) {
                if (fs.existsSync('sistema_operacional.json')) {
                    const dadosJson = fs.readFileSync('sistema_operacional.json', 'utf-8');
                    const dados = JSON.parse(dadosJson);
                    limparConsole(dados.sistemaEscolhido.id);
                    break;
                }
                else {
                    escolherSistema();
                }
            }
            break;
        case "configurar":
            escolherSistema();
            break;
    }
}
