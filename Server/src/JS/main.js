
let canvas;

let canvas_width = (innerWidth/12)*8;
let canvas_height = 300;

let segments = [];
let segmentStates = [];
let segmentWidth = 100; // 橢圓長度
let segmentHeight = 30; // 橢圓寬度
let centerX = canvas_width/2; // 顯示器中心X座標
let centerY = 150; // 顯示器中心Y座標
let segmentSpacing = 120; // 垂直間距
let horizontalOffset = 60; // 水平間距
let buttonX = 150; // 送出按鈕的X座標
let buttonY = 350; // 送出按鈕的Y座標
let buttonRadius = 30; // 

function setup() {

  canvas = createCanvas(canvas_width, canvas_height);
  let Parent = document.querySelector('.CanvasParent');

  canvas.parent(Parent);
  //canvas.style("position", "absolute");
  canvas.style("position", "absolute");
  canvas.style("left", "4px");

  // canvas.style("left", (innerWidth / 2) - (canvas_width / 2) + "px");

  // 定義七段顯示器的每段位置、方向和狀態
  segments = [
    { x: centerX, y: centerY - segmentSpacing, rotation: 0, active: false }, // 上
    { x: centerX + horizontalOffset, y: centerY - segmentSpacing / 2, rotation: 90, active: false }, // 右上
    { x: centerX + horizontalOffset, y: centerY + segmentSpacing / 2, rotation: 90, active: false }, // 右下
    { x: centerX, y: centerY + segmentSpacing, rotation: 0, active: false }, // 下
    { x: centerX - horizontalOffset, y: centerY + segmentSpacing / 2, rotation: 90, active: false }, // 左下
    { x: centerX - horizontalOffset, y: centerY - segmentSpacing / 2, rotation: 90, active: false }, // 左上
    { x: centerX, y: centerY, rotation: 0, active: false } // 中
  ];
}


function draw() {
  background(150);

  // 繪製每一段
  for (let seg of segments) {
    drawSegment(seg);
  }

}

// 繪製一段 (長橢圓形)
function drawSegment(seg) {
  push();
  translate(seg.x, seg.y); // 移動位置
  rotate(radians(seg.rotation)); // 旋轉

  stroke(255);

  // 設定顏色
  if (seg.active) {
    fill(255); // 白色 (按下)
  } else {
    fill(150); // 灰色 (預設)
  }

  // 繪製有尖端的段
  drawSegmentWithPointedEnds(0, 0, segmentWidth, segmentHeight, 0);
  pop();
}

//繪製帶有尖端的段
function drawSegmentWithPointedEnds(x, y, width, height, rotation) {
  push();
  translate(x, y); // 移動到指定位置
  rotate(radians(rotation)); // 旋轉

  // 定義多邊形頂點
  beginShape();
  vertex(-width / 2 + height / 2, -height / 2); // 左上角
  vertex(width / 2 - height / 2, -height / 2);  // 右上角
  vertex(width / 2, 0);                        // 右尖端
  vertex(width / 2 - height / 2, height / 2);  // 右下角
  vertex(-width / 2 + height / 2, height / 2); // 左下角
  vertex(-width / 2, 0);                       // 左尖端
  endShape(CLOSE);

  pop();
}


// 滑鼠點擊事件
function touchStarted() {
  // 檢查顯示器是否被點擊
  for (let seg of segments) {
    if (isMouseInsideSegment(seg)) {
      seg.active = !seg.active; // 切換
    }
  }

  // 檢查是否點擊送出按鈕
  let tx = touches[0]?.x || mouseX;
  let ty = touches[0]?.y || mouseY;
  handleSubmit();

}


// 檢查滑鼠是否點擊到某一筆畫
function isMouseInsideSegment(seg) {
  // 計算滑鼠點擊的相對座標 (將世界座標轉換為段的局部座標)
  let dx = mouseX - seg.x; // 滑鼠到段中心的X偏移
  let dy = mouseY - seg.y; // 滑鼠到段中心的Y偏移

  // 旋轉坐標反轉 (將滑鼠點擊座標旋轉回橢圓形原始方向)
  let angle = -radians(seg.rotation);
  let localX = dx * cos(angle) - dy * sin(angle); // X座標旋轉反轉
  let localY = dx * sin(angle) + dy * cos(angle); // Y座標旋轉反轉

  // 檢查是否在橢圓範圍內
  let inRect = abs(localX) <= segmentWidth / 2 && abs(localY) <= segmentHeight / 2;
  return inRect;
}



// 處理送出邏輯
function handleSubmit() {
  // 紀錄所有段的 active 狀態
  segmentStates = segments.map(seg => (seg.active ? 1 : 0));
  //console.log(segmentStates);

  let UI = document.querySelectorAll('.seg' + (index+1).toString());

  for (let i = 0; i < UI.length; i++) {

    UI[i].style.opacity = 0.3 + (segmentStates[i] * 0.7);
  }


}


function Reset (){
  // 重置所有段的 active 狀態為 false
  for (let seg of segments) {
      seg.active = false;
    }
}