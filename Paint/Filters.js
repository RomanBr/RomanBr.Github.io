        function GetBooleanEdgeMasks()
        {
            var edgeMasks = []

            edgeMasks.push("011011011");
            edgeMasks.push("000111111");
            edgeMasks.push("110110110");
            edgeMasks.push("111111000");
            edgeMasks.push("011011001");
            edgeMasks.push("100110110");
            edgeMasks.push("111011000");
            edgeMasks.push("111110000");
            edgeMasks.push("111011001");
            edgeMasks.push("100110111");
            edgeMasks.push("001011111");
            edgeMasks.push("111110100");
            edgeMasks.push("000011111");
            edgeMasks.push("000110111");
            edgeMasks.push("001011011");
            edgeMasks.push("110110100");

            return edgeMasks;
        }

        function BooleanEdgeDetectionFilter(edgeFactor)
        {
			DATA();
			var edgeMasks = GetBooleanEdgeMasks();
			var imageStride = w * 4;
            var matrixMean = 0, pixelTotal = 0;
            var filterY = 0, filterX = 0, calcOffset = 0;
            var matrixPatern = "";

            for (var k = 0; k < data3.length; k += 4)
            {
                matrixPatern = '';
                matrixMean = 0; pixelTotal = 0;
                filterY = -1; filterX = -1;

                while (filterY < 2)
                {
                    calcOffset = k + (filterX * 4) +
                    (filterY * imageStride);

                    calcOffset = (calcOffset < 0 ? 0 :
                    (calcOffset >= data3.Length - 2 ?
                    data3.length - 3 : calcOffset));

                    matrixMean += data3[calcOffset];
                    matrixMean += data3[calcOffset + 1];
                    matrixMean += data3[calcOffset + 2];

                    filterX += 1;

                    if (filterX > 1)
                    { filterX = -1; filterY += 1; }
                }

                matrixMean = matrixMean / 9;
                filterY = -1; filterX = -1;

                while (filterY < 2)
                {
                    calcOffset = k + (filterX * 4) +
                    (filterY * imageStride);

                    calcOffset = (calcOffset < 0 ? 0 :
                    (calcOffset >= data3.length - 2 ?
                    data3.length - 3 : calcOffset));

                    pixelTotal = data3[calcOffset];
                    pixelTotal += data3[calcOffset + 1];
                    pixelTotal += data3[calcOffset + 2];

                    matrixPatern += (pixelTotal > matrixMean
                                                 ? "1" : "0");
                    filterX += 1;

                    if (filterX > 1)
                    { filterX = -1; filterY += 1; }
                }

                if (edgeMasks.includes(matrixPatern))
                {
					data2[k] = Byte1(data2[k] * edgeFactor);
                    data2[k + 1] = Byte1(data2[k + 1] * edgeFactor);
                    data2[k + 2] = Byte1(data2[k + 2] * edgeFactor);
                }
            }

			ctx.putImageData(imageData2, 0, 0);
        }


function Kuwahara() {
	DATA();
    d = 1 + Math.abs(d);
	var P = 0, P1 = 0;
	var Size = 2;
    var ApetureMinX = [ -(Size / 2), 0, -(Size / 2), 0 ];
    var ApetureMaxX = [ 0, (Size / 2), 0, (Size / 2) ];
    var ApetureMinY = [ -(Size / 2), -(Size / 2), 0, 0 ];
    var ApetureMaxY = [ 0, 0, (Size / 2), (Size / 2) ];
    for (var x = 0; x < w; ++x)
    {
		for (var y = 0; y < h; ++y)
        {
			var RValues = [ 0, 0, 0, 0 ];
            var GValues = [ 0, 0, 0, 0 ];
            var BValues = [ 0, 0, 0, 0 ];
            var NumPixels = [ 0, 0, 0, 0 ];
            var MaxRValue = [ 0, 0, 0, 0 ];
            var MaxGValue = [ 0, 0, 0, 0 ];
            var MaxBValue = [ 0, 0, 0, 0 ];
            var MinRValue = [ 255, 255, 255, 255 ];
            var MinGValue = [ 255, 255, 255, 255 ];
            var MinBValue = [ 255, 255, 255, 255 ];
            P = (x + y * w) * 4;

                    for (var i = 0; i < d; ++i)
                    {
                        for (var x2 = ApetureMinX[i] + 1; x2 <= ApetureMaxX[i]; ++x2)
                        {
                            var TempX = x + x2;
                            if (TempX >= 0 && TempX < w)
                            {
                                for (var y2 = ApetureMinY[i] + 1; y2 <= ApetureMaxY[i]; ++y2)
                                {
                                    var TempY = y + y2;
                                    if (TempY >= 0 && TempY < h)
                                    {
                                        P1 = ((x + x2) + (y + y2) * w) * 4;
                                        //Color TempColor = Image.GetPixel(TempX, TempY);

                                        var TempColorR = data3[P1 + 0];
                                        var TempColorG = data3[P1 + 1];
                                        var TempColorB = data3[P1 + 2];

                                        //Color TempColor = TempBitmap.GetPixel(TempX, TempY);
                                        //Color A = Color.FromArgb(bt[P1 + 2], bt[P1 + 1], bt[P1 + 0]);
                                        //if (TempColor.R == TempColorB) MessageBox.Show("NO");

                                        RValues[i] += TempColorR;
                                        GValues[i] += TempColorG;
                                        BValues[i] += TempColorB;
                                        if (TempColorR > MaxRValue[i]) MaxRValue[i] = TempColorR;
                                        else if (TempColorR < MinRValue[i]) MinRValue[i] = TempColorR;


                                        if (TempColorG > MaxGValue[i]) MaxGValue[i] = TempColorG;
                                        else if (TempColorG < MinGValue[i]) MinGValue[i] = TempColorG;

                                        if (TempColorB > MaxBValue[i]) MaxBValue[i] = TempColorB;
                                        else if (TempColorB < MinBValue[i]) MinBValue[i] = TempColorB;
                                        ++NumPixels[i];
                                    }
                                }
                            }
                        }
                    }
                    var j = 0;
                    var MinDifference = 10000;
                    for (var i = 0; i < d; ++i)
                    {
                        var CurrentDifference = (MaxRValue[i] - MinRValue[i]) + (MaxGValue[i] - MinGValue[i]) + (MaxBValue[i] - MinBValue[i]);
                        if (CurrentDifference < MinDifference && NumPixels[i] > 0)
                        {
                            j = i;
                            MinDifference = CurrentDifference;
                        }
                    }


                    /*Color MeanPixel = Color.FromArgb(RValues[j] / NumPixels[j],
                        GValues[j] / NumPixels[j],
                        BValues[j] / NumPixels[j]);*/

                    data2[P + 0] = Byte1(RValues[j] / NumPixels[j]);
                    data2[P + 1] = Byte1(GValues[j] / NumPixels[j]);
                    data2[P + 2] = Byte1(BValues[j] / NumPixels[j]);

                    //NewBitmap.SetPixel(x, y, MeanPixel);
                }
            }
		ctx.putImageData(imageData2, 0, 0);
}


        function AverageColoursFilter()
        {
			DATA();
			var matrixSize = 3;
            var filterOffset = (matrixSize - 1) / 2;
            var calcOffset = 0;

            var byteOffset = 0;
			var Stride = w * 4;
            var blue = 0;
            var green = 0;
            var red = 0;

            for (var offsetY = filterOffset; offsetY <
                h - filterOffset; offsetY++)
            {
                for (var offsetX = filterOffset; offsetX <
                    w - filterOffset; offsetX++)
                {
                    byteOffset = offsetY *
                                 Stride +
                                 offsetX * 4;

                    blue = 0;
                    green = 0;
                    red = 0;

                    for (var filterY = -filterOffset;
                        filterY <= filterOffset; filterY++)
                    {
                        for (var filterX = -filterOffset;
                            filterX <= filterOffset; filterX++)
                        {

                            calcOffset = byteOffset +
                                         (filterX * 4) +
                                         (filterY * Stride);

                            blue += data3[calcOffset + 2];
                            green += data3[calcOffset + 1];
                            red += data3[calcOffset + 0];
                        }
                    }

                    blue = blue / matrixSize;
                    green = green / matrixSize;
                    red = red / matrixSize;

                    data2[byteOffset + 2] = Byte1(blue);
                    data2[byteOffset + 1] = Byte1(green);
                    data2[byteOffset + 0] = Byte1(red);
                    data2[byteOffset + 3] = 255;
                }
            }
			ctx.putImageData(imageData2, 0, 0);        
		}

		
        function SNNBlur()
        {
			DATA();
			var Size = 2;
            var ApetureMinX = -(Size / 2);
            var ApetureMaxX = (Size / 2);
            var ApetureMinY = -(Size / 2);
            var ApetureMaxY = (Size / 2);
            var i = 0, i0 = 0;
			for (var x = 0; x < w; ++x)
            {
                for (var y = 0; y < h; ++y)
                {
                    i0 = (x + y * w) * 4
					var RValue = 0;
                    var GValue = 0;
                    var BValue = 0;
                    var NumPixels = 0;
					
                    for (var x2 = ApetureMinX; x2 < ApetureMaxX; ++x2)
                    {
                        var TempX1 = x + x2;
                        var TempX2 = x - x2;
                        if (TempX1 >= 0 && TempX1 < w && TempX2 >= 0 && TempX2 < w)
                        {
                            for (var y2 = ApetureMinY; y2 < ApetureMaxY; ++y2)
                            {
                                var TempY1 = y + y2;
                                var TempY2 = y - y2;
                                if (TempY1 >= 0 && TempY1 < h && TempY2 >= 0 && TempY2 < h)
                                {
                                    var TempColor = (x + y * w) * 4;
                                    var TempColor2 = (TempX1 + TempY1 * w) * 4;
                                    var TempColor3 = (TempX2 + TempY2 * w) * 4;
                                    if (Distance1(data3[TempColor], data3[TempColor2], data3[TempColor+1], data3[TempColor2+1], data3[TempColor+2], data3[TempColor2+2]) <
                                        
										Distance1(data3[TempColor], data3[TempColor3], data3[TempColor+1], data3[TempColor3+1],data3[ TempColor+2], data3[TempColor3+2]))
                                    {
                                        i = (TempX1 + TempY1 * w) * 4;
										RValue += data3[i + 0];
                                        GValue += data3[i + 1];
                                        BValue += data3[i + 2];
                                    }
                                    else
                                    {
                                        i = (TempX2 + TempY2 * w) * 4;
										RValue += data3[i + 0];
                                        GValue += data3[i + 1];
                                        BValue += data3[i + 2];
                                    }
                                    ++NumPixels;
                                }
                            }
                        }
                    }
                    NumPixels-=2;
					data2[i0 + 0] = (RValue / NumPixels);
                    data2[i0 + 1] = (GValue / NumPixels);
                    data2[i0 + 2] = (BValue / NumPixels);
                }
            }
            
            ctx.putImageData(imageData2, 0, 0);
        }
		
		function Prewitt()
        {
			DATA();
            var T = 255;
			
			var gx = [ [ 1, 0, -1 ], [ 2, 0, -2 ], [ 1, 0, -1 ] ];   //  The matrix Gx //Sobel1
			//var gy = [ [ 1, 2, 1 ], [ 0, 0, 0 ], [ -1, -2, -1 ] ];  //  The matrix Gy
			var gy = [ [ -1, -2, -1 ], [ 0, 0, 0 ], [ 1, 2, 1 ] ];  //  The matrix Gy
		
			//var gx = [ [ 3, 0, -3 ], [ 10, 0, -10 ], [ 3, 0, -3 ] ];   //  The matrix Gx //Scharr
			//var gy = [ [ 3, 10, 3 ], [ 0, 0, 0 ], [ -3, -10, -3 ] ];  //  The matrix Gy

			//var gx = [ [ 1, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, -1] ];   //  The matrix Gx //Roberts 
			//var gy = [ [ 0, 0, 1], [ 0, 0, 0], [ -1, 0, 0 ] ];  //  The matrix Gy
			
			//var gx = [ [ -1, 0, 1], [ -1, 0, 1], [ -1, 0, 1 ] ];  //  The matrix Gx //Prewitt
			//var gy = [ [ 1, 1, 1 ], [ 0, 0, 0 ], [ -1, -1, -1] ]; //  The matrix Gy 
			//var gy = [ [ -1, -1, -1 ], [ 0, 0, 0 ], [ 1, 1, 1] ]; //  The matrix Gy 
			
			var i1, i2; 

			var s = Math.floor(gx.length/2);
			//alert (s);
			//return;
			
			var new_x = 0, new_y = 0;
            var r,g,b,c, cM;
            for (y = s; y < h - s; y++)   // loop for the image pixels height
            {
                for (x = s; x < w - s; x++) // loop for image pixels width    
                {
                    new_x = 0; new_y = 0;
					cM = 255;
					i1 = (x + y * w) * 4;
                    for (var hw = -s; hw <= s; hw++)  //loop for cov matrix
                    {
                        for (var wi = -s; wi <= s; wi++)
                        {
							i2 = ((x+hw) + (y+wi) * w) * 4;

							r = data3[i2 + 0];
							g = data3[i2 + 1];
							b = data3[i2 + 2];

							//c = Col(0, r, g, b);
							c = RGB(r, g, b);
							new_x += gx[hw + s][wi + s] * c;
                            new_y += gy[hw + s][wi + s] * c; 
							
							/*new_x += gx[hw + s][wi + s] * c;
							new_y += gy[hw + s][wi + s] * c;*/
							
                        }
                    }
                    
                    var l = Math.sqrt(new_x * new_x + new_y * new_y);
                    //var l = Math.sqrt(new_x * new_x / 4 + new_y * new_y / 4);
					//var l = Math.sqrt(new_x * new_x / 2 + new_y * new_y / 2);
					//var l = Math.abs(new_x) + Math.abs(new_y);
					//var l = l / 273;
					if (l > 128) {
						data2[i1 + 0] = data3[i1 + 0]; // red
						data2[i1 + 1] = data3[i1 + 1]; // green
						data2[i1 + 2] = data3[i1 + 2]; // blue
					}

                    else {
						data2[i1 + 0] = 255-data3[i1 + 0]; // red
						data2[i1 + 1] = 255-data3[i1 + 1]; // green
						data2[i1 + 2] = 255-data3[i1 + 2]; // blue*/

						/*data2[i1 + 0] = T; // red
						data2[i1 + 1] = T; // green
						data2[i1 + 2] = T; // blue*/
					}

                }
            }
            ctx.putImageData(imageData2, 0, 0);   
        }

		
		function Ian()
        {
			DATA();
            var T = 255;
			var factor = 0;
			//var G = [ [ 1, 1, 1], [ 1, -8, 1], [ 1, 1, 1 ] ]; //Laplacian 3X3
 
			//var G = [[-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, 24, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1]]; //Laplacian 5X5
		 
			//var G = [[0, 0, -1, 0, 0], [0, -1, -2, -1, 0], [-1, -2, 16, -2, -1], [0, -1, -2, -1, 0], [0, 0, -1, 0, 0]];
			//Laplacian Of Gaussian 
			
			//var G = [ [ 1, 2, 1 ], [ 2, 4, 2 ], [ 1, 2, 1 ] ]; 
			//Gaussian3x3

			//var G = [ [ 2, 4, 5, 4, 2 ], [ 4, 9, 12, 9, 4 ], [ 5, 12, 15, 12, 5 ], [ 4, 9, 12, 9, 4 ], [ 2, 4, 5, 4, 2 ] ];
			//Gaussian5x5 Type1

			var G =	[ [ 1, 4, 6, 4, 1 ], [ 4, 16, 24, 16, 4 ], [ 6, 24, 36, 24, 6 ], [ 4, 16, 24, 16, 4 ], [ 1,  4, 6, 4, 1 ] ];
			//Gaussian5x5 Type2

			
			var factor = calcFactor(G);
			if (factor == 0) factor = 1;
			var i1, i2; 

			var s = Math.floor(G[0].length/2);
			//alert (f);
			//return;
			var new_XY = 0;
            var r,g,b,c, cM;
            for (y = s; y < h - s; y++)   // loop for the image pixels height
            {
                for (x = s; x < w - s; x++) // loop for image pixels width    
                {
                    new_XY = 0;
					i1 = (x + y * w) * 4;
                    for (var hw = -s; hw <= s; hw++)  //loop for cov matrix
                    {
                        for (var wi = -s; wi <= s; wi++)
                        {
							i2 = ((x+hw) + (y+wi) * w) * 4;

							r = data3[i2 + 0];
							g = data3[i2 + 1];
							b = data3[i2 + 2];

							c = Col(0, r, g, b);
							
							new_XY += G[hw + s][wi + s] * r;
							
                        }
                    }
                    
                    new_XY = new_XY / factor;
					var l = new_XY;
					//var l = Math.sqrt(new_XY * new_XY + new_XY * new_XY);
                    //var l = Math.sqrt(new_x * new_x / 4 + new_y * new_y / 4);
					//var l = Math.sqrt(new_x * new_x / 2 + new_y * new_y / 2);
					//var l = Math.abs(new_x) + Math.abs(new_y);
					//var l = l / 273;
					if (l > 128) {
						data2[i1 + 0] = data3[i1 + 0]; // red
						data2[i1 + 1] = data3[i1 + 1]; // green
						data2[i1 + 2] = data3[i1 + 2]; // blue
					}

                    else {
						data2[i1 + 0] = 255-data3[i1 + 0]; // red
						data2[i1 + 1] = 255-data3[i1 + 1]; // green
						data2[i1 + 2] = 255-data3[i1 + 2]; // blue*/

						/*data2[i1 + 0] = T; // red
						data2[i1 + 1] = T; // green
						data2[i1 + 2] = T; // blue
						
						/*data2[i1 + 0] = l; // red
						data2[i1 + 1] = l; // green
						data2[i1 + 2] = l; // blue*/
					}

                }
            }
            ctx.putImageData(imageData2, 0, 0);   
        }

		
		function calcFactor(G) {
			var sum = 0;
			var x,y;
			for (x = 0; x < G.length; x++) {
				for (y = 0; y < G[x].length; y++) {
					sum += G[x][y];
				}
			}
			return sum
		}