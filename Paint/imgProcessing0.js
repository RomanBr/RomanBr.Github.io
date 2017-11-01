	function Load() {
		/*data3 = data2
		for (var i = 0; i < data2.length; i ++) {
			if ((i + 1) % 4 == 0) continue; 
			data3[i] = data2[i];
		}*/
		DATA();
		for (var i = 0; i < data2.length; i+=4) {
			var C = (data3[i] + data3[i + 1] + data3[i + 2]) / 3;
			data2[i + 0] = ((255 - data3[i + 0]) / 2 + C / 2);
			data2[i + 1] = ((255 - data3[i + 1]) / 2 + C / 2);
			data2[i + 2] = ((255 - data3[i + 2]) / 2 + C / 2);
		}
		ctx.putImageData(imageData2, 0, 0);
	}
 
 var Pixastic = {
	Inverse: function() {
		for (var i = 0; i < data2.length; i++) {
			if ((i + 1) % 4 == 0) continue; 
			data2[i] = (255 - data3[i]);
		}
		return data2;
	},
	
	Inverse1: function() {
		data2 = data2.map(function (v, i, a) {
			if ((i + 1) % 4 == 0) return v; 
			return (255 - v);
		});
		return data2;
	},

 	grayScale: function () {
		for (var i = 0; i < data2.length; i+=4) {
			var C = (data3[i] + data3[i + 1] + data3[i + 2]) / 3;
			data2[i + 0] = C;
			data2[i + 1] = C;
			data2[i + 2] = C;
		}
		return data2;
	},

	BW: function () {
		for (var i = 0; i < data2.length; i+=4) {
			var C = (data3[i] + data3[i + 1] + data3[i + 2]) / 3;
			C = (C >= 128) ? 255 : 0;
			data2[i + 0] = C;
			data2[i + 1] = C;
			data2[i + 2] = C;
		}
		return data2;
	},	
	
	Sepia: function () {
		for (var i = 0; i < data2.length; i+=4) {
			var R = (data3[i + 0] * .393) + (data3[i + 1] *.769) + (data3[i + 2] * .189);
			var G = (data3[i + 0] * .349) + (data3[i + 1] *.686) + (data3[i + 2] * .168);
			var B = (data3[i + 0] * .272) + (data3[i + 1] *.534) + (data3[i + 2] * .131);
			data2[i + 0] = R;
			data2[i + 1] = G;
			data2[i + 2] = B;
		}
		return data2;
	},

	Cyan: function () {
		for (var i = 0; i < data2.length; i += 4) {
			data2[i + 0] = 255 - data3[i + 0];
			data2[i + 1] = 255 - data3[i + 1];
			data2[i + 2] = 255 - data3[i + 2];
		
			var R = 255 - ((data2[i + 0] * .042) + (data2[i + 1] *.769) + (data2[i + 2] * .189));
			var G = 255 - ((data2[i + 0] * .146) + (data2[i + 1] *.686) + (data2[i + 2] * .168));
			var B = 255 - ((data2[i + 0] * .272) + (data2[i + 1] *.534) + (data2[i + 2] * .194));
			
			data2[i + 0] = R;
			data2[i + 1] = G;
			data2[i + 2] = B;
		}
		return data2
	},

	Shift: function (v) {
		for (var i = 0; i < data2.length; i+=4) {
			var r = data2[i + 0];
			var g = data2[i + 1];
			var b = data2[i + 2];
			if (v == 1) {
				data2[i + 0] = b;
				data2[i + 1] = r;
				data2[i + 2] = g;
			}

			else if (v == 2) {
				data2[i + 0] = g;
				data2[i + 1] = b;
				data2[i + 2] = r;
			}
		}
		return data2;
	}
	
 };
