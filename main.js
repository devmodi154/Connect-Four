var restart=document.querySelector("#b")

var player1= "Blue";
var player1Color='rgb(86,151,255)';
var player1_wins=0

var player2= "Red";
var player2Color='rgb(237,45,73)';
var player2_wins=0

var game_on= true;
var table = $('table tr');
var circles= document.querySelectorAll('.board button');
var scoreboard = document.getElementById('Scoreboard');
var restartButton = document.getElementById('b');
var blue = document.getElementById('blue');
var red = document.getElementById('red');
red.style.backgroundColor = 'rgb(128,128,128)';


function reportWin(rowNum,colNum)
{
	console.log("You won starting at this row,col");
	console.log(rowNum);
	console.log(colNum);
}

function changeColor(rowIndex,colIndex,color)
{
	return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex,colIndex)
{
	return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex)
{
	var colorReport= returnColor(5,colIndex);
	for(var row=5;row>-1;row--)
	{
		colorReport=returnColor(row,colIndex);
		if(colorReport==='rgb(128, 128, 128)')
		{
			return row;
		}
	}
}

function colorMatchCheck(one,two,three,four)
{
	return (one===two && one===three && one===four && one!=='rgb(128, 128, 128)' && one!==undefined)
}

function horizontalWinCheck()
{
	for(var row=0;row<6;row++)
	{
		for(var col=0;col<4;col++)
		{
			if(colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))==true)
			{
				console.log('horiz');
				reportWin(row,col);
				return true;
			}
			else
			{
				continue;
			}
		}
	}
}

function verticalWinCheck()
{
	for(var col=0;col<7;col++)
	{
		for(var row=0;row<3;row++)
		{
			if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))==true)
			{
				console.log('vertical');
				reportWin(row,col);
				return true;
			}
			else
			{
				continue;
			}
		}
	}
}

function diagonalWinCheck()
{
	for(var col=0;col<5;col++)
	{
		for(var row=0;row<7;row++)
		{
			if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))==true)
			{
				console.log('diag');
				reportWin(row,col);
				return true;
			}
			else
				if(colorMatchCheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))==true)
				{
					console.log('diag');
					reportWin(row,col);
					return true;
				}
				else
				{
					continue;				
				}
		}
	}
}

function drawCheck()
{
	var count=0;
	for(var i=0;i<7;i++)
	{
		for(var j=0;j<7;j++)
		{
			if(returnColor(i,j)==='rgb(128, 128, 128)')
			{
				count++;
			}
		}
	}
	if(count===0)
	{
		console.log(count);
		return true;
	}
	return false;
}


var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1+" it is your turn,pick a column to drop in!");


function clearBoard(){
	
	$('.board button').css('background-color','rgb(128, 128, 128)');
	restartButton.style.visibility = 'hidden';
	scoreboard.innerHTML = player1+"  "+player1_wins+" <br> "+player2+"  "+player2_wins;
	$('h2').text('Connect 4 chips to win!');
	game_on=true;
	currentName = player1;
	currentColor = player1Color;

}

restart.addEventListener('click',clearBoard);

function resultCheck(col) {
	if(currentColor === 'rgb(86,151,255)') {
		blue.style.backgroundColor = 'rgb(128,128,128)';
		red.style.backgroundColor = 'rgb(237,45,73)';
	} else {
		red.style.backgroundColor = 'rgb(128,128,128)';
		blue.style.backgroundColor = 'rgb(86,151,255)';
	}

	var bottomAvail = checkBottom(col);
	changeColor(bottomAvail,col,currentColor);
	if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck())
	{
		scoreboard.innerHTML = currentName+" You have won!"; 
		$('h2').text('');
		$('h3').text('');
		restartButton.style.visibility = 'visible';

		if(player1===currentName)
			player1_wins++;
		else
			player2_wins++;
		
		game_on=false;
	} else if(drawCheck()) {
			$('h1').text("Game Draw!");
			$('h2').text('');
			$('h3').text('');
			restartButton.style.visibility = 'visible';
			game_on=false;
	}
}


$('.board button').on('click',function(){

	if(game_on==true)
	{
		var col = $(this).closest('td').index();
		resultCheck(col, currentColor);
		if( game_on )
		{
			currentName = player2;
			currentColor = player2Color;
			var choice = [col-1,col,col+1];
			col = choice[Math.floor(Math.random() * 3)]%7;
			resultCheck(col, currentColor);
			currentColor = player1Color;
			currentName = player1;
		}

	}
})
