var Mosaic = function(canvas, context, mosaic, imgData) {

	var mosaic = mosaic || 10,//圆的半径

		imgData = imgData,//图片数据
		data = imgData.data,
		len = data.length,
		width = imgData.width,
		height = imgData.height,

		pixelArray = [],

		circleArray = [],

		fun = {
			initCircle : function() {},
			circleTouchstart : function() {},
			getPixel : function() {},
			dividedCircle : function() {}
		},

		nowCan = canvas,
		nowCtx = context,

		mouse = utils.caputerMouse(nowCan);//移到移动端时，可以改为移动端位置判断



	fun.initCircle = function() {

		var x = width/2,
			y = height/2,
			r = width/2,
			color = fun.getPixel(r, x, y),

			circle = new Circle(x, y, r);

		circle.fillStyle = color;

		circleArray.push(circle);
		
		circle.draw(nowCtx);
	};

	fun.getPixel = function(radius, x, y) {//获取指定圆的像素值
		var posX = Math.floor(x),
			posY = Math.floor(y),

			pixelIndex = (posX + (posY * width) - 1) * 4,
			red = data[pixelIndex + 0],
			green = data[pixelIndex + 1],
			blue = data[pixelIndex + 2],
			alpha = data[pixelIndex + 3]/255,


			color = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";

		return color;
	};

	fun.dividedCircle = function(faCircle) {

		if(faRadius/2 === 2) {return;}

		var faRadius = faCircle.radius,
			faX = faCircle.x,
			faY = faCircle.y,

			radius = faRadius/2,

			oneX = faX - faRadius/2,
			oneY = faY - faRadius/2,
			oneColor = fun.getPixel(radius, oneX, oneY),

			twoX = faX + faRadius/2,
			twoY = faY - faRadius/2,
			twoColor = fun.getPixel(radius, twoX, twoY),

			threeX = faX - faRadius/2,
			threeY = faY + faRadius/2,
			threeColor = fun.getPixel(radius, threeX, threeY),

			fourX = faX + faRadius/2,
			fourY = faY + faRadius/2,
			fourColor = fun.getPixel(radius, fourX, fourY);


		nowCtx.clearRect(faX-faRadius, faY-faRadius, faRadius*2, faRadius*2);

		var oneCircle = new Circle(oneX, oneY, radius);
		oneCircle.fillStyle = oneColor;
		oneCircle.draw(nowCtx);
		
		var twoCircle = new Circle(twoX, twoY, radius);
		twoCircle.fillStyle = twoColor;
		twoCircle.draw(nowCtx);

		var threeCircle = new Circle(threeX, threeY, radius);
		threeCircle.fillStyle = threeColor;
		threeCircle.draw(nowCtx);

		var fourCircle = new Circle(fourX, fourY, radius);
		fourCircle.fillStyle = fourColor;
		fourCircle.draw(nowCtx);

		circleArray.push(oneCircle);
		circleArray.push(twoCircle);
		circleArray.push(threeCircle);
		circleArray.push(fourCircle);

		return true;
	};

	fun.touchstart = function() {

		canvas.addEventListener("mousemove", function() {

			for(var i=0, len=circleArray.length; i<len; i++) {
				var cic = circleArray[i],
					isCirclrIn = utils.intersects(mouse, circleArray[i]);
					//diameter = circle.radius;

				if(isCirclrIn) {
					
					var isDivided = fun.dividedCircle(cic);
					if(isDivided) {
						circleArray.splice(i, 1);
					}
				}
			}
		});
	};
	
	fun.initCircle();
	fun.touchstart();
};


var Circle = function(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.fillStyle = null;
}

Circle.prototype = {
	draw : function(nowCtx) {
		nowCtx.save();
		nowCtx.beginPath();
		nowCtx.fillStyle = this.fillStyle;
		nowCtx.translate(this.x, this.y);
		nowCtx.arc(0, 0, this.radius, 0, Math.PI*2, false);
		nowCtx.closePath();
		nowCtx.fill();
		nowCtx.restore();
	},

	getBound : function() {
		return {
			x : this.x - this.radius,
			y : this.y - this.radius,
			width : this.radius*2,
			height : this.radius*2
		};
	}
};