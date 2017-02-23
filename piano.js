var tones = ['G♯', 'A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'];
var body = document.body;
var divPiano = document.createElement('div');
body.appendChild(divPiano);

var getNameFromKey = function(key) {
   return tones[((key-(Math.floor(key / 12)*12))-1)];
};

var getHertzFromKey = function(key) {
   return Math.pow(Math.pow(2, 1/12),key-49)*440;
};

var tunes = [];
for (let i = 0; i < 6; i++) {
   tunes.push(new AudioContext());
}
var tunesCount = 0;


var getKey = function(key, xPos, yPos) {
   var tKey = getNameFromKey(key);
   var isSharp = tKey.search('♯')===1?1:0;
   var div = document.createElement('div');
   div.style.width = '20px';
   div.style.height = isSharp?'70px':'100px';
   div.style.position = 'absolute';
   div.style.left = (isSharp?xPos-10:xPos) + 'px';
   div.style.top = yPos + 'px';
   div.style.border = '1px solid black';
   div.innerHTML = tKey
   var bg = ['white', 'black'];
   div.style.backgroundColor = bg[isSharp];
   var o;
   div.onmousedown = function() {
      tunesCount++;
      var c = tunes[tunesCount-1];
      o = c.createOscillator();
      o.type = "sine";
      o.frequency.value = getHertzFromKey(key);
      o.connect(c.destination);
      o.start();
   };
   div.onmouseup = function() {
      o.stop();
      tunesCount--;
   };
   return div;
};

var width = 20;
var count = 20;
for (let i = 0; i < count; i++) {
   divPiano.appendChild(getKey(i+49, i*width, 0));
}

