var x1, y1, xx1, yy1, i, i1, j, w = 0, h = 0, x, y, r, g, b, d, f, col, col1, col2, col3, col4, col5, xx, yy, cc1, cc2, cc3, cc4;
var ColBW, Cols, start;
var worker = new window.Worker("worker.js");
var imageData2, data2, data3, c, ctx;
var fName = "3.bmp";

	window.onload = function(e) {
		/*var a = [1, 2, 3, 4, 5, 6, 7];
		alert (GMean(10, a) + "\n" + GMean1(a));
		return;
		//alert(Math.acos(Math.cos(128)));
		/*a = [255, 128, 12, 123, 100];
		alert (Max0(a));*/

		/*var gx = [ [1, 4, 7, 4,1], [4, 16, 26, 16, 4], [7, 26, 41, 26, 7], [4, 16, 26, 16, 4], [1, 4, 7, 4,1] ];
		var gy = [ [1, 4, 7, 4,1], [4, 16, 26, 16, 4], [7, 26, 41, 26, 7], [4, 16, 26, 16, 4], [1, 4, 7, 4,1] ];
		
		var G =	[ [ 1, 4, 6, 4, 1 ], [ 4, 16, 24, 16, 4 ], [ 6, 24, 36, 24, 6 ], [ 4, 16, 24, 16, 4 ], [ 1,  4, 6, 4, 1 ] ];
		alert(calcFactor(G));
		document.write ("Gx:<BR/>");
		for (x = 0; x < gx.length; x++) {
			for (y = 0; y < gx[0].length; y++) {
			 document.write (gx[x][y] + "&nbsp;");
			}
			document.write ("<BR/>") ;
		}

		document.write ("<BR/>Gy:<BR/>");
		for (x = 0; x < gy.length; x++) {
			for (y = 0; y < gy[0].length; y++) {
			 document.write (gy[x][y] + "&nbsp;");
			}
			document.write ("<BR/>") ;
		}
		 return; */
		
		/*n = 65536;
		alert (cntZeros(n));*/
		
		/*var n = HMDistMax(1,2,3,4,5,6,7,8,9,10);
		alert (n);*/
		
		c = document.getElementById("imageView");
		ctx = c.getContext("2d");
		var img = new Image();
		img.src = fName;
		img.onload = function() {
			c.width = img.width;
			c.height = img.height;
			w = img.width;
			h = img.height;
			//alert (img.width + " " + img.height);
			ctx.drawImage(img, 0, 0);
			// img.style.display = 'none';
			imageData2 = ctx.getImageData(0, 0, c.width, c.height);
			data2 = imageData2.data;
			data3 = new Uint8ClampedArray(imageData2.data);
		}
	}

	function execAlg (e) {
		DATA ();
		//worker.postMessage ([1, data2, data3, e.options, d, w, h, f])
		start = new Date();
		var imageData2 = new ImageData(Pixastic[e.effect](e.options), w, h);
		ctx.putImageData(imageData2, 0, 0);
		
        var diff = new Date() - start;
        log.innerHTML = "Process done in " + diff + " ms (no web workers)";

	}
	
	function execAlg1 (e) {
		DATA ();
		//worker.postMessage ([1, data2, data3, e.options, d, w, h, f])
		start = new Date();
		var imageData2 = new ImageData(Pixastic[e.effect](e.options.F, e.options.T), w, h);
		ctx.putImageData(imageData2, 0, 0);
		
        var diff = new Date() - start;
        log.innerHTML = "Process done in " + diff + " ms (no web workers)";

	}

	function execAlg2 (e) {
		DATA ();
		start = new Date();
		try {
			worker.postMessage ([e.effect, data2, data3, e.options, d, w, h, f]);
		}
		catch (e) { console.log (e); }
	}
	
	worker.onmessage = function (e) {
		data2 = e.data[0];
		var imageData2 = new ImageData(e.data[0], w, h);
		ctx.putImageData(imageData2, 0, 0);
	    var diff = new Date() - start;
        log.innerHTML = "Process done in " + diff + " ms (no web workers)";
	}
	
	function changeVal () {
		ColBW = val.value / 100;
		Cols = 1 - ColBW;
		valText.innerHTML = val.value + "%";
	} 
	
	function DATA() {
		d = imgForm.dVal.value;
		f = imgForm.fVal.value;
		/*data.value = JSON.stringify(imageData2.data);
		return true;*/
		
		var x = document.imgForm.imgType.value;
		if (x == "Current") {
			c = document.getElementById("imageView");
			ctx = c.getContext("2d");
			imageData2 = ctx.getImageData(0, 0, c.width, c.height);
			data2 = imageData2.data;
			data3 = new Uint8ClampedArray(imageData2.data);
		}

		if (x == "Default") {
			var img = new Image();
			img.src = fName;

			ctx.drawImage(img, 0, 0);
			imageData2 = ctx.getImageData(0, 0, c.width, c.height);
			data2 = imageData2.data;
			data3 = new Uint8ClampedArray(data3.length);
		}
		
	}