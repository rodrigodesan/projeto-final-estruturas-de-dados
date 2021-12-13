/* Função utilizada para tocar música durante o jogo, caso o usuário
opte por escutar */

var audio = document.getElementById('audio') 
var som = document.getElementById('som')
var cont = 0

function tocar() {   //Executada quando o botão é clicado e faz com toque a música
    if (cont == 0) { // e também mude a imagem do botão
        cont = 1
        audio.play()
        som.src = '../images/sound.png'

        
    } else {       // condição usada para parar o som, e também iniciar o jogo
        cont = 0  // por padrão no mudo
        audio.pause()
        som.src = '../images/mute.png'
    }
}
