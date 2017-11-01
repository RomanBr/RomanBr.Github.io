	function hist (n) {
		DATA();
		histogram = Array(256)
		for (i = 0; i < 256; ++i)
			histogram[i] = 0;
		
		for (i = 0; i < data3.length; i += 4) {
		  c = Col (n, data3[i + 0], data3[i + 1], data3[i + 2]);
		  histogram[Math.round(c)] += 1;
		}
		return histogram;
	}

	function histEq (n) {
		DATA();
		var histogram = hist(n);
		var histogramEq = hist(n);
		
		for (var i = 0; i < 256; i++) {
			if (histogram[i] == 0) continue;
			for (var j = 0; j < 256; j++) {
				if (histogram[j] == 0) continue;
				if (histogram[j] < histogram[i]) histogramEq[i]++;
			}
		}
		
		//h = new Array (histogramEq);
		hMin = Min(histogramEq.filter (function (n) { return (n != 0); }));
		alert (hMin);
		for (var i = 0; i < 256; i++) {
			histogramEq[i] = 255 * (histogramEq[i] - hMin) / (data3.length / 4 - 1);
		}
		return histogramEq;
	}

	function colAvg (n) {
		DATA();
		var c = 0, i;
		for (i = 0; i < data3.length; i+=4) {
		  c += Col (n, data3[i + 0], data3[i + 1], data3[i + 2]);
		}
		return c / (data3.length / 4);
	}
	
	function otsuThreshold(n, pixelsNumber) {
		var histogram = hist(n);  
		var sum = 0, sumB = 0, wB = 0, wF = 0, mB
		, mF, max = 0, between, threshold = 0;
		for (var i = 0; i < 256; ++i) {
			wB += histogram[i];
			if (wB == 0) continue;
			wF = pixelsNumber - wB;
			if (wF == 0) break;
			sumB += i * histogram[i];
			mB = sumB / wB;
			mF = (sum - sumB) / wF;
			between = wB * wF * Math.pow(mB - mF, 2);
			if (between > max) {
				max = between;
				threshold = i;
			}
		}
		return threshold;
	}

	function Otsu () {
		DATA();
		var tR = otsuThreshold(1, data3.length / 4);
		var tG = otsuThreshold(2, data3.length / 4);
		var tB = otsuThreshold(3, data3.length / 4);

		for (i = 0; i < data3.length; i += 4) {
			data2[i + 0] = (data3[i + 0] >= tR ? 255 : 0);
			data2[i + 1] = (data3[i + 1] >= tG ? 255 : 0);
			data2[i + 2] = (data3[i + 2] >= tB ? 255 : 0);
			
		}
		ctx.putImageData(imageData2, 0, 0);	

	}

