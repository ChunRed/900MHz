
let canvas;

<<<<<<< HEAD
let canvas_width = 300;
let canvas_height = 400;

let segments = [];
let segmentWidth = 70; // 橢圓長度
let segmentHeight = 15; // 橢圓寬度
let centerX = 150; // 顯示器中心X座標
let centerY = 200; // 顯示器中心Y座標
let segmentSpacing = 80; // 垂直間距
let horizontalOffset = 40; // 水平間距
let buttonX = 150; // 送出按鈕的X座標
let buttonY = 350; // 送出按鈕的Y座標
let buttonRadius = 30; // 
=======
let canvas_width = 200;
let canvas_height = 200;
>>>>>>> 2294d8999c2a53f7db08be93ba84d7aac1d9f40d

function setup() {

    canvas = createCanvas(canvas_width, canvas_height);
    let Parent = document.querySelector('.CanvasParent');

    canvas.parent(Parent);
    canvas.style("position", "relative");
    canvas.style("left", (innerWidth/2) - (canvas_width/2) + "px");

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


function draw(){
    background(100);

    // 繪製每一段
    for (let seg of segments) {
        drawSegment(seg);
    }

    // 繪製送出按鈕
    drawSubmitButton();

}

// 繪製一段 (長橢圓形)
function drawSegment(seg) {
    push();
    translate(seg.x, seg.y); // 移動位置
    rotate(radians(seg.rotation)); // 旋轉
    
    // 設定顏色
    if (seg.active) {
      fill(255); // 白色 (按下)
    } else {
      fill(150); // 灰色 (預設)
    }
  
    // 畫出長橢圓形
    rectMode(CENTER);
    rect(0, 0, segmentWidth, segmentHeight, segmentHeight / 2); // 圓角矩形
    pop();
  }

  // 繪製送出按鈕
function drawSubmitButton() {
    fill(0, 200, 0); // 綠色按鈕
    ellipse(buttonX, buttonY, buttonRadius * 2); // 圓形按鈕
    fill(255); // 按鈕文字顏色
    textAlign(CENTER, CENTER);
    textSize(16);
    text("送出", buttonX, buttonY);
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
      if (isTouchInsideButton(tx,ty)) {
        handleSubmit();
      }
    
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
  
  // 檢查觸控點是否點擊到送出按鈕
  function isTouchInsideButton(tx, ty) {
    let dx = tx - buttonX; // 觸控點到按鈕中心的X偏移
    let dy = ty - buttonY; // 觸控點到按鈕中心的Y偏移
    let distance = sqrt(dx * dx + dy * dy); // 計算觸控點到按鈕中心的距離
    return distance <= buttonRadius; // 如果距離小於等於按鈕半徑，返回 true
  }
  
  
  // 處理送出邏輯
  function handleSubmit() {
    // 紀錄所有段的 active 狀態
    let segmentStates = segments.map(seg => (seg.active ? 1 : 0));
    alert(segmentStates); // 印出紀錄的陣列

    // 重置所有段的 active 狀態為 false
  for (let seg of segments) {
    seg.active = false;
  }
  }