function Neighbours(F) { //F = Max == Dilate, F = Min == Erode   
	DATA ();
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

function Neighbours1(F) {
	DATA ();
	var r = 0, g = 0, b = 0;
	
	for (y = 1; y < h - 1; y++) {
		for (x = 1; x < w - 1; x++) {
			i = (x + y * w) * 4;
			r = 0; g = 0; b = 0;
			for (y1 = y - 1; y1 <= y + 1; y1++) {
				if (y1 < 0) continue;
				for (x1 = x - 1; x1 <= x + 1; x1++) {
					if (x1 < 0) continue;
					i1 = (x1 + y1 * w) * 4;
					if ((Manhattan(x, x1, y, y1) == 0) && (d < 0)) continue;
					if ((Manhattan(x, x1, y, y1) != Math.abs(d)) && (Math.abs(d) <= 2)) continue; 
					
					r = F(r, data3[i1 + 0]);
					g = F(g, data3[i1 + 1]);
					b = F(b, data3[i1 + 2]);
				}
			}

			data2[i + 0] = r; // red
			data2[i + 1] = g; // green
			data2[i + 2] = b; // blue
			
			r = 0; g = 0; b = 0;

		}
	}
	ctx.putImageData(imageData2, 0, 0);
}


function Neighbours2(F1) {
	DATA();
	
	var r = 0, g = 0, b = 0;
	var L, L1 = 0, L2 = 0, L3 = 0, r1 = 0, g1 = 0, b1 = 0;

	for (var x = 1; x < w; x++) {
		for (var y = 1; y < h; y++) {

			i1 = (x + y * w) * 4;

			L1 = 0; L2 = 0; L3 = 0;
			r1 = 0; g1 = 0; b1 = 0;
			
			i1 = (x + y * w) * 4;
			r =  data3[i1 + 0];
			g =  data3[i1 + 1];
			b =  data3[i1 + 2];
			
			for (x1 = x - 1; x1 < x + 2; x1++) {
				if (x1 < 0) continue;
				for (y1 = y - 1; y1 < y + 2; y1++) {
					if (y1 < 0)  continue;
					if ((Manhattan(x, x1, y, y1) == 0) && (d < 0)) continue;
					if ((Manhattan(x, x1, y, y1) != Math.abs(d)) && (Math.abs(d) <= 2)) continue; 
					
					i = (x1 + y1 * w) * 4;
					
					L = F1(r, data3[i])
					if (L > L1) {
						r1 = data3[i];
						L1 = L;
					}

					L = F1(g, data3[i + 1])
					if (L > L2) {
						g1 = data3[i + 1];
						L2 = L;
					}
					
					L = F1(b, data3[i + 2]);
					if (L > L3) {
						b1 = data3[i + 2];
						L3 = L;
					}

				}
			}

			data2[i1] = r1; // red
			data2[i1 + 1] = g1; // green
			data2[i1 + 2] = b1; // blue

		}
	}
	ctx.putImageData(imageData2, 0, 0);
}

        function Neighbours31(F)
        {
			DATA();
			var matrixSize = 3;
            var filterOffset = (matrixSize - 1) / 2;
            var calcOffset = 0;

            var byteOffset = 0;
			var Stride = w * 4;
            var r = 0, g = 0, b = 0;

            for (var offsetY = filterOffset; offsetY <
                h - filterOffset; offsetY++)
            {
                for (var offsetX = filterOffset; offsetX <
                    w - filterOffset; offsetX++)
                {
                    byteOffset = offsetY *
                                 Stride +
                                 offsetX * 4;

                    r = 0; g = 0; b = 0;

                    for (var filterY = -filterOffset;
                        filterY <= filterOffset; filterY++)
                    {
						if (offsetY + filterY < 0) continue;
                        for (var filterX = -filterOffset;
                            filterX <= filterOffset; filterX++)
                        {
							if (offsetX + filterX < 0) continue;
							if ((Manhattan(offsetX, offsetX + filterX, offsetY, offsetY + filterY) == 0) && (d < 0)) continue;
							if ((Manhattan(offsetX, offsetX + filterX, offsetY, offsetY + filterY) != Math.abs(d)) && (Math.abs(d) <= 2)) continue; 

                            calcOffset = byteOffset +
                                         (filterX * 4) +
                                         (filterY * Stride);

                            r = F(r, data3[calcOffset + 0])
                            g = F(g, data3[calcOffset + 1]);
                            b = F(b, data3[calcOffset + 2])
                        }
                    }

                    data2[byteOffset + 0] = Byte1(r);
                    data2[byteOffset + 1] = Byte1(g);
                    data2[byteOffset + 2] = Byte1(b);
                    data2[byteOffset + 3] = 255;
                }
            }
			ctx.putImageData(imageData2, 0, 0);        
		}

        function Neighbours41(F)
        {
			DATA();
			var matrixSize = 3;
            var filterOffset = (matrixSize - 1) / 2;
            var calcOffset = 0;

            var byteOffset = 0;
			var Stride = w * 4;
            var r = [], g = [], b = [];

            for (var offsetY = filterOffset; offsetY <
                h - filterOffset; offsetY++)
            {
                for (var offsetX = filterOffset; offsetX <
                    w - filterOffset; offsetX++)
                {
                    byteOffset = offsetY *
                                 Stride +
                                 offsetX * 4;

                    r = []; g = []; b = [];

                    for (var filterY = -filterOffset;
                        filterY <= filterOffset; filterY++)
                    {
						if (offsetY + filterY < 0) continue;
                        for (var filterX = -filterOffset;
                            filterX <= filterOffset; filterX++)
                        {
							if (offsetX + filterX < 0) continue;
							if ((Manhattan(offsetX, offsetX + filterX, offsetY, offsetY + filterY) == 0) && (d < 0)) continue;
							if ((Manhattan(offsetX, offsetX + filterX, offsetY, offsetY + filterY) != Math.abs(d)) && (Math.abs(d) <= 2)) continue; 

                            calcOffset = byteOffset +
                                         (filterX * 4) +
                                         (filterY * Stride);

							r.push(data3[calcOffset + 0]);
							g.push(data3[calcOffset + 1]);
							b.push(data3[calcOffset + 2]);
                        }
                    }

                    data2[byteOffset + 0] = Byte1(F(r));
                    data2[byteOffset + 1] = Byte1(F(g));
                    data2[byteOffset + 2] = Byte1(F(b));
                    data2[byteOffset + 3] = 255;
                }
            }
			ctx.putImageData(imageData2, 0, 0);        
		}
        
		function Neighbours32(F)
        {
			DATA();
			var meanSize = 2;
            var b = 0, g = 0, r = 0;
            var imageStride = w * 4;
            var filterOffset = meanSize / 2;
            var calcOffset = 0, filterY = 0, filterX = 0;

            for (var k = 0; k + 4 < data3.length; k += 4)
            {
                b = 0; g = 0; r = 0;
                filterY = -filterOffset;
                filterX = -filterOffset;

                while (filterY <= filterOffset)
                {
                    calcOffset = k + (filterX * 4) +
                    (filterY * imageStride);

                    if (calcOffset > 0 &&
                        calcOffset + 4 < data3.length) {
						r = F(r, data3[calcOffset]);
						g = F(g, data3[calcOffset + 1]);
						b  = F(b, data3[calcOffset + 2]);
                    }
                    
                    filterX++;

                    if (filterX > filterOffset)
                    { filterX = -filterOffset; filterY++; }
                }

				data2[k + 0] = Byte(r);
                data2[k + 1] = Byte(g);
                data2[k + 2] = Byte(b);
                data2[k + 3] = 255;
            }

            ctx.putImageData(imageData2, 0, 0);
        }
		
		function Neighbours42(F)
        {
			DATA();
			var meanSize = 2;
            var b = [], g = [], r = [];
            var imageStride = w * 4;
            var filterOffset = meanSize / 2;
            var calcOffset = 0, filterY = 0, filterX = 0;

            for (var k = 0; k + 4 < data3.length; k += 4)
            {
                b = []; g = []; r = [];
                filterY = -filterOffset;
                filterX = -filterOffset;

                while (filterY <= filterOffset)
                {
                    calcOffset = k + (filterX * 4) +
                    (filterY * imageStride);

                    if (calcOffset > 0 &&
                        calcOffset + 4 < data3.length) {
						
						r.push(data3[calcOffset]);
						g.push(data3[calcOffset + 1]);
						b.push(data3[calcOffset + 2]);
                    }
                    
                    filterX++;

                    if (filterX > filterOffset)
                    { filterX = -filterOffset; filterY++; }
                }

				data2[k + 0] = Byte(F(r));
                data2[k + 1] = Byte(F(g));
                data2[k + 2] = Byte(F(b));
                data2[k + 3] = 255;
            }

            ctx.putImageData(imageData2, 0, 0);
        }

		
		function Neighbours5(F1)
        {
			DATA();
			var matrixSize = 3;
            var filterOffset = (matrixSize - 1) / 2;
            var i = 0;

            var byteOffset = 0;
			var Stride = w * 4;
            var L1 = 0, L2 = 0, L3 = 0, r1 = 0, g1 = 0, b1 = 0;

            for (var offsetY = filterOffset; offsetY <
                h - filterOffset; offsetY++)
            {
                for (var offsetX = filterOffset; offsetX <
                    w - filterOffset; offsetX++)
                {
                    byteOffset = offsetY *
                                 Stride +
                                 offsetX * 4;

                    r = []; g = []; b = [];

					L1 = -Infinity; L2 = -Infinity; L3 = -Infinity;
					r1 = 0; g1 = 0; b1 = 0;
				
					r =  data3[byteOffset + 0];
					g =  data3[byteOffset + 1];
					b =  data3[byteOffset + 2];

					
                    for (var filterY = -filterOffset;
                        filterY <= filterOffset; filterY++)
                    {
                        if (offsetY + filterY < 0) continue;
						for (var filterX = -filterOffset;
                            filterX <= filterOffset; filterX++)
                        {
							if (offsetX + filterX < 0) continue;
							if ((Manhattan(offsetX, offsetX + filterX, offsetY, offsetY + filterY) == 0) && (d < 0)) continue;
							if ((Manhattan(offsetX, offsetX + filterX, offsetY, offsetY + filterY) != Math.abs(d)) && (Math.abs(d) <= 2)) continue; 

                            i = byteOffset +
                                         (filterX * 4) +
                                         (filterY * Stride);

							
							if (F1(r, data3[i]) > L1) {
								r1 = data3[i];
								L1 = F1(r, data3[i]);
							}

							if (F1(g, data3[i + 1]) > L2) {
								g1 = data3[i + 1];
								L2 = F1(g, data3[i + 1]);
							}
							
							if (F1(b, data3[i + 2]) > L3) {
								b1 = data3[i + 2];
								L3 = F1(b, data3[i + 2]);
							}

                        }
                    }

                    data2[byteOffset + 0] = Byte1(r1);
                    data2[byteOffset + 1] = Byte1(g1);
                    data2[byteOffset + 2] = Byte1(b1);
                    data2[byteOffset + 3] = 255;
                }
            }
			ctx.putImageData(imageData2, 0, 0);        
		}

		
function Morph_Grad() {
			DATA();
            var calcOffset, byteOffset;
            var minBlue, minGreen, minRed;
            var maxBlue, maxGreen, maxRed;
			var avgBlue, avgGreen, avgRed;
			var r1, g1, b1;
            for (var y = 1; y < h - 1; y++)
            {
                for (var x = 1; x < w - 1; x++)
                {
                    byteOffset = (x + y * w) * 4;

                    minBlue = 255; minGreen = 255; minRed = 255;
                    maxBlue = 0; maxGreen = 0; maxRed = 0;
					avgBlue = 0; avgGreen = 0; avgRed = 0;        
					r1 = data3[byteOffset + 0]; g1 = data3[byteOffset + 1]; b1 = data3[byteOffset + 2]
					for (var y1 = -1; y1 <= 1; y1++)
                    {
                        for (var x1 = -1; x1 <= 1; x1++)
                        {
                            var calcOffset = byteOffset + (x1 + y1 * w) * 4;

                            minRed = Math.min(data3[calcOffset + 0], minRed);
                            maxRed = Math.max(data3[calcOffset + 0], maxRed);
							avgRed += data3[calcOffset + 0];
							
							minGreen = Math.min(data3[calcOffset + 1], minGreen);
                            maxGreen = Math.max(data3[calcOffset + 1], maxGreen);
							avgGreen += data3[calcOffset + 1];
							
							minBlue = Math.min(data3[calcOffset + 2], minBlue);
                            maxBlue = Math.max(data3[calcOffset + 2], maxBlue);
							avgBlue += data3[calcOffset + 2];

                        }
                    }

					

			//Dilate 
			/*data2[byteOffset + 0] = maxRed; // red 
			data2[byteOffset + 1] = maxGreen; // green 
			data2[byteOffset + 2] = maxBlue; // blue*/
			 
			 //Erode
			/*data2[byteOffset + 0] = minRed; // red 
			data2[byteOffset + 1] = minGreen; // green 
			data2[byteOffset + 2] = minBlue; // blue*/

			 //Morphological Gradient
			 /*data2[byteOffset + 0] = maxRed - minRed; // red 
			 data2[byteOffset + 1] = maxGreen - minGreen; // green 
			 data2[byteOffset + 2] = maxBlue - minBlue; // blue*/
			 
			 /*data2[byteOffset + 0] = (maxRed - r1); // red 
			 data2[byteOffset + 1] = (maxGreen - g1); // green 
			 data2[byteOffset + 2] = (maxBlue - b1); // blue*/

			
			 /*data2[byteOffset + 0] = r1 - minRed; // red 
			 data2[byteOffset + 1] = g1 - minGreen; // green 
			 data2[byteOffset + 2] = b1 - minBlue; // blue*/
			 
			 
			/*data2[byteOffset + 0] = Byte1(maxRed - avgRed / 9); // red 
			data2[byteOffset + 1] = Byte1(maxGreen - avgGreen / 9); // green 
			data2[byteOffset + 2] = Byte1(maxBlue - avgBlue / 9); // blue*/
			
			//2

			
		}
	}
	ctx.putImageData(imageData2, 0, 0);
}

