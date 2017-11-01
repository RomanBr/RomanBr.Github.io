Pixastic['Color_threshold'] = function  (F, T) {
		for (var i = 0; i < data2.length; i++) {
			
			if ((i + 1) % 4 == 0) continue;		
			data2[i] = (F(data3[i] >= T) ? 255 : 0);
		}
		return data2;
	}


Pixastic['LowPFilter'] = function  (F, T) {
		for (var i = 0; i < data2.length; i++) {
			if ((i + 1) % 4 == 0) continue;		
            if (F(data3[i]) >= T) data2[i] = 255;
		}
		return data2;
	}

Pixastic['HighPFilter'] = function (F, T) {
		for (var i = 0; i < data2.length; i++) {
			if ((i + 1) % 4 == 0) continue;		
            if (F(data3[i]) <= T) data2[i] = 0;
		}
		return data2;
	}

Pixastic['Color_threshold1'] = function () {
		var c;
		for (var i = 0; i < data2.length; i+=4) {
			var c = (data3[i+0] + data3[i+1] + data3[i+2]) / 3;
			for (j = 0; j < 3; j++) {
				data2[i + j] = ((data3[i + j] >= c) ? 255 : 0);
			}
		}
		return data2;
	}

Pixastic['LowPFilter1'] = function () {
		var c;
		for (var i = 0; i < data2.length; i+=4) {
			var c = (data3[i+0] + data3[i+1] + data3[i+2]) / 3;
			for (j = 0; j < 3; j++) {
				if (data3[i + j] >= c) data2[i + j] = 255;
			}
		}
		return data2;
	}

Pixastic['HighPFilter1'] = function () {
		var c;
		for (var i = 0; i < data2.length; i+=4) {
			var c = (data3[i+0] + data3[i+1] + data3[i+2]) / 3;
			for (j = 0; j < 3; j++) {
				if (data3[i + j] <= c) data2[i + j] = 0;
			}
		}
		return data2;
	}


Pixastic['imgFunc'] = function (F) {
		for (var i = 0; i < data2.length; i++) {
			if ((i + 1) % 4 == 0) continue;		
			data2[i] = F(data3[i]);
		}
		return data2;
	}

Pixastic['Neighbours123'] = function (F) { //F = Max == Dilate, F = Min == Erode   
	var r = [], g = [], b = [];
	for (y = 1; y < h - 1; y++) {
		for (x = 1; x < w - 1; x++) {
			i = (x + y * w) * 4;

			for (y1 = y - 1; y1 <= y + 1; y1++) {
				if ((y1 < 0) &&  (y1 >= h)) continue;
				for (x1 = x - 1; x1 <= x + 1; x1++) {
					if ((x1 < 0) && (x1 >= w)) continue;
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
