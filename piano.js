(function() {
   const tones = ['A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'];
   const maxTunes = 6;

   var left = 50;
   var width = 20;

   var tunes = [];
   for (let i = 0; i < maxTunes; i++) {
      tunes.push(new AudioContext());
   }
   var tunesCount = 0;

   var getNameFromKey = function(key) {
      key = key - Math.floor(key / 12) * 12;
      return tones[key];
   };

   var getHertzFromKey = function(key) {
      var A = 55; // Hz
      return Math.pow(Math.pow(2, 1/12),key) * A;
   };

   var Key = function(key, xPos, yPos) {
      this.key = key;
      this.tKey = getNameFromKey(key);
      this.sharp = this.tKey.search('♯')===1?1:0;
      this.div = document.createElement('div');
      this.div.style.width = (this.sharp?width/2:width) + 'px';
      this.div.style.height = this.sharp?'70px':'100px';
      this.div.style.position = 'absolute';
      this.div.style.left = (left + (this.sharp?-5:0)) + 'px';
      if (this.sharp) this.div.className = 'sharp';
      this.div.style.top = yPos + 'px';
      this.div.style.border = '1px solid black';
      this.div.innerHTML = this.tKey;
      this.bg = ['white', 'black'][this.sharp];
      this.div.style.backgroundColor = this.bg;
      this.oscillator = null;
      var self = this;
      this.div.onmousedown = function() {
         tunesCount++;
         var c = tunes[tunesCount-1];
         self.oscillator = c.createOscillator();
         self.oscillator.type = "sine";
         self.oscillator.frequency.value = getHertzFromKey(self.key);
         self.oscillator.connect(c.destination);
         self.oscillator.start();
      };
      this.div.onmouseup = function() {
         self.oscillator.stop();
         tunesCount--;
      };
      left += this.sharp?0:width;
   };

   Key.prototype.append = function(parent) {
      parent.appendChild(this.div);
   };

   document.addEventListener('DOMContentLoaded', function() {
      var divPiano = document.createElement('div');
      var body = document.body;
      body.appendChild(divPiano);

      var count = 88;
      var key = null;
      for (let i = 0; i < count; i++) {
         key = new Key(i, i*width, 0);
         key.append(divPiano);
      }
      var divs = document.getElementsByClassName('sharp');
      for(let i = 0; i < divs.length; i++){
         //do something to each div like
         divs[i].style.zIndex = i+10;
      }
   });
})();