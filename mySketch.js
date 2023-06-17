function setup() {
	createCanvas(1200, 940);
  angleMode(DEGREES);
	//슬라이더1
	drawSlider();
	drawSlider2();
}
function draw() {
	//circle(mouseX, mouseY, 20);
	//background('#f7f7f7');	
	background('#868B96');
	drawGrid(20);         // 모눈종이표	
	
		//버튼 추가
	push();
  button = createButton('Drop Snow');
  button.position( 150 , 860);
	button.mousePressed(goSnow);
	pop();
	
	
	push();
  button = createButton('Drop Rain');
  button.position( 150 , 890);
	button.mousePressed(goRain);
	pop();
	
	push();
  button = createButton('STOP');
  button.position( 150 , 920);
	button.mousePressed(stopDrop);
	pop();
	
	push();
	textSize(30);
  //textAlign(CENTER);
	fill(0);
  text("Mood", 10, 880);
  pop();
	
	push();
	textSize(30);
  //textAlign(CENTER);
	fill(0);
  text("Drop Speed", 250, 880);
  pop();
	
	//빨강 오른쪽 캐릭터그리기
	draw_character('red');
	
	//파랑 왼쪽 캐릭터 그리기
	draw_character('blue');
	
	//회전하는 글자
	rotatingCenterText();
	
	//가운데 정적 글자
	colorCenterTest();
	
	//눈내리기
	if(nowType == 'snow' || nowType == 'rain'){
		let t = frameCount / 60; // 시간 업데이트

		// 매 프라임마다 무작위 개수의 눈송이 생성
		for (let i = 0; i < random(1); i++) {
			snowflakes.push(new snowflake()); // 눈송이 객체 추가
		}

		// for 반복문을 사용하여 눈송이 반복
		for (let flake of snowflakes) {
			flake.update(t); // 눈송이 위치 업데이트
			flake.display(); // 눈송이 그리기
		}
	}
	
	
}