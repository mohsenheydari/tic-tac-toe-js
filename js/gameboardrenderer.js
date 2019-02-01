'use strict';

define(function () {
	
	class GmaeBoardRenderer{
		
		constructor(canvas, canvasSize){
			//Set class variables
			this.canvas 	     = canvas;
			this.ctx             = canvas.getContext('2d');
			this.canvas.width    = canvasSize;
			this.canvas.height   = canvasSize;
			this.cellSize        = Math.floor(canvasSize / 3);
			this.gridLineStyle   = "#D2D8D2"; 
			this.gridLineWidth   = 10;
			this.xStyle          = "#4ECDC4";
			this.oStyle 	     = "#FF6B6B";
			this.oLineWidth		 = 10; 
			this.xLineWidth      = this.oLineWidth;
			
			//Setup custom event for when player clicks on a cell
			this.handleClicks();
		}
		
		handleClicks(){
			let that = this;
			
			this.canvas.addEventListener('mouseup', function (event) {
				let canvasMousePosition = that.getRelativeCursorPosition(event);
				
				let ev = new CustomEvent(
					"cellClicked", 
					{
						detail: {
							cell: that.getCellIndex(canvasMousePosition)
						},
						bubbles: true,
						cancelable: true
					}
				);
				
				that.canvas.dispatchEvent(ev);
			});
		}
		
		render(boardState){
			this.clear();
			this.drawCells(boardState);
			this.drawGrid();
		}
		
		drawCells(boardState){
	
			boardState.forEach(function(el, i){
				let x = (i % 3) * this.cellSize;
				let y = Math.floor(i/3) * this.cellSize;

				if(el === 1){
					this.drawX(x, y);
				} else if(el === 2){
					this.drawO(x, y);
				}
			}, this);
			
		}
		
		drawX(x, y){
			this.ctx.lineWidth = 10;
			this.ctx.strokeStyle = this.xStyle;
			this.ctx.beginPath();
		  
			var offset = this.cellSize * 0.25;
			this.ctx.moveTo(x + offset, y + offset);
			this.ctx.lineTo(x + this.cellSize - offset, y + this.cellSize - offset);

			this.ctx.moveTo(x + offset, y + this.cellSize - offset);
			this.ctx.lineTo(x + this.cellSize - offset, y + offset);

			this.ctx.stroke();
		}
		
		drawO(x, y){
			let halfCellSize = (0.5 * this.cellSize);
			let centerX  = x + halfCellSize;
			let centerY  = y + halfCellSize;
			let radius   = (this.cellSize * 0.7) / 2;
			let endAngle = 2 * Math.PI;

			this.ctx.lineWidth   = this.oLineWidth;
			this.ctx.strokeStyle = this.oStyle;
			this.ctx.beginPath();
			this.ctx.arc(centerX, centerY, radius, 0, endAngle);
			this.ctx.stroke();
		}
		
		drawGrid(){
			let offset = 5;
			let lineLenght = this.canvas.width - offset;
			this.ctx.lineWidth = this.gridLineWidth;
			this.ctx.lineCap = 'round';
			this.ctx.strokeStyle = this.gridLineStyle;
			this.ctx.beginPath();

			//Horizontal lines 
			for (let y = 1;y <= 2;y++) {  
				this.ctx.moveTo(offset, y * this.cellSize);
				this.ctx.lineTo(lineLenght, y * this.cellSize);
			}

			//Vertical lines 
			for (let x = 1;x <= 2;x++) {
				this.ctx.moveTo(x * this.cellSize, offset);
				this.ctx.lineTo(x * this.cellSize, lineLenght);
			}

			this.ctx.stroke();
		}
		
		// clear entire canvas
		clear(){
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
		}
		
		getCellIndex(position){

			for (let x = 0;x < 3;x++) {
				for (let y = 0;y < 3;y++) {
					let xCordinate = x * this.cellSize;
					let yCordinate = y * this.cellSize;

					if (
					  position.x >= xCordinate && position.x <= xCordinate + this.cellSize &&
					  position.y >= yCordinate && position.y <= yCordinate + this.cellSize
					) {

						return y * 3 + x;

					}
				}
			}
			
		}
		
		getRelativeCursorPosition(event){
			var rect = this.canvas.getBoundingClientRect();

			return {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top
			}
		}
	}
	
	return GmaeBoardRenderer;
});