//vou fazer alterações no HTML com o JavaScript. Para acessar a linha que quero preencher, é assim vv:
// let titulo = document.querySelector('h1')
// //^^

// //titulo dentro do HTML vv
// titulo.innerHTML = 'Jogo do número secreto'
//^^

//vv
// let paragrafo = document.querySelector('p')
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10'
//^^

//numeros sorteados nao podem se repetirvv
let listaDeNumerosSorteados = []
//^^
let numeroLimite = 10
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1


//colocando as linhas acima numa função para evitar a repetição de codigo vv:
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag)
    campo.innerHTML = texto
    //posso fazer o site falar: Pesquisar ResponsiveVoice vv
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2})
}

function mensagemInicial() {
   // a função precisa de dois parametros para funcionar, conforme declarado na sua criação vv:
    exibirTextoNaTela('h1', 'Jogo do número secreto')
    exibirTextoNaTela('p','Escolha um número entre 1 e 10' ) 
}

//criando uma função e aplicando no HTML
function verificarChute() {
    let chute = document.querySelector('input').value //quero pegar o valor inserido pelo usuario no input ^^
    if(chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!')
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
        //O HTML não entende se eu colocar templete string diretamenta no parametro da função "exibirTextoNaTela(). É necessario criar uma variavel fora dessa função e fora da verificação, aplicando o templete string, para depois chamar essa variavel dinamicamente"
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemTentativas)
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor')
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior')
        }
        tentativas ++
        limparCampo()
        
    }
    //console.log(chute == numeroSecreto)//console vai exibir um booleano
}

//Na função "gerarNumeroAleatorio()", eu tenho que verificar se o numero gerado ja foi sorteado anteriormente. Como? Verificando se o valor do numero escolhido está dentro da lista de numeros sorteados. se sim, tenho que gerar outro numero aleatorio. Toda vez que gerar um novo numero aleatorio, esse numero será incluido na lista de numeros sorteados, para que nao seja repetido.
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1)
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length

    //Tenho que verificar se a lista ja possui todas os numeros sorteador possiveis. Se sim, a lista deve ser resetada.

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = []
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio()
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido)
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido
    }
}

function limparCampo() {
    chute = document.querySelector('input')
    chute.value = ''
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio()
    limparCampo()
    tentativas = 1
    mensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled', true)
}

mensagemInicial()
