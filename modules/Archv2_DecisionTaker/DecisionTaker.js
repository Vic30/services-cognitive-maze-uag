/*
* Constants
*/
const FRONT = 0;
const RIGHT = 1;
const BACK = 2;
const LEFT = 3;
const NONE = 4;

const MAX_ACTIONSHISTORY_ENTRIES = 10;

/*
* Global vars
*/
//						   		front,  right,  back,  left
var currentPossibilities = 		[false, false,  false, false];
var candidatePossibilities = 	[false, false,  false, false];
var actionsHistory = [NONE,NONE,NONE,NONE,NONE,NONE,NONE,NONE,NONE,NONE]; // where '0' index is the must recent action
var actionsHistoryOldestEntry = 0;
var decision = NONE;

/*
*	Function to update internal array with current possibilities
*/
function updatePossibilities(front, right, back, left) {
    currentPossibilities[FRONT] = front;
	currentPossibilities[RIGHT] = right;
	currentPossibilities[BACK] = back;
	currentPossibilities[LEFT] = left;
	
	candidatePossibilities[FRONT] = front;
	candidatePossibilities[RIGHT] = right;
	candidatePossibilities[BACK] = back;
	candidatePossibilities[LEFT] = left;
}

/*
*	Function to update actions History
*/
function updateHistory()
{
	var i;
	
	if (actionsHistoryOldestEntry == MAX_ACTIONSHISTORY_ENTRIES)
		i = MAX_ACTIONSHISTORY_ENTRIES - 1;
	else
	{
		i = actionsHistoryOldestEntry;
		actionsHistoryOldestEntry++;
	}
	
	while (i > 0)
	{
		actionsHistory[i+1] = actionsHistory[i];
		i--;
	}
	
	actionsHistory[0] = decision;
}

/*
*	Functions to quickly discard some possibilities
*	Called only by strategy functions
*	Don't call directly, these functions are part of bigger plans
*/
function discard_GoingBack() {
	if(candidatePossibilities[FRONT] || candidatePossibilities[RIGHT] || candidatePossibilities[LEFT]) // Ensure that at least another option is available
		candidatePossibilities[BACK] = false;
}

/*
*	Functions to decide according to a strategy
*/
function strategy_randomDecide() {
	
	discard_GoingBack();
	
	decision = Math.floor(Math.random() * 3.99);     // returns a random integer from 0 to 3
	
	// Validate if it is possible in current scenario, if not, return next possible action in array
	while(!candidatePossibilities[decision])
	{
		decision++;
		if(decision >= 4)
			decision = 0;
	}
}


/*
*	Interface functions
*/
function decisionTaker(front, right, back, left) {
    
	// Pre-processing
	updatePossibilities(front, right, back, left);
	// Strategy
	strategy_randomDecide();   // => HERE DECIDE WHICH STRATEGY TO FOLLOW
	// Post-processing
	updateHistory();	

	return decision;
}


module.exports = {
    decisionTaker
};