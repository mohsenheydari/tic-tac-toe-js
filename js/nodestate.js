'use strict';

define(function () {
	
   class NodeState
    {
		constructor() {
			this.visits = 0;
			this.wins   = 0.0;
			this.player = 1;
			this.board  = null; //Game board class
			this.action = null; //Action which led to this state
		}
		
		clone() {
			return Object.create(this);
		}
		
        get isTerminal() {
			return this.board.status !== this.board.IN_PROGRESS;
        }
		
		get nextPlayer() {
			return 3 - this.player;
		}

		// Get possible actions for given player
        getPossibleActions(player) {
            return this.board.getPossibleActions(player);
        }

        getRandomAction(player) {
            let actions = this.getPossibleActions(player);
            
            if (actions.length < 1) {
                return null;
            }
			
			let i = Math.floor(Math.random() * actions.length);
            return actions[i];
        }

		applyAction(action) {
            this.board.applyAction(action);
            this.action = action;
        }
		
        switchToNextPlayer() {
            this.player = this.nextPlayer;
        }

    }
	
	return NodeState;
});