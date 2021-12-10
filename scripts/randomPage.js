function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let randomNum = getRandomInt(0, 6);

function setPage() {
  switch (randomNum) {
    case 0:
      window.location.href = "../pages/animais.html";
      break;
    case 1:
      window.location.href = "../pages/profissoes.html";
      break;
    case 2:
    window.location.href = "../pages/objetos.html";
    break;
    case 3:
      window.location.href = "../pages/esportes.html";
      break;
    case 4:
      window.location.href = "../pages/cores.html";
      break;
    case 5:
      window.location.href = "../pages/alimentos.html";
      break;
    case 6:
      window.location.href = "../pages/transportes.html";
      break; 
    default:
      break;
  }
}
