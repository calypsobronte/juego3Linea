let cells = Array.prototype.slice.apply(document.querySelectorAll('.cell'));
let empate = 'X O';
let array = new Array(9); //Son 9 movimientos que se hace
//id html
let pX = document.getElementById('pX');
let pO = document.getElementById('pO');
let tX = document.getElementById('turnoX');
let tO = document.getElementById('turnoO');
let turn = 1;
let winner = false;//
let modal = document.getElementById('modal');
let btnClose = document.getElementById('close');
let btnReset = document.getElementById('reset');
let result = document.getElementById('result');

function setTurn(turn) {
  if (winner === false) {
    if (turn === 1 || turn === 3 || turn === 5 || turn === 7 || turn === 9) {
      tX.style.visibility = 'visible';
      tO.style.visibility = 'hidden';
      pX.classList.add('actual');
      pO.classList.remove('actual');
    } else {
      tO.style.visibility = 'visible';
      tX.style.visibility = 'hidden';
      pO.classList.add('actual');
      pX.classList.remove('actual');
    }
  }
}

function setWinner(index, letter) {
  array[index] = letter;
  if (
    array[0] === letter && array[1] === letter && array[2] === letter ||
    array[3] === letter && array[4] === letter && array[5] === letter ||
    array[6] === letter && array[7] === letter && array[8] === letter ||
    array[0] === letter && array[3] === letter && array[6] === letter ||
    array[1] === letter && array[4] === letter && array[7] === letter ||
    array[2] === letter && array[5] === letter && array[8] === letter ||
    array[0] === letter && array[4] === letter && array[8] === letter ||
    array[2] === letter && array[4] === letter && array[6] === letter
  ) {
    winner = true;    
    modal.style.display = 'block';    
    result.innerHTML = `Ganador ${letter}`;

    for (let i = 0; i < cells.length; i++) {
     
      cells[i].removeEventListener('click', juegoLinea);
    }
  }
}

// Mostrar letras que vamos a utilizar en el juego X O
function juegoLinea(e) {
  let indexCell = cells.indexOf(e.target);
  if (turn % 2 === 1) {
    cells[indexCell].innerHTML = 'X';
    cells[indexCell].style.color = '#444';
    setWinner(indexCell, 'X');
  } else {
    cells[indexCell].innerHTML = 'O';
    cells[indexCell].style.color = '#fff';
    setWinner(indexCell, 'O');
  }
  
  cells[indexCell].removeEventListener('click', juegoLinea);
  if (turn === 9 && winner === false) {
    modal.style.display = 'block';
    result.innerHTML = `Empate ${empate}`;
  } else {
    turn++;
    setTurn(turn);
  }
}

function reiniciar() {
  for (let i = 0; i < cells.length; i++) {
    array[i] = '';
    cells[i].innerHTML = '';
  }
  turn = 1;
  winner = false;
  jugar();
}

function closeModal() {
  modal.style.display = 'none';
}

function jugar() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', juegoLinea);
  }
  btnReset.addEventListener('click', reiniciar);
  btnClose.addEventListener('click', closeModal);
  setTurn(turn);
}

window.addEventListener('load', jugar);