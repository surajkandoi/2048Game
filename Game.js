var Game = (function() {
    var mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var score = 0;
    var show2048dialog = false;
    // and set show2048dialog variable if required
    var stateChange = false;
    // function to change state of mat;

    function moveLeft() {
      for (var i = 0; i < 4; i++) {
			var k =0;
			for (var j = 1; j < 4; j++) {
				if(mat[i][k] === 0 && mat[i][j]!== 0){
					mat[i][k] =mat[i][j];
					mat[i][j]=0;
					stateChange = true;
					continue;
				}
				else if(mat[i][k] === mat[i][j] && mat[i][k] !== 0){
					mat[i][k] = 2*mat[i][k];
					score += mat[i][k];
					mat[i][j]=0;
					++k;
					stateChange = true;
					continue;
				}
				else if(mat[i][k] !== mat[i][j] && mat[i][k] !==0 && mat[i][j] !==0){
					if(k == j-1){
						++k;
						continue;
					}
					else
					{
						++k;
						mat[i][k] = mat[i][j];
						mat[i][j]=0;
						stateChange = true;
						continue;
					}
				}
			}
		}
	}
    function moveRight() {
      for (var i = 0; i < 4; i++) {
			var k =3;
			for (var j = 2; j >= 0; j--) {
				if(mat[i][k] === 0 && mat[i][j]!== 0){
					mat[i][k] =mat[i][j];
					mat[i][j]=0;
					stateChange = true;
					continue;
				}
				else if(mat[i][k] === mat[i][j] && mat[i][k] !== 0){
					mat[i][k] = 2*mat[i][k];
					score += mat[i][k];
					mat[i][j]=0;
					--k;
					stateChange = true;
					continue;
				}
				else if(mat[i][k] !== mat[i][j] && mat[i][k] !==0 && mat[i][j] !==0){
					if(k == j+1){
						--k;
						continue;
					}
					else
					{
						--k;
						mat[i][k] = mat[i][j];
						mat[i][j]=0;
						stateChange = true;
						continue;
					}
				}
			}
		}
    }
    function moveTop() {
      for (var i = 0; i < 4; i++) {
      var k =0;
      for (var j = 1; j < 4; j++) {
        if(mat[k][i] === 0 && mat[j][i]!== 0){
          mat[k][i] =mat[j][i];
          mat[j][i]=0;
          stateChange = true;
          continue;
        }
        else if(mat[k][i] === mat[j][i] && mat[k][i] !== 0){
          mat[k][i] = 2*mat[k][i];
          score += mat[k][i];
          mat[j][i]=0;
          ++k;
          stateChange = true;
          continue;
        }
        else if(mat[k][i] !== mat[j][i] && mat[k][i] !==0 && mat[j][i] !==0){
          if(k == j-1){
            ++k;
            continue;
          }
          else
          {
            ++k;
            mat[k][i] = mat[j][i];
            mat[j][i]=0;
            stateChange = true;
            continue;
          }
        }
      }
    }
    }
    function moveDown() {
      for (var i = 0; i < 4; i++) {
      var k =3;
      for (var j = 2; j >= 0; j--) {
        if(mat[k][i] === 0 && mat[j][i]!== 0){
          mat[k][i] =mat[j][i];
          mat[j][i]=0;
          stateChange = true;
          continue;
        }
        else if(mat[k][i] === mat[j][i] && mat[k][i] !== 0){
          mat[k][i] = 2* mat[k][i];
          score += mat[k][i];
          mat[j][i]=0;
          --k;
          stateChange = true;
          continue;
        }
        else if(mat[k][i] !== mat[j][i] && mat[k][i] !==0 && mat[j][i] !==0){
          if(k == j+1){
            --k;
            continue;
          }
          else
          {
            --k;
            mat[k][i] = mat[j][i];
            mat[j][i]=0;
            stateChange = true;
            continue;
          }
        }
      }
    }
    }


    // reflect state of mat
    function redraw() {
      // var tiles = $("#game").children;
      $("#score").children("p").html(score);
      var x =$("#game1").children();
      // console.log(x);
      for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var k = mat[i][j];
            x[4*i + j].classList.add('tile_'+k);
      }
    }
}
    // randomw number between 2 and 4
    function getRandomValue() {
      return Math.random() * 10 >= 8 ? 4:2;
    }

    // returns x.y of a random empty cell
    function getRandomEmptyCell() {
      var emptyArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      var k=0;
      for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
          if(mat[i][j] === 0){
            emptyArray[k] =(4*i) + j;
            ++k;
            }
        }
      }
      var l =Math.floor(Math.random() * k);
      var x = emptyArray[l];
      var index = {"x":Math.floor(x/4) , "y":x%4};
      return index;
    }

    function fillOneRandomEmptyCell() {
        var coord = getRandomEmptyCell();
        var value = getRandomValue();
        mat[coord.x][coord.y] = value;
    }

    // checks if gameover
    function isGameOver() {
      return isGridFull() && !isMovePossible();
    }
    //checks if grid is full
    function isGridFull() {
      for (var x = 0; x < 4; x++) {
			for (var y = 0; y < 4; y++) {
				if (mat[x][y]===0) {
					return false;
				}
			}
		}
		return true;
    }
    function isMovePossible() {
      var y,x;
      for (x = 0; x < 4; x++) {
			for (y = 0; y < 3; y++) {
				var yy = y + 1;
				if (mat[x][y] === mat[x][yy]) {
					return true;
				}
			}
		}
		for (y = 0; y < 4; y++) {
			for (x = 0; x < 3; x++) {
				var xx = x + 1;
				if (mat[x][y] === mat[xx][y]) {
					return true;
				}
			}
		}
		return false;
    }
    // show Dialog for GameOver()
    function showGameOverDialog() {
      console.log("game Over");
       $("#gameOver").show();
       var z = document.getElementById('reset1');
       z.addEventListener('click',reset);
    }

    // show dialog for 2048
    function show2048Dialog() {}

    function removeClass() {
      var x =$("#game1").children();
      // console.log(x);
      for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var k = mat[i][j];
            x[4*i + j].classList.remove('tile_'+k);
      }
    }

    }
    function move(e) {

        stateChange = false;
       //console.log(e);
        e.preventDefault();
        removeClass();
        //depending upon keypress you call the respective function
        if(e.keyCode === 37){
          moveLeft();
        }
        if(e.keyCode === 38){
          moveTop();
        }
        if(e.keyCode === 39){
          moveRight();
        }
        if(e.keyCode === 40){
          moveDown();
        }
        if(stateChange === false){
          redraw();
          return;
        }
        fillOneRandomEmptyCell();
        redraw();
        var lmat = JSON.stringify(mat);
        localStorage.setItem("matrix",lmat);
        localStorage.setItem("score",score);
        if (isGameOver()) {
            showGameOverDialog();
        }
        if (show2048dialog === true) {
            show2048Dialog();
            show2048dialog = false;
        }
    }
    function reset(e) {
         $("#gameOver").hide();
        if (e !== undefined) {
            e.preventDefault();
            removeClass();
        }
        mat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        score = 0;
        fillOneRandomEmptyCell();
        fillOneRandomEmptyCell();
        var lmat = JSON.stringify(mat);
        localStorage.setItem("matrix",lmat);
        // localStorage.setItem("matrix",mat);
        localStorage.setItem("score",score);
        redraw();
    }
    function continueGame() {
      var storeMat, matrix1;
      storeMat = localStorage.getItem("matrix");
      matrix1 = JSON.parse(storeMat);
      console.log("p");
      score = parseInt(localStorage.getItem("score"));
      // var k = 0;
      for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
          mat[i][j] = matrix1[i][j];
        }
      }
      if(isGameOver()){
        reset();
      }
        $("#gameOver").hide();
      // console.log(mat);
      redraw();

    }
    function init() {
        if(localStorage.getItem("matrix") === null)
        {
             console.log("in reset");
             console.log(localStorage);
             reset();
        }
        else{
          console.log("in continue");
          console.log(localStorage);
        continueGame();
      }
        // add reset method on click actions of all the reset elements
        var z = document.getElementById('reset');
        z.addEventListener('click',reset);
        window.addEventListener('keydown', move);
    }
    return {
        init : init
    };
})();
