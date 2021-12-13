var audio = document.getElementById('audio')
var som = document.getElementById('som')
var cont = 0

function tocar() {
    if (cont == 0) {
        cont = 1
        audio.play()
        som.src = '../images/sound.png'

        
    } else {
        cont = 0
        audio.pause()
        som.src = '../images/mute.png'
    }
}
