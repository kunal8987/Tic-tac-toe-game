import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";

export default function App() {
  // board represents the game board, initialized as an array of 9 null values.
  const [board, setBoard] = useState(Array(9).fill(null));

  // isXNext is a boolean state indicating whether it's X's turn or not.
  const [isXNext, setIsXNext] = useState(true);

  // Check if the cell is already filled or if the game is won
  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    // Create a new copy of the board and update the clicked cell
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Check for a winner or a draw
    const winner = calculateWinner(newBoard);
    if (winner) {
      Alert.alert("Game Over", `Player ${winner} Wins!`, [
        { text: "OK", onPress: resetGame },
      ]);
    } else if (newBoard.every((cell) => cell)) {
      Alert.alert("Game Over", "It's a draw!", [
        { text: "OK", onPress: resetGame },
      ]);
    }
  };

  // renderSquare returns a TouchableOpacity for a specific cell.
  // It triggers handleClick when the cell is pressed.
  const renderSquare = (index) => {
    return (
      <TouchableOpacity
        style={styles.square}
        onPress={() => handleClick(index)}
      >
        <Text style={styles.squareText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  // Array of winning combinations
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check each winning combination
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // Return the winner (X or O)
        return squares[a];
      }
    }

    // Return null if no winner
    return null;
  };

  const resetGame = () => {
    // Reset the board
    setBoard(Array(9).fill(null));

    // Set X as the starting player
    setIsXNext(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>Player {isXNext ? "X" : "O"}'s Turn</Text>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for various components and elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8E3",
  },
  status: {
    fontSize: 25,
    fontWeight:"bold",
    paddingBottom: 10,
    marginBottom: 10,
    color: "black",
  },
  board: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  square: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  squareText: {
    fontSize: 24,
  },
  resetButton: {
    marginTop: 25,
    padding: 10,
    backgroundColor: "#FE7A36",
    borderRadius: 5,
  },
  resetButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight:'bold'
  },
});
