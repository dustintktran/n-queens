
/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
// var mirroredBoard = function(board1, board2){
//   var isEqual = true;
//   for(var i = 0; i < board1.rows; i++){
//     for(var j = 0; j < board1.cols; j++){

//     }
//   }

//   for(var i = 0; i < board1.rows; i++){
//     for(var j = board1.cols; j > 0; j--){
      
//     }
//   }
// }

window.findNRooksSolution = function(n) {
  
  var solution = new Board({n:n});

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solution.togglePiece(i, j);
      i++;
    }
  }
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = new Board({n:n});
  var counter = 0;
  var doTheThing = function(row){
    for(var i = 0; i < n; i++){
      if(row === n){
        counter++;
        // solution.togglePiece(row, i);
        return;
      }
      solution.togglePiece(row, i);
      if(!solution.hasAnyRooksConflicts()){
        doTheThing(row+1);
        solution.togglePiece(row, i);
      } else {
        solution.togglePiece(row, i);
      }
    }
  }
  doTheThing(0);
  return counter;





  // var matrix = new Board({n:n})
  // var solutionCount = 0;
  // var counter = 0;
  // var iterator = function(n) {
  //   counter++
  //   if (n === 1) {
  //     return 1;
  //   } 
  //   var recursed = iterator(n - 1);
  //   counter--;
  //   return (counter + 1) * recursed;
  // }
  //fixme
  // var iterator = function(n) {
  //   // base case
  //   if (n == 1) {
  //     return 1;
  //   }

    // // iterate
    // for (var i = 0 ; i < n; i++) {
    //   for (var j = 0; j < n; j++) {
    //     //something about toggle
    //     if (!hasColConflictAt(j) && !hasRowConflictAt(i)) {
    //       matrix.togglePiece(i, j);
    //     }
    //     //something about whether it exists in the row
    //   }
    // }
  // var oneBoard = function(n, currentCol = 0){
  //   for (var i = 0 ; i < n; i++) {
  //     for (var j = currentCol; j < n; j++) {
  //       //something about toggle
  //       if (!hasColConflictAt(j) && !hasRowConflictAt(i)) {
  //         matrix.togglePiece(i, j);
  //       }
  //       //something about whether it exists in the row
  //     }
  //   }
  // }


    
  //   // recursion?
  //   iterator(n-1);
  // }

  // iterator(n)

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return iterator(n);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // var solution = new Board({n:n}); //fixme
  var solution = undefined;
  var newBoard = new Board({n:n});
  if(n === 1){
    newBoard.togglePiece(0, 0);
    return newBoard.rows();
  }
  var counterJ = 0;
  var counterI = 0;
  
  //function skip(counterI) that skips counterI valid places in the row
  //if the position > n, bring it back to the original valid position
  //and continue on the next row

  //else continue on the next row

  var skip = function(numberSkipped, row, col){
    //loop through the row and skip numberSkipped columns
    var num = numberSkipped;
    for(var i = 0; i < n; i++){
      while(num > 0){
        i++;
        // board.togglePiece(row, i);
        // numberOfPieces++;
        if (!board.hasColConflictAt(j) && !board.hasRowConflictAt(row) && !board.hasMajorDiagonalConflictAt(row-j) && !board.hasMinorDiagonalConflictAt(row+j)) {
          num--;
        }
        // num--;
      }


      board.togglePiece(row, i);
      numberOfPieces++;
      if (board.hasColConflictAt(j) || board.hasRowConflictAt(i) || board.hasMajorDiagonalConflictAt(i-j) || board.hasMinorDiagonalConflictAt(i+j)) {
        board.togglePiece(i, j);
        numberOfPieces--;
      }
      //if num is > 0, untoggle the piece and try to toggle at the next place

    } // end of for loop
  }


  var iterator = function(board){
    debugger;
    var numberOfPieces = 0;
    for (var i = 0 ; i < n; i++) {
      for (var j = 0; j < n; j++) {


        if(i === 0 && j <= counterJ){
          j = counterJ + j;
        }
        
        if(i <= counterI && j === counterJ){
          
        }


        board.togglePiece(i, j);
        numberOfPieces++;
        if (board.hasColConflictAt(j) || board.hasRowConflictAt(i) || board.hasMajorDiagonalConflictAt(i-j) || board.hasMinorDiagonalConflictAt(i+j)) {
          board.togglePiece(i, j);
          numberOfPieces--;
        }
      }
    } 


    if(!(numberOfPieces === n)){ //number of pieces is equal to n
      counterJ++;
      var newBoard2 = new Board({n:n});
      iterator(newBoard2);
    }
    if(numberOfPieces === n){ //number of pieces is n (the board is correct)
      solution = board;
    }
    if(counterJ > n){
      counterJ = 0;
      counterI++;
    }
  }





  iterator(newBoard);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = new Board({n:n});
  if(n === 0 || n === 1){
    return 1;
  }
  var counter = 0;
  var doTheThing = function(row){
    for(var i = 0; i < n; i++){
      if(row === n){
        counter++;
        // solution.togglePiece(row, i);
        return;
      }
      solution.togglePiece(row, i);
      if(!solution.hasAnyQueensConflicts()){
        doTheThing(row+1);
        solution.togglePiece(row, i);
      } else {
        solution.togglePiece(row, i);
      }
    }
  }
  doTheThing(0);
  return counter;
};