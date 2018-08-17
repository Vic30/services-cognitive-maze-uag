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

var action_lastNotDummyDecisionPoint = NONE;
var weAreGoingBack = false;

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
*	Function that returns the the direction where I came from at a decision point, given the action I did.
*	In other words: if at a decision point I made an action, if I have to go back, tell me where I was coming from previously
*/
function whereIsHome(actionTookHere){
	var homeDirection = NONE;
	
	switch (actionTookHere)
	{
	case RIGHT:
		homeDirection = LEFT;
		break;
	case LEFT:
		homeDirection = RIGHT;
		break;
	case FRONT:
		homeDirection = FRONT;
		break;
	default:
		break;
	}
		
	return homeDirection;
}

/*
*	Function that returns the number of possibilities available
*/
function numOfPossibilities(){
	var numOfPos = 0;
	var i;
	
	for(i = 0; i < 4; i++)
	{
		if(candidatePossibilities[i])
			numOfPos++;
	}
	
	return numOfPos;
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

function strategy_randomDecideButDontGoHome() {
	
	discard_GoingBack();
	
	var numOfPos = numOfPossibilities();
	
	if(numOfPos == 0)
		//No choices, dummy action to avoid process hanging
		decision = FRONT; 
	else if(numOfPos == 1)
	{
		//One choice, dummy decision point, return obvious action
		var i = 0;
		for (i=0; i<4; i++)
		{
			if(candidatePossibilities[i])
			{
				decision = i;
				if(i==BACK)
					weAreGoingBack = true; // the way was closed, so we know we are going back
			}
		}
	}
	else
	{
		// Not dummy decision point (a.k.a. CROSSROAD)
		
		if (weAreGoingBack)
		{
			// Clear flag
			weAreGoingBack = false; 
			
			if(action_lastNotDummyDecisionPoint != NONE)
			{
				// Discard going home
				candidatePossibilities[whereIsHome(action_lastNotDummyDecisionPoint)] = false;
			}
		}
		
		decision = Math.floor(Math.random() * 3.99);     // returns a random integer from 0 to 3
		
		// Validate if it is possible in current scenario, if not, return next possible action in array
		while(!candidatePossibilities[decision])
		{
			decision++;
			if(decision >= 4)
				decision = 0;
		}
		
		action_lastNotDummyDecisionPoint = decision;
	}
	
	console.log("numOfPos " + numOfPos);
	console.log("weAreGoingBack " + weAreGoingBack);
	console.log("action_lastNotDummyDecisionPoint " + action_lastNotDummyDecisionPoint);
	
	
}


/*
*	Interface functions
*/
function decisionTaker(front, right, back, left) {
    
	// Pre-processing
	updatePossibilities(front, right, back, left);
	// Strategy
	//strategy_randomDecide();   // => HERE DECIDE WHICH STRATEGY TO FOLLOW
	strategy_randomDecideButDontGoHome();   // => HERE DECIDE WHICH STRATEGY TO FOLLOW
	// Post-processing
	updateHistory();	

	return decision;
}


module.exports = {
    decisionTaker
};