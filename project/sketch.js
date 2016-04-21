var amount = 0;
var message = null;
var asciiCodes = []
var effect = null;

function init() {
  message = null;
  $('#start').show();
  $('#canvasContainer').hide();
  $('#encryption').remove();
  $('#message').val("");
  clear()
}

function setup() {

  init();
  frameRate(getRandomInt(5, 10) );
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('canvasContainer');
  // noLoop();

  $("#message").keyup(function(event){
    if(event.keyCode == 13){
      $("#submit").click();
    }
  });

  $('#submit').click(function(e) {

    // black or white background
    var backgroundColor = Math.random() < 0.5 ? 0 : 255;

    // alternate the effects
    var arr = [1, 2, 3];
    while (rand == effect) {
      var rand = Math.random();
      rand *= arr.length;
      rand = Math.floor(rand);
    }

    effect = rand;
    background(backgroundColor);
    $('#start').hide();
    $('#canvasContainer').show();
    message = $('#message').val();

    var amount = 0
    for (var i = 0; i < message.length; i++) {
      asciiCodes.push(message.charCodeAt(i))
      amount += message.charCodeAt(i)
    }

    amount /= message.length

    convertMessage(message);
    drawText(message);
    messageFlag = true;
  });

  // reset app when esc is pressed
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      init();
    }
  });

  $( "#canvasContainer" ).click(function() {
    init();
  });
}

function draw() {

  if (message) {
    convertMessage(message);
    $('#encryption').remove();
    drawText(message);
  }
}

function convertMessage(message) {

  strokeWeight(3);
  stroke(255, 255, 255);

  if (effect == 0) {
    horizontalLines(message);
  } else if (effect == 1) {
    verticalLines(message)
  } else if (effect == 2) {
    horizontalLines(message);
    verticalLines(message);
  } else {
    verticalLines(message)
  }
}

function verticalLines(message) {
  var y1 = 0;
  var y2 = height/message.length;

  // while the bottom of the row is less than the window height
  while (y2 <= height) {
    for (var i=0; i<width; i+=random(width/message.length)) {
      var r = random(50);
      stroke(r*5);
      line(i, y1, i, y2);
    }
    y1 = y2;
    y2 = y2 + height/message.length;
  }
}

function horizontalLines(message) {
  var x1 = 0;
  var x2 = width/message.length;

  // while the left of the column is less than the window width
  while (x2 <= width) {

    for (a=0; a<=asciiCodes.length; a++) {
      for (var i=0; i<height; i+=asciiCodes[a]) {
        var r = random(50);
        stroke(r*5);
        line(x1, i, x2, i);
      }
      x1 = x2;
      x2 = x2 + width/message.length;
    }
  }
}

function drawText(message) {
  var secret = "this is a long string".shuffle();
  var hash = CryptoJS.HmacSHA256(message, secret);
  var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  // todo - figure out text
  text = createElement('p', hashInBase64);
  text.id('encryption');
  text.parent('message-text')
  text.position(width/2, height/2);
  text.style("font-family", "monospace");
  text.style("background-color", "#000000");
  text.style("color", "#FFFFFF");
  text.style("font-size", "18pt");
  text.style("padding", "10px");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// utility functions
String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
