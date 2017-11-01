	function sinMax(Arr) {
		if ((arguments.length > 1) && (typeof Arr == 'number')) Arr = [].slice.call(arguments);
		return Arr.sort(function(a, b){return (Math.sin(b) - Math.sin(a))})[0];
	}

	function sinMax1(Arr) {
		if ((arguments.length > 1) && (typeof Arr == 'number')) Arr = [].slice.call(arguments);
		return Arr.sort(function(a, b){return Math.sin(b - a)})[0];
	}

	function sinMin(Arr) {
		if ((arguments.length > 1) && (typeof Arr == 'number')) Arr = [].slice.call(arguments);
		return Arr.sort(function(a, b){return (Math.sin(a) - Math.sin(b))})[0];
	}

	function sinMin1(Arr) {
		if ((arguments.length > 1) && (typeof Arr == 'number')) Arr = [].slice.call(arguments);
		return Arr.sort(function(a, b){return Math.sin(a - b)})[0];
	}

	function cosMax(Arr) {
		if ((arguments.length > 1) && (typeof Arr == 'number')) Arr = [].slice.call(arguments);
		//return Arr.sort(function(a, b){return (Math.cos(b) - Math.cos(a))})[0];
		//return Arr.sort(function(a, b){return (Math.cos(b) - Math.sin(a))})[0];
		//return Arr.sort(function(a, b){return  Math.sin(Math.sin(Math.sin(b - a))) })[0];
		
		return Arr.sort(function(a, b){return (Math.sin(b) < Math.sin(a))})[0];
	}

	function HMDistMax(Arr) {
		if ((arguments.length > 1) && (typeof Arr == 'number')) Arr = [].slice.call(arguments);
		/*var avg = Arr.reduce(function(a, b) { return a + b; }) / Arr.length;
		Arr = Arr.map(function(num) { return  (num >= avg) ? num : 255; });*/
		
		//return 255 - Arr.sort(function(a, b){return a - b})[0];
		
		//return Arr.sort(function(a, b){return Math.sin(a); })[0];
		//return Arr.sort(function(a, b){return Math.cos(a); })[0];
		//return Arr.sort(function(a, b){return Math.tan(a); })[0];
		
		//return Arr.sort(function(a, b){return Math.sin(b); })[0];
		//return Arr.sort(function(a, b){return Math.cos(n); })[0];
		return Arr.sort(function(a, b){return Math.tan(b); })[0];

		
		//return Arr.sort(function(a, b){return Math.cos(a) / Math.sin(b); })[0];
		//return Arr.sort(function(a, b){return Math.cos(b) / Math.sin(a); })[0];
		//return Arr.sort(function(a, b){return Math.sin(a) / Math.cos(b); })[0];
		//return Arr.sort(function(a, b){return Math.cos(a) / Math.sin(b); })[0];

		//return Arr.sort(function(a, b){return Math.tan(a) / Math.sin(b); })[0];
		//return Arr.sort(function(a, b){return Math.tan(a) / Math.cos(b); })[0];
		//return Arr.sort(function(a, b){return Math.tan(a) / Math.tan(b); })[0];
		
		
		
		//return Arr.sort(function(a, b){return (Math.cos(b) - Math.cos(a))})[0];
		//return Arr.sort(function(a, b){return (Math.sin(b) - Math.sin(a))})[0];
		//return Arr.sort(function(a, b){return (Math.tan(b) - Math.tan(a))})[0];
		
		//return Arr.sort(function(a, b){return (Math.cos(b) - Math.sin(a))})[0];
		//return Arr.sort(function(a, b){return hamming_distance(a, b); })[0];
		//return Arr.sort(function(a, b){return (-(a ^ b)) })[0];;
		//return Arr.sort(function(a, b){return Math.sin(b - a); })[0];
		
		//return Arr.sort(function(a, b){return Math.cos(b) - Math.sin(a); })[0];

		//return Arr.sort(function(a, b){return Math.sin(b) + Math.sin(a); })[0];
		//return Arr.sort(function(a, b){return Math.cos(b) + Math.cos(a); })[0];
		//return Arr.sort(function(a, b){return Math.tan(b) + Math.tan(a); })[0];
		
		//Arr = Arr.map(function(num) { return  Math.exp(num); });
		/*var sum = Arr.reduce(function(a, b) { return a+b; });
		return Math.log (sum);*
	}

	function Sum1 (Arr) {
		if ((arguments.length > 1) && (typeof Arr == 'number')) Arr = [].slice.call(arguments);
		return Arr.reduce(function(a, b) { return (a ^ b) | b; });
	}
	


	function Max0(Arr) {
		if ((arguments.length > 1) && (typeof Arr == 'number')) Arr = [].slice.call(arguments);
		Arr = Arr.sort(function(a, b){return b - a; });
		var max = Arr.reduce(function(a, b) {
			return a + b;
		});
		//var min = Arr.pop();
		//var max = Arr[0];
		/*function M (F) {
			switch (F) {
				case 0:  return (max + min) | max;
				case 1:  return (max + min) | min;
				case 2:  return (max - min) | max;
				case 3:  return (max - min) | min;

				case 4:  return (max + min) ^ max;
				case 5:  return (max + min) ^ min;
				case 6:  return (max - min) ^ max;
				case 7:  return (max - min) ^ min;
				
				case 8:  return (max + min) & max;
				case 9:  return (max + min) & min;
				case 10:  return (max - min) & max;
				case 11:  return (max - min) & min;

				case 12:  return (max - min);
				case 13:  return (max + min);
				case 14:  return (max * min);
				
			}	
		}*/
		/*var F = 30;
		var N = 15;
		if ((F >= 0) &&(F < N)) return M (F);
		else if ((F >= N) && (F < N * 2)) return Byte(M(F - N));
		else if ((F >= 2 * N) && (F < N * 3)) return Byte1(M(F - N * 2));*/
		return Byte1(max);
	}

