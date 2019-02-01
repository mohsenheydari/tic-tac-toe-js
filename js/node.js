'use strict';

define(['arrayutils', 'nodestate'], function (arrayUtils, NodeState) {
	
	// MCTS Tree Node
	class Node {
		
		constructor() {
			this.parent   = null;
			this.state    = null;
			this.children = [];
			this.actions  = [];
		}

        get isFullyExpanded() {
			return this.children.length > 0 && this.children.length == this.actions.length;
        }

        get childWithMostVisits() {
            let child = this.children.reduce( (x, y) => {
				if(x.state.visits > y.state.visits) {
					return x;
				}
				
				return y;
			});
			
			return child;
        }

        expand() {
			// Sanity check
            if (this.isFullyExpanded) return null; 
			
            let player = this.state.nextPlayer;

            if (this.actions.length === 0) {
				
                this.actions = this.state.getPossibleActions(player);
				// Shuffle possible actions
				arrayUtils.shuffle(this.actions); 
            }
			
			//Create new node with same state and apply new action to it
            let newAction = this.actions[this.children.length];
            let child     = new Node();
			child.state   = new NodeState();
			child.parent  = this;
            child.state.player = player;
			child.state.board  = this.state.board.clone();
			child.state.applyAction(newAction);
			
            // add to children list
            this.children.push(child);

            return child;
        }
    }
	
	return Node;
});