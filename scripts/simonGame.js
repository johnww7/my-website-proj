$(document).ready(function() {

  draw();
  function draw() {
    let canvas = document.getElementById('board');
    if(canvas.getContext) {
      let ctx = canvas.getContext('2d');
      console.log('created');
      ctx.fillStyle = 'rgb(200, 0, 0)';
      ctx.fillRect(10, 10, 50, 50);

      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      ctx.fillRect(30, 30, 50, 50);
    }
  }

});
