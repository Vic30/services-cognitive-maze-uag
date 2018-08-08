
var ShortTermObjectiveEnum = {
	FOLLOW_RIGHT_WALL,
	FOLLOW_LEFT_WALL,
	WALK_UNTIL_RIGHT_CLEAR,
	WALK_UNTIL_LEFT_CLEAR,
	WALK_UNTIL_FRONT_BLOCKED,
	UNDO_LAST_INSTRUCTION
}

var LongTermObjectiveEnum = {
	EXPLORE_RANDOMLY,
	GO_BACK_TO_LAST_L1_CHECKPOINT, // Level 1 checkpoint (more next)
	GO_BACK_TO_LAST_L2_CHECKPOINT, // Level 2 checkpoint
	GO_BACK_TO_LAST_L3_CHECKPOINT, // Level 3 checkpoint (more far)
	DISCARD_PATHS_IN_CROSSROAD
}

/*
* longTermObjective()
*     
*     
*/
function longTermObjective() {
	
	// Implementation TBD
	
	return 0; //TBD
}

/*
* shortTermObjective()
*     
*     
*/
function shortTermObjective() {
	// Here longTermObjective() shall be called
	// A short term objective is always part of a long term objective
	
	// Implementation TBD
	
	return 0; //TBD
}

/*
* evaluateObjective(trigger)
*     
*	Evaluate the completness of an objective
*	Parameters:
*     trigger - Specifies why the evaluation is being called.
*				Could be that the instruction was completed or a
*				non fore-seen problem was faced.
*/
function evaluateObjective(trigger) {
	
	if (trigger == /*Instruction completed*/)
	{
		// Call shortTermObjective
	}
	else
	{
	}
	return 0; //TBD
}
	
// Functions cannot be implemented until we decide the interfaces with
// Evaluator.js, DecisionTaker.js and Planner.js
	
module.exports = {
	shortTermObjective,
	evaluateObjective
}