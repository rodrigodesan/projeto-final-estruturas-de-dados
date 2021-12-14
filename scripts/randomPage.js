// Função para gerar números inteiros aleatoriamente
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Chamada à função para gerar números inteiros entre 0 e 4, que corresponde ao total de temas disponíveis no jogo
let randomNum = getRandomInt(0, 4);

// Função que seleciona a página do tema de acordo com o número gerado acima
function setPage() {
  switch (randomNum) {
    case 0:
      window.location.href = "../pages/animais.html";
      break;
    case 1:
      window.location.href = "../pages/objetos.html";
      break;
    case 2:
    window.location.href = "../pages/esportes.html";
    break;
    case 3:
      window.location.href = "../pages/alimentos.html";
      break;
    case 4:
      window.location.href = "../pages/transportes.html";
      break;
    default:
      break;
  }
}
