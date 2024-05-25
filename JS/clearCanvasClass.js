class ClearCanvas{

      constructor(){
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext('2d');

        var btnEffacer = document.getElementById("btEffacer");
        btnEffacer.addEventListener("click", this.clear.bind(this)); 
      }
    
         //-- effacer le canvas --//
      clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); 
      }
}
new ClearCanvas();