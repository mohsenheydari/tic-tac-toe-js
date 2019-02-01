'use strict';

define(function () {
	
	//Upper confidence bound applied to trees
	class UCT {
		
		constructor(explorationConst) {
			this.c = explorationConst;
		}
		
        calculateValue(totalVisits, nodeWinScore, nodeVisits) {
            return (nodeWinScore / nodeVisits) + this.c * Math.sqrt(Math.log(totalVisits) / nodeVisits);
        }

        findBestChild(node) {
            let maxUCB    = -Number.MAX_VALUE;
            let bestNode  = null;

			node.children.forEach(child => {
				let ucb = this.calculateValue(node.state.visits, child.state.wins, child.state.visits);
				
				if(ucb > maxUCB) {
					maxUCB   = ucb;
					bestNode = child;
				}
			});
		
			return bestNode;
        }

	}
	
	return UCT;
});