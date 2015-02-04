/*

The MIT License (MIT)
Copyright (c) 2014 Trippel-M levende bilder AS
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/


var redraw;
var sync;
var audioElement;
var click = 0;

$(function() {
	console.log("Test Pattern Loading");

	redraw = function() {

		// Completely wipe the canvas.

		$("#canvas").remove();
		$("body").append("<canvas id='canvas' width='"+$(window).width()+"' height='"+$(window).height()+"'></canvas>");
		$("#canvas").css("height",$(window).height());
		$("#canvas").css("width",$(window).width());

		// Do sizes for guides

		$("#main").css("height",$(window).height()-2);
		$("#three").css("height",$(window).height()-2-3-3);
		$("#fifty").css("height",$(window).height()-2-3-1-50-50);

		// Resolution
		$("#resolution").html($(window).width() + "x" + $(window).height());
		$("#resolution").css("top",(($(window).height() / 2)-($("#resolution").height()/2)));
		$("#resolution").css("left",(($(window).width() / 2)-($("#resolution").width() /2)));

		// Logo
		$("#logo,#resolution").show();
		$("#logo").css("top",(($(window).height() / 2)-($("#logo").height())));
		$("#logo").css("left",(($(window).width() / 2)-($("#logo").width() /2)));


		// Position sync indicator
		$("#sync").css("top",(($(window).height() / 2)-($("#sync").height()/2)));
		$("#sync").css("left",(($(window).width() / 2)-($("#sync").width() /2)));

		// Make canvas
		var c=document.getElementById("canvas");
		var ctx=c.getContext("2d");

		// Draw circle
		ctx.beginPath();
		ctx.strokeStyle="#00FF00";

		if ($(window).height() < $(window).width()) {
			xy = $(window).height()/2
		} else {
			xy = $(window).width()/2
		}

		ctx.arc(
			$(window).width()/2,
			($(window).height()/2) - 3,
			xy-53,0,2*Math.PI
		);

		ctx.stroke();

		var id = ctx.createImageData(1,1);
		var d  = id.data;




		// Draw focus dots
		d[0]   = 255;
		d[1]   = 255;
		d[2]   = 255;
		d[3]   = 255;
		var pcx = 10;
		var pcy = 10;
		while(pcx < 100) {
			while(pcy < 100) {
				var x = ($(window).width()/100) * pcx;
				var y = ($(window).height()/100) * pcy;
				ctx.putImageData( id, x-2, y);
				ctx.putImageData( id, x+2, y);
				ctx.putImageData( id, x, y-2);
				ctx.putImageData( id, x, y+2);
				ctx.putImageData( id, x-1, y);
				ctx.putImageData( id, x+1, y);
				ctx.putImageData( id, x, y-1);
				ctx.putImageData( id, x, y+1);
				ctx.putImageData( id, x, y);
				console.log(x,y);
				pcy += 10;
			}
			pcy = 10;
			pcx += 10;
		}


		// Feature: Draw Center lines 
		// Centerlines

		var h = $(window).height();
		var w = $(window).width();

		var center_h = h/2;
		var center_w = w/2;

		ctx.beginPath();
		ctx.strokeStyle="#FF00FF";

		// Horizontal Centerline
		ctx.moveTo(0,center_h);
		ctx.lineTo(w,center_h);

		// Vertical Centerline
		ctx.moveTo(center_w,0);
		ctx.lineTo(center_w,h);

		// Add Color
		ctx.stroke();






		// Feature: Draw Diagonal Center lines 

		var h = $(window).height();
		var w = $(window).width();

		ctx.beginPath();
		ctx.strokeStyle="#FFFF00";

		// Horizontal Centerline
		ctx.moveTo(0,0);
		ctx.lineTo(w,h);

		// Vertical Centerline
		ctx.moveTo(w,0);
		ctx.lineTo(0,h);

		// Add Color
		ctx.stroke();
















	};


	sync = function() {	
		console.log("beep");
		setTimeout(sync,1000);
		if (click) {
		$("#sync").show();
		audioElement.play();
		}
		$("#sync").fadeOut('fast');
	}

	$("body").append("<div id='main'></div>");
	$("#main").append("<div id='three'></div>");
	$("#three").append("<div id='fifty'></div>");
	$("#three").append("<div id='resolution'>X</div>");
//	$("#three").append("<div id='logo'><img src='http://trippelm.no/wp-content/uploads/2014/01/trippelmlogosort.png'></div>");
	$("#three").append("<div id='sync'></div>");

        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'beep.wav');
        audioElement.load();

	$.get();

	setTimeout(redraw,100);
	setTimeout(sync,1000);

	$("body").click(function() {
		if (click) { click = 0 }
		else { click = 1 }
	});

	$(window).resize(redraw);


});
