(function() {
	var canvas = document.getElementById("game"),
		ctx = canvas.getContext("2d"),

		img = new Image(),
		imgData,

		mosaic = canvas.width/2,//初始化圆半径

		nowCanvas = document.getElementById("circle"),
		nowContext = nowCanvas.getContext("2d");
	
	img.src = "img/bg.jpg";
	img.onload = function() {
		
		ctx.drawImage(img, 0, 0, canvas.width, canvas.width);
		imgData = ctx.getImageData(0, 0, canvas.width, canvas.width);
		
		Mosaic(nowCanvas, nowContext, mosaic, imgData);

	};

})();


