'use strict';

define(function () {
	
	class Action{
		constructor(player, cell) {
			this.player = player;
			this.cell   = cell;
		}
	}
	
	return Action;
});