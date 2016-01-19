var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var ENDTIME = new Date();
ENDTIME.setTime(ENDTIME.getTime() + 3600*1000);
var SHOWTIMESECONDS = 0;
var colors = ['#33B5E5','#0099CC','#AA66CC','#9933CC','#669900','#FF8800','#FF4444','#CC0000','#AA66CC','#332211'];
var balls = [];

window.onload = function(){
	WINDOW_WIDTH = document.documentElement.clientWidth;
	WINDOW_HEIGHT = document.documentElement.clientHeight;

	MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
	RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;
	var canvas = document.getElementById('canvas');
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	var context = canvas.getContext('2d');

	SHOWTIMESECONDS = getShowTime();

	setInterval(
		function(){
			render(context);
			update(context);
		},
		50
		);
	
}
function update(context){
	var newShowTime = getShowTime();

	var newhours = parseInt(newShowTime/3600);
	var newminutes = parseInt((newShowTime-3600*newhours)/60);
	var newseconds = newShowTime%60;

	var hours = parseInt(SHOWTIMESECONDS/3600);
	var minutes = parseInt((SHOWTIMESECONDS-3600*hours)/60);
	var seconds = SHOWTIMESECONDS%60;

	if (newseconds != seconds){
		if(parseInt(hours/10) != parseInt(newhours/10)){
			addBall(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10));
		}
		if (hours%10 != newhours%10){
			addBall(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,hours%10);
		}

		if(parseInt(minutes/10) != parseInt(newminutes/10)){
			addBall(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10));
		}
		if (minutes%10 != newminutes%10){
			addBall(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,minutes%10);
		}

		if(parseInt(seconds/10) != parseInt(newseconds/10)){
			addBall(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10));
		}
		if (seconds%10 != newseconds%10){
			addBall(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,seconds%10);
		}
		SHOWTIMESECONDS = newShowTime;
	}
	getBall(context);//设置小球参数
	// console.log(balls.length);
}
function getBall(cxt){
	for (var i = 0; i < balls.length ; i ++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if(balls[i].y >= cxt.canvas.height - balls[i].r){
			balls[i].y  =  cxt.canvas.height - balls[i].r;
			balls[i].vy = -balls[i].vy*0.75;
		}
	}

	var cnt = 0;
	for(var i = 0; i < balls.length ; i++){
		if( balls[i].x + RADIUS > 0 && balls[i].x  - RADIUS < cxt.canvas.width){
			balls[cnt++] = balls[i];
		}
	}
	while(balls.length > cnt){
		balls.pop();
	}
	
}

function addBall( x , y , num){
	for( var i = 0 ; i < digit[num].length ; i ++){
		for( var j = 0 ; j < digit[num][i].length ; j++){
			if (digit[num][i][j] == 1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					r:RADIUS,
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-10,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
		
}

function getShowTime(){
	var cur = new Date();
	var ret = ENDTIME.getTime() - cur.getTime();
	ret = Math.round(ret/1000);
	return ret >= 0 ? ret : 0;
}

function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

	var hours = parseInt(SHOWTIMESECONDS/3600);
	var minutes = parseInt((SHOWTIMESECONDS-3600*hours)/60);
	var seconds = SHOWTIMESECONDS%60;

	renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10),cxt );
	renderDigit( MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP , hours%10,cxt );
	renderDigit( MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP , 10,cxt );
	renderDigit( MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP , parseInt(minutes/10),cxt );
	renderDigit( MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP , minutes%10,cxt );
	renderDigit( MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP , 10,cxt );
	renderDigit( MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP , parseInt(seconds/10),cxt );
	renderDigit( MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP , seconds%10,cxt );

	for(var i = 0; i < balls.length ; i++ ){
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,balls[i].r,0,2*Math.PI);
		cxt.closePath();

		cxt.fill();
	}
}

function renderDigit(x,y,num,cxt){
	cxt.fillStyle = 'rgb(0,102,153)';
	for( var i = 0 ; i < digit[num].length ; i ++){
		for( var j = 0 ; j < digit[num][i].length ; j++){
			if (digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}