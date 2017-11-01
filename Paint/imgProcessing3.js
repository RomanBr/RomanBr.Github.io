		function Neighbours6(F2)
        {
			DATA();
			var matrixSize = 3;
            var filterOffset = (matrixSize - 1) / 2;
            var calcOffset = 0;

            var byteOffset = 0;
			var Stride = w * 4;
            var r = 0, g = 0, b = 0;
            var r1 = 0, g1 = 0, b1 = 0;
			var L = 0, lMax = 0;
			
			//F2 = 
            for (var offsetY = filterOffset; offsetY <
                h - filterOffset; offsetY++)
            {
                for (var offsetX = filterOffset; offsetX <
                    w - filterOffset; offsetX++)
                {
                    byteOffset = offsetY *
                                 Stride +
                                 offsetX * 4;
					lMax = 0;
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

							r = data3[calcOffset + 0];
							g = data3[calcOffset + 1];
							b = data3[calcOffset + 2];
							//L = RGB(r, g, b); //
							L = F2([r, g, b]);
							//L = Math.min(r, g, b); 
							//L = Math.sin(L);
							if (L >= lMax) {
								lMax = L;
								r1 = r;
								g1 = g;
								b1 = b;
							}
							
                        }
                    }

                    data2[byteOffset + 0] = r1;
                    data2[byteOffset + 1] = g1;
                    data2[byteOffset + 2] = b1;
                    data2[byteOffset + 3] = 255;
                }
            }
			ctx.putImageData(imageData2, 0, 0);        
		}

		
		function Neighbours7(F)
        {
			DATA();
			var matrixSize = 3;
            var filterOffset = (matrixSize - 1) / 2;
            var calcOffset = 0;

            var byteOffset = 0;
			var Stride = w * 4;
            var r = 0, g = 0, b = 0;
            var r1 = 0, g1 = 0, b1 = 0;
            var r2 = 0, g2 = 0, b2 = 0;
			var L1 = -Infinity, L2 = 0;
            for (var offsetY = filterOffset; offsetY <
                h - filterOffset; offsetY++)
            {
                for (var offsetX = filterOffset; offsetX <

				w - filterOffset; offsetX++)
                {
                    byteOffset = offsetY *
                                 Stride +
                                 offsetX * 4;
					L2 = 0;
					r1 = 0; g1 = 0; b1 = 0;
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

							r = data3[calcOffset + 0];
							g = data3[calcOffset + 1];
							b = data3[calcOffset + 2];
							L1 = F (r, r1, g, g1, b, b1);
							if (L1 > L2) {
								L2 = L1;
								r2 = r;
								g2 = g;
								b2 = b;
							}
							r1 = r; g1 = g; b1 = b;
							
                        }
                    }

                    data2[byteOffset + 0] = r2;
                    data2[byteOffset + 1] = g2;
                    data2[byteOffset + 2] = b2;
                    data2[byteOffset + 3] = 255;
                }
            }
			ctx.putImageData(imageData2, 0, 0);        
		}

		function Neighbours61(F)
        {
			DATA();
			var matrixSize = 3;
            var filterOffset = (matrixSize - 1) / 2;
            var calcOffset = 0;

            var byteOffset = 0;
			var Stride = w * 4;
            var r = 0, g = 0, b = 0;
            var r1 = 0, g1 = 0, b1 = 0;
            var r2 = 0, g2 = 0, b2 = 0;
			var L1 = 0, L2 = 0;
            var F = HMDistMax; //cntZeros; //byteLen;
			
			for (var offsetY = filterOffset; offsetY <
                h - filterOffset; offsetY++)
            {
                for (var offsetX = filterOffset; offsetX <
                    w - filterOffset; offsetX++)
                {
                    byteOffset = offsetY *
                                 Stride +
                                 offsetX * 4;
					L2 = 0;
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

							r = data3[calcOffset + 0];
							g = data3[calcOffset + 1];
							b = data3[calcOffset + 2];
							//L1 = RGB(r, g, b);
							//L1 = cntBytes(cntBytes(cntBytes(RGB(r, g, b))));
							//L1 = cntZeros(cntZeros(RGB(r, g, b)));
							//hamming_distance(hamming_distance(g, b),hamming_distance(r, g)));
							//L1 = (F(r, r1, g, g1, b, b1) + F(r, 0, g, 0, b, 0));
							//L1 = F(r1, r, g1, g, b1, b); 
							//F(r, 0, g, 0, b, 0);
							

							L1 = F([r, g, b]); 
							
							//L1 = Math.max(F(r), F(g), F(b)); 
							
							//L1 = Math.min(r, g, b); 
							//L1 = Math.sin(L1);
							if (L1 >= L2) {
								L2 = L1;
								r2 = r;
								g2 = g;
								b2 = b;
							}
							
                        }
                    }

                    data2[byteOffset + 0] = r2;
                    data2[byteOffset + 1] = g2;
                    data2[byteOffset + 2] = b2;
                    data2[byteOffset + 3] = 255;
                }
            }
			ctx.putImageData(imageData2, 0, 0);        
		}
