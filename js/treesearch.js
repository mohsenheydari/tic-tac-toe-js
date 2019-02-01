'use strict';

define(['uct', 'nodestate', 'board', 'node'], function (UCT, NodeState, Board, Node) {
	
	class TreeSearch {
		
		constructor() {
			this.uct = new UCT(Math.sqrt(2));
		}
		
        findNextAction(board, player, iterations) {
            let root = new Node();
			root.state = new NodeState();
			root.state.board = board;
			root.state.player = 3 - player;//Opponent player is owner of root node
			
            for (let i=0; i < iterations; i++) {
                //1.Selection
                let node = this.selectPromisingChild(root);
				
                //2.Expansion
                if(!node.state.isTerminal && !node.isFullyExpanded) {
                    //Single node expansion
                    node = node.expand();
                }

				//3.Simulation
                let result = this.simulate(node);
  
				//4.Update
                this.backpropagate(node, result);
            }
            

			let winnerNode = root.childWithMostVisits;			
            return winnerNode.state.action;
        }

		
        selectPromisingChild(node) {
            while(!node.state.isTerminal && node.isFullyExpanded) {
                node = this.uct.findBestChild(node);
            }

            return node;
        }

        backpropagate(node, result) {
            let tmpNode = node;

            while(tmpNode !== null) {
                tmpNode.state.visits++;
				
                if (result != tmpNode.state.board.DRAW) {
                    if (tmpNode.state.player === result) {
                        tmpNode.state.wins++;
                    }
                    else {
                        tmpNode.state.wins--;
                    }
                }

                tmpNode = tmpNode.parent;
            }
        }

        simulate(node) {
            let state = node.state.clone(); //Temp state
			state.board = node.state.board.clone();
			
			//Play randomly until one player wins or game result in draw
            while (!state.isTerminal) {
                state.switchToNextPlayer();
                
                let action = state.getRandomAction(state.player);
                state.applyAction(action);
            }

            return state.board.status;
        }
    }
	
	return TreeSearch;
});