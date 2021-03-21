import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() { 

  const emptyBoard= Array(9).fill("");
  // Criando uma board constante para testar se está funcionando
  // const emptyBoard=[
  //   'O', 'X', 'X',
  //   'O', 'X', 'X',
  //   'O', 'X', 'X'
  // ]

  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('O');
  const [winner, setWinner] =useState(null);

  const handleCellClick = (index) =>{
    if(winner) {console.log('Acabou cara'); return null};

    if(board[index] !== '') {console.log('Ai já tem dono'); return null};

    setBoard (
      board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item)
      )

    setCurrentPlayer (currentPlayer === 'X' ? 'O' : 'X')  //Se o atual jogador for X, troca para O, senão, deixa no X
  }

  const checkWinner = () => {
    const waysToWin = [
      [board[0], board[1], board[2]],  //horizontal
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],  //vertical
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],  //diagonal
      [board[2], board[4], board[6]],
    ];

    waysToWin.forEach(cells =>{
      if (cells.every(cells => cells === 'O')) setWinner('O');
      if (cells.every(cells => cells === 'X')) setWinner('X');
    });

    draws();
  }
  useEffect(checkWinner, [board]);

  const draws = () =>{
    if (board.every(item => item !== ''))
      {setWinner('Draw')}
  }

  const resetGame = () => {
    setCurrentPlayer ('O');
    setBoard (emptyBoard);
    setWinner (null); 
  }

  return (
    <main>
      <h1 className='title'>Joguito da Veia</h1>

      <div className={`board ${winner ? 'game-over' : ''}`}>
        {board.map((item, index) => //map usado para mapear os index do array
        (     
          <div 
          key={index} 
          className={`cell ${item}`}
          onClick={() => handleCellClick(index)}> 
            {item}
          </div>
        ))}
 
      </div>

      {winner &&
        <footer>
          {winner === 'Draw' ?
            <h2 className='drawmessage'>
              Já era! Empatou
            </h2>
            :
            <h2 className='winnerMessage'>
              {winner} venceu!
            </h2>
          };

          <button className='btn-restart' onClick={resetGame}>Restart</button>
        </footer>
      }
    </main>
  );
}

export default TicTacToe;
