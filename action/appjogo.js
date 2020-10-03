
//Correção para qualquer tamanho de tela
var altura = 0 
var largura = 0
var vidas = 1
var tempo = 30

var criarTempoMosca = 1500

var nivelJogo = window.location.search
nivelJogo = nivelJogo.replace('?','')

if(nivelJogo === 'normal') {
    criarTempoMosca = 1500
} else if (nivelJogo === 'dificil') {
    criarTempoMosca = 1000
} else if (nivelJogo === 'feroz') {
    criarTempoMosca = 850
}


function ajusteTamanhoTela() {
    altura = window.innerHeight
    largura = window.innerWidth
}
ajusteTamanhoTela()


var cronometro = setInterval(function () {
    tempo -= 1

    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criarJogo)
        window.location.href = 'voceVenceu.html'
    } else {
        document.querySelector('#temporizador').innerHTML = tempo
    }
}, 1000)


function posicaoRandomicaMosca() {    
    
    //remoçÃo do mosquito anterior (caso exista, pois se ele nao existir nao tem como ser retirado)
    if(document.querySelector('#moscaDoida')) {
        document.querySelector('#moscaDoida').remove()

        //Lócica de vidas do jogador, caso depois dos incrementos o resultado chegue a 4 o usuário recebera 'FIM DE JOGO'
        if(vidas > 3) { //Condicao de Game Over
            window.location.href = 'paginaGameOver.html'
        }
        document.querySelector('#vida' + vidas).src = 'imagens/coracao_vazio.png'
        vidas++
        
    }

    // Variveis para controlar as posicoes da mosca de forma aleatória (metodo randômico)
    var posicaoMoscaX = parseInt(Math.random() * largura) - 90
    var posicaoMoscaY = parseInt(Math.random() * altura) - 90

    // Controle do espaçamento da imagem na tela
    posicaoMoscaX = posicaoMoscaX < 90 ? 0 : posicaoMoscaX
    posicaoMoscaY = posicaoMoscaY < 90 ? 0 : posicaoMoscaY

    //Criar o elemento das moscas na tela
    var mosquito = document.createElement('img')// Atribuindo a criação do da imagem a uma variavel

    // Tratamento do novo elemento
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoAleatorioMosca() + ' ' + ladoAleatorioMosca()// Chamada da funcao que define a classe com o tamanho e lado variado da mosca
    mosquito.style.left = posicaoMoscaX + 'px'
    mosquito.style.top = posicaoMoscaY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'moscaDoida'
    mosquito.onclick = function() { //Lógica que ao ser clicado impede que o usuário entre verificador de existencia do elemento, fazendo com que a var vidas nao seja incrementada
        this.remove()
    }

    document.body.appendChild(mosquito)//Inclusão dessa novo elemento ao body do nosso jogo
    
}

// Funcao que controla os tamanhos da mosca, a partir da mudanças de suas classes 
function tamanhoAleatorioMosca () {
    var classe = Math.ceil(Math.random() * 3)
    
    switch(classe) {
        case 1: 
            return 'imagemMosca1'
        case 2: 
            return 'imagemMosca2'
        case 3: 
            return 'imagemMosca3'
    }
}

// Funcao que controla os lados para o qual a mosca esta virada, a partir da mudanças de suas classes 
function ladoAleatorioMosca () {
    var lados = Math.ceil(Math.random() * 2)
    
    switch(lados) {
        case 1: 
            return 'ladoA'
        case 2: 
            return 'ladoB'
        }
}


    
    