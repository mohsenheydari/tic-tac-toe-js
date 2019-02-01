'use strict';

define(['action'], function (Action) {
	
	class Board {
		
		
		//Const game states, could not find a way to make it static in RequireJS
		get IN_PROGRESS(){ return -1; }
		get DRAW(){ return 0; }
		
		clone() {
			let board = new Board();
			board.boardState = this.boardState.slice();
			return board;
		}
		
		constructor() {
			this.boardState = [0,0,0,0,0,0,0,0,0];
		}
		
		applyAction(action) {
			//Can't play on non-empty cell
			if(this.boardState[action.cell] !== 0){
				return -1;
			}
			
			this.boardState[action.cell] = action.player;
			
			return 0;
		}
		
		getPossibleActions(player) {
			let actions = [];

			for(let i=0; i<this.boardState.length; i++) {
				if(this.boardState[i] === 0) {
					let action = new Action(player, i);
					actions.push(action);
				}
			}
			
			return actions;
		}
		
		get moves() {
			let moves = 0;
			
			for(let i=0; i < 9; i++){
				if(this.boardState[i] !== 0){
					moves++;
				}
			}
			
			return moves;
		}
		
		get status() {
			//Check rows
			for(let y=0; y < 3; y++){
				let i = y * 3;
				if( this.boardState[i] !== 0 && this.boardState[i] === this.boardState[i+1] && this.boardState[i+1] === this.boardState[i+2] ){
					return this.boardState[i];
				}
			}
			//Check columns
			for(let x=0; x < 3; x++){
				if( this.boardState[x] !== 0 && this.boardState[x] === this.boardState[3+x] && this.boardState[3+x] === this.boardState[6+x] ){
					return this.boardState[x];
				}
			}
			
			//Check diagonals
			if( this.boardState[0] !== 0 && this.boardState[0] === this.boardState[4] && this.boardState[4] === this.boardState[8] ){
				return this.boardState[0];
			}
			if( this.boardState[2] !== 0 && this.boardState[2] === this.boardState[4] && this.boardState[4] === this.boardState[6] ){
				return this.boardState[2];
			}
			
			//Check for draw
			if(this.moves === 9){
				return this.DRAW;
			}

			return this.IN_PROGRESS;	
		}
	}
	
	return Board;
});