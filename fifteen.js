
//Name: Shangyu Sun
//Section: CF
//Date: 5/28/2014
//This is the JavaScript code for the web page
//that allows users to play the "fifteen puzzle" game
"use strict";

(function() {
    var SIZE = 4; //the size of the grid (4 * 4)
    var EMPTY_ROW = 300; //empty row position   
    var EMPTY_COL = 300; //empty collumn position
    var TILE = 100; //tile size 

    //It creates the puzzle and allows users to shuffle the
    //puzzles if they click the shuffle button
    window.onload = function(){
        puzzles();
        document.getElementById("shufflebutton").onclick = shuffle;
    };

 //It actually creates the puzzles and changes the color of the border
    //and the number of a movable puzzle if the mouse is over it.
    function puzzles() {
        var puzzles = document.getElementById("puzzlearea");
        var counter = 1;
        for(var row = 0; row < SIZE; row++) {
            for(var col = 0; col < SIZE; col++) {
                if(counter < SIZE * SIZE) {
                    var block = document.createElement("div");
                    puzzles.appendChild(block);
                    block.id = "square_" + row + "_" + col;
                    block.innerHTML = counter;
                    block.style.top = row * TILE + "px";
                    block.style.left = col * TILE + "px";
                    block.style.backgroundPosition = col * (-TILE) + "px " + row * (-TILE) + "px";
                    block.onclick = click;
                    block.onmouseover = color;
                }
                counter++;
            }
        }
    }

    //It calls the function to move a puzzle.
    function click() {
        move(this);
    }

    //It actually moves a puzzle if the puzzle is movable
    function move(puzzle) {
        var posTop = parseInt(window.getComputedStyle(puzzle).top);
        var posLeft = parseInt(window.getComputedStyle(puzzle).left);
        if(check(posTop, posLeft)){
            puzzle.style.left = EMPTY_COL + "px";
            puzzle.style.top = EMPTY_ROW + "px";
            EMPTY_COL = posLeft;
            EMPTY_ROW = posTop;
        }
    }

    //It returns true if the puzzle with given position is movable
    function check(topPos, leftPos){
        return ((Math.abs(EMPTY_COL - leftPos) == TILE && EMPTY_ROW == topPos)||
                (Math.abs(EMPTY_ROW - topPos) == TILE && EMPTY_COL == leftPos));
    }

    //It changes the color of the border and the number of a puzzle if the
    //puzzle is movable
    function color(event) {
        var top = parseInt(window.getComputedStyle(this).top);
        var left = parseInt(window.getComputedStyle(this).left);
        if(check(top, left)) {
            this.className = "highlight";
        }
    }

    //It gets us the puzzle with given position.
    function getID(row, col) {
        return document.getElementById("square_" + row + "_" + col);
    }

 //It reaarange the position of the 15 puzzles randomly when the user clicks the shuffle button
    function shuffle(event) {
        for (var time = 0; time < 1000; time ++) {
            var blocks = [];
            for(var count = 0; count <= 14; count++) {
                var top = parseInt(window.getComputedStyle(getID(Math.floor(count / SIZE), count % SIZE)).top);
                var left = parseInt(window.getComputedStyle(getID(Math.floor(count / SIZE), count % SIZE)).left);
                if(check(top,left)) { 
                    blocks.push(getID(Math.floor(count / SIZE), count % SIZE));
                }
            }
            var rand = parseInt((Math.random() * blocks.length));
            move(blocks[rand]);
        }
    }
})( );