
module.exports = {
	/*
	* beCurious(action)
	*     Funtion that returns true if we shall go random in the current action (be curious);
	*     false if we should act according to the plan
	*/
	function beCurious() {
		return Math.random < 0.1; // Curiosity factor 10%
	}
}