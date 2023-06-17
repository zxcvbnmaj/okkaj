let slider;
let slider2;

let words = ['W', 'E', 'L', 'C', 'O', 'M', 'E']; 
let coolors = ["#fee440", "#ff9770", "#ffd670"]

let snowflakes = []; // 눈송이 객체를 담는 배열
var nowType = 'none';

//슬라이더 그리기
function drawSlider(){
	slider = createSlider(0, 80, 0);
  slider.position(10, 900);
}



//슬라이더 그리기
function drawSlider2(){
	

	
	slider2 = createSlider(1, 6, 0);
  slider2.position(250, 900);
  
}



//모눈종이
function drawGrid(gap){
	push();
	strokeWeight(0.5);
	stroke(200);
	for(let x = 0; x <= width; x = x+gap) {
		line(x, 0, x, height);
	}
	for(let y = 0; y <= height; y = y+gap) {
			line(0, y, width, y);
	}
	pop();
}

//캐릭터 그리기
function draw_character(type){
	
	var sliderValue = slider.value();
	
	var color = "#5D97E5"; //#9b5de5"; 
	var left = 0;
	var eyeLeft = 200;
	var mouse = 100;
	
	if(type == "red"){
		color = "#ffb3c6";  
		left = 1200;
		eyeLeft = 1000;
		mouse = 1100;
	}
	push();
	noStroke();
	fill(color);
	arc(left ,420, 800,840 , 0 ,360);
	pop();
	
	//눈 1
	push();
	noStroke();
	fill('#FFF');
	circle(eyeLeft, 350 , 100)
	pop();
	
	//0일때 -15. 1200일때 15, (x좌표 1당 0.025)
	//(눈동자의 크기는 최대 +- 15, 벗어나면 무섭다 !!!)

	var eyeX = (constrain(mouseX, 0, 1200) * 0.025) - 15;
	var eyeY = (constrain(mouseY, 0, 840) * 0.035) - 15;
	
	//눈동자1 
	push();
	noStroke();
	fill('#000');
	circle(eyeLeft + eyeX, 350 + eyeY , 70)
	pop();
	
	//눈 2
	push();
	noStroke();
	fill('#FFF');
	circle(eyeLeft, 450 , 100)
	pop();
	
	//눈동자2
	push();
	noStroke();
	fill('#000');
	circle(eyeLeft + eyeX, 450 +eyeY , 70)
	pop();
	
	//입
	push();
	noFill();
	strokeWeight(18);
	if(type == 'red'){
		arc(mouse , 410 , 80 - sliderValue, 100 , 270 , 90);
	}else{
		arc(mouse , 410 , 80 - sliderValue +1, 100 , 90 , 270);	
	}
	pop();
}

//회전하는 글자
function rotatingCenterText() {
	textFont('Rammetto One');
	
	textSize(50);
	let fin = sin(frameCount/2)*180;
	let radius = 50;
	//let speed = Math.floor(map(mouseY, 0, height, 1, 3));
	let speed = 2;
	
	let nums = words.length
	// let nums = Math.floor(map(mouseX, 0, width, 6, 20));
	push();
	//translate(width/2, height/2);
	translate(width/2, height/2);
	rotate(sin(frameCount*2/speed)*180);
	fill( lerpColor(color(coolors[0]), color(coolors[2]), sin(frameCount/5)) );
	
	for(let i = 0; i < nums; i++) {
		let gap = 360/nums;
		push();
		rotate(i * gap);
    translate(100, 100);
			push();
			translate(0, 0);
			rotate(sin(frameCount/speed)*360);
			text(words[i], 0, 0);
			pop();
			
		pop()
	}	
	pop()
}

//가운데 글자
function colorCenterTest(){
	textFont('Rammetto One');
	push();
	translate(width/2 - 65, height/2);
	textSize(20);
	text("MY HOME" , 0 , 0)
	pop()
}


//눈내리기
function goSnow(){
	nowType = 'snow';
}

function goRain(){
	nowType = 'rain';
}

function stopDrop(){
	nowType = 'none';
}

// snowflake 클래스
function snowflake() {
  // 좌표값 초기화
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 8);
	this.startX = random(0 , width);

  // 방사형 눈송이의 반지름
  // 눈송이를 화면에 고루 퍼뜨리기 위해 선택
  //this.radius = sqrt(random(pow(width / 2, 2)));
	this.radius = sqrt(random(pow(width / 2, 2)));


  this.update = function(time) {
		
		var sliderValue = slider2.value();
		
    // 원형을 따라다니는 x 위치
    let w = 0.6; // 각속도
    let angle = w * time + this.initialangle;
		this.posX = this.startX + this.radius * sin(angle);
		
    // 크기가 다른 눈송이가 미묘하게 다른 y 속도로 떨어집니다.
		if(nowType == 'snow'){
			this.posY += pow(this.size, 0.5) * (sliderValue);	
		}else{
			this.posY += pow(this.size, 0.8) * (sliderValue);
		}
    

    // 화면 하단을 지나친 눈송이는 삭제
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
		
		if(nowType == 'snow'){
			push()
			noStroke();
			fill('#fff')
			ellipse(this.posX, this.posY, this.size);
			pop()
		}else if(nowType == 'rain'){
			push()
			
			stroke('#fff');
		
			line(this.posX, this.posY, this.posX , this.posY + 30 );
			pop()
		}
  };
}
