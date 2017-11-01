
	function FF (F) {    
		DATA ();
		var F = Avg;
		var r = [], g = [], b = [];
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
		ctx.putImageData(imageData2, 0, 0);
	}

	function FF123 () {    
		DATA ();
		var F = Avg;
		var r = [], g = [], b = [];
		var r1 = 0, g1 = 0, b1 = 0;
		for (y = 1; y < h - 1; y++) {
			for (x = 1; x < w - 1; x++) {
				i = (x + y * w) * 4;
				r1 = data3[i + 0]; g1 = data3[i + 1]; b1 = data3[i + 2];
				for (y1 = y - 1; y1 <= y + 1; y1++) {
					if (y1 < 0) continue;
					for (x1 = x - 1; x1 <= x + 1; x1++) {
						if (x1 < 0) continue;
						i1 = (x1 + y1 * w) * 4;
						if ((Manhattan(x, x1, y, y1) == 0) && (d < 0)) continue;
						if ((Manhattan(x, x1, y, y1) != Math.abs(d)) && (Math.abs(d) <= 2)) continue; 
						
						r.push(Math.max(data3[i1 + 0] , r1));
						g.push(Math.max(data3[i1 + 1] , g1));
						b.push(Math.max(data3[i1 + 2] , b1));
					}
				}

				data2[i + 0] = Byte1(F(r)); // red
				data2[i + 1] = Byte1(F(g)); // green
				data2[i + 2] = Byte1(F(b)); // blue
				
				var r = [], g = [], b = [];

			}
		}
		ctx.putImageData(imageData2, 0, 0);
	}
