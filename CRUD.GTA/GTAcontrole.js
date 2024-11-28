let listaGta = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let gta = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaGta.length; i++) {
        const gta = listaGta[i];
        if (gta.Nome == chave) {
            gta.posicaoNaLista = i;
            return listaGta[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const Nome = document.getElementById("inputPlaca").value;
    if (placa) { // se digitou um Placa
        gta = procurePorChavePrimaria(Nome);
        if (gta) { //achou na lista
            mostrarDadosGta(gta);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputNome").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputNome").focus();

}

// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista

    // obter os dados a partir do html

    let Nome;
    if (gta == null) {
        Nome = document.getElementById("inputNome").value;
    } else {
        Nome = gta.placa;
    }

    const Nome = document.getElementById("inputNome").value;
    const AnoQSP = document.getElementById("inputAnoQSP").value;
    const dataLancamento = document.getElementById("inputDataLancamento").value;
    const Protagonista = document.getElementById("inputProtagonista").value;
    const Antagonista = document.getElementById("inputAntagonista").value;
    const Cidade = document.getElementById("inputCidade").value; 

    if (AnoQSP<0) {
        mostrarAviso("O AnoQSP não pode ser menor que zero");
        return;
    }

    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (Nome && AnoQSP && dataLancamento && Protagonista && Antagonista && Cidade) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                gta = new Gta(Nome, AnoQSP, dataLancamento, Protagonista, Antagonista, Cidade);
                listaGta.push(carro);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                gtaAlterado = new Gta(Nome, AnoQSP, dataLancamento, Protagonista, Antagonista, Cidade);
                listaGta[gta.posicaoNaLista] = gtaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaGta.length; i++) {
                    if (gta.posicaoNaLista != i) {
                        novaLista.push(listaGta[i]);
                    }
                }
                listaCarro = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputPlaca").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

//backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.Nome + " - " +
            linha.AnoQSP + " - " +
            linha.dataLancamento + " - " +
            linha.Protagonista + " - " +
            linha.Antagonista + " - " + 
            linha.Cidade + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaGta);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do Carro nos campos
function mostrarDadosGta(GTA) {
    document.getElementById("inputNome").value = GTA.Nome;
    document.getElementById("inputAnoQSP").value = GTA.AnoQSP;
    document.getElementById("inputDataLancamento").value = GTA.dataLancamento;
    document.getElementById("inputProtagonista").value = GTA.Protagonista;
    document.getElementById("inputAntagonista").value = GTA.Antagonista;
    document.getElementById("inputCidade").value = GTA.Cidade;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputAnoQSP").value = "";
    document.getElementById("inputDataLancamento").value = "";
    document.getElementById("inputProtagonista").value = "";
    document.getElementById("inputAntagonista ").value = "";
    document.getElementById("inputCidade").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputNome").readOnly = !soLeitura;
    document.getElementById("inputAnoQSP").readOnly = soLeitura;
    document.getElementById("inputDataLancamento").readOnly = soLeitura;
    document.getElementById("inputProtagonista").readOnly = soLeitura;
    document.getElementById("inputAntagonista").readOnly = soLeitura;
    document.getElementById("inputCidade").readOnly = soLeitura; 
}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
    //none significa que o botão ficará invisível (visibilidade == none)
    //inline significa que o botão ficará visível 

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("inputPlaca").focus();
}

