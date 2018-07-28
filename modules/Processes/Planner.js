const decisionTaker = require('./DecisionTaker');


// Main Actions --------------------------------------------------------------------------------------------------------
function takeAPath() {
    checkPossiblePaths();
    decisionTaker.chooseAPath();
}


function walkUntilFoundAnObstacle() {

}

function doRollback() {

}


// Sub-Actions ---------------------------------------------------------------------------------------------------------

function checkPossiblePaths() {

}

function checkGoal() {

}

function walk() {

}


module.exports = {
    takeAPath,
    walkUntilFoundAnObstacle,
    doRollback
};
