(function() {
   const tones = ['G♯', 'A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'];
   const maxTunes = 6;

   var tunes = [];
   for (let i = 0; i < maxTunes; i++) {
      tunes.push(new AudioContext());
   }
   var tunesCount = 0;

   var getNameFromKey = function(key) {
      return tones[((key-(Math.floor(key / 12)*12))-1)];
   };

   var getHertzFromKey = function(key) {
      return Math.pow(Math.pow(2, 1/12),key-49)*440;
   };

   var Key = function(key, xPos, yPos) {
      this.key = key;
      this.tKey = getNameFromKey(key);
      this.sharp = this.tKey.search('♯')===1?1:0;
      this.div = document.createElement('div');
      this.div.style.width = '20px';
      this.div.style.height = this.sharp?'70px':'100px';
      this.div.style.position = 'absolute';
      this.div.style.left = (this.sharp?xPos-10:xPos) + 'px';
      this.div.style.top = yPos + 'px';
      this.div.style.border = '1px solid black';
      this.div.innerHTML = this.tKey;
      this.bg = ['white', 'black'][this.sharp];
      this.div.style.backgroundColor = this.bg;
      this.oscillator = null;
      this.div.onmousedown = this.mouseDown;
      this.div.onmouseup = this.mouseUp;
   };

   Key.prototype.append = function(parent) {
      parent.appendChild(this.div);
   };

   Key.prototype.mouseDown = function() {
      tunesCount++;
      var c = tunes[tunesCount-1];
      this.oscillator = c.createOscillator();
      this.oscillator.type = "sine";
      this.oscillator.frequency.value = getHertzFromKey(key);
      this.oscillator.connect(c.destination);
      this.oscillator.start();
   };

   Key.prototype.mouseUp = function() {
      this.o.stop();
      tunesCount--;
   };

   document.addEventListener('DOMContentLoaded', function() {
      var divPiano = document.createElement('div');
      var body = document.body;
      body.appendChild(divPiano);

      var width = 20;
      var count = 20;
      var key = null;
      for (let i = 0; i < count; i++) {
         key = new Key(i+49, i*width, 0);
         key.append(divPiano);
      }
   });
})();