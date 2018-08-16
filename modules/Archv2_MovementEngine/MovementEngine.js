const dictionary = require('../Archv2_Dictionary/Dictionary');
var client;

function performDesicion(desicion, socket){
    client = socket;
    switch(dictionary.direction_dictionary[desicion]) {
        case "left":
            setTimeout(walkInLeft,500);
            setTimeout(walkInLeft,1000);
            setTimeout(walkInLeft,1500);

            break;
        case "right":
            setTimeout(walkInRight,500);
            setTimeout(walkInRight,1000);
            setTimeout(walkInRight,1500);

            break;
        case "back":
            setTimeout(walkInBack,500);
            setTimeout(walkInBack,1000);
            setTimeout(walkInBack,1500);

            break;
        case "front":
            setTimeout(walkInFront,500);
            setTimeout(walkInFront,1000);
            setTimeout(walkInFront,1500);

            break;
    }
}

function walkInLeft(){
    console.log("Move avatar in Left");
    client.write("left\n");
}

function walkInRight(){
    console.log("Move avatar in Right");
    client.write("right\n");

}

function walkInBack(){
    console.log("Move avatar in Back");
    client.write("back\n");

}

function walkInFront(){
    console.log("Move avatar in Front");
    client.write("front\n");

}

module.exports = {
    performDesicion
};