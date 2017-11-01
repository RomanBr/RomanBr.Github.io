	importScripts('imgProcessing0.js');                         
	importScripts('imgProcessing1.js');                         
	importScripts('fun.js');                         

	var data2, data3, d, w, h, f;
	self.addEventListener('message', function(e) {
		//postMessage ([grayScale1(e.data[0])]);
		//let fn = eval(e.data[0]);
		//postMessage ([fn(e.data[1], e.data[2], e.data[3], e.data[4], e.data[5], e.data[6], e.data[7])]);
		data2 = e.data[1];
		data3 = e.data[2];
		d = e.data[4];
		w = e.data[5];
		h = e.data[6]; 
		f = e.data[7];
		this.postMessage ([Neighbours(Max)]);
	}, false);
	

function Neighbours(F) { //F = Max == Dilate, F = Min == Erode   
	var r = [], g = [], b = [];
	var i, i1, x, y, x1, y1;
	for (y = 1; y < h - 1; y++) {
		for (x = 1; x < w - 1; x++) {
			i = (x + y * w) * 4;

			for (y1 = y - 1; y1 <= y + 1; y1++) {
				if (y1 < 0) continue;
				for (x1 = x - 1; x1 <= x + 1; x1++) {
					if (x1 < 0) continue;
					i1 = (x1 + y1 * w) * 4;
					if ((Manhattan(x, x1, y, y1) == 0) && (d < 0)) continue;
					if ((Manhattan(x, x1, y, y1) != Math.abs(d)) && (Math.abs(d) <= 2)) continue; 
					
					r.push(data3[i1 + 0]);
					g.push(data3[i1 + 1]);
					b.push(data3[i1 + 2]);
				}
			}

			data2[i + 0] = Byte1(F(r)); // red
			data2[i + 1] = Byte1(F(g)); // green
			data2[i + 2] = Byte1(F(b)); // blue
			
			var r = [], g = [], b = [];

		}
	}
	return data2;
}
