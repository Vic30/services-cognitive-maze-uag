const readline = require('readline');
const decisionTaker = require('./modules/Archv2_DecisionTaker/DecisionTaker');
const dictionary = require('./modules/Archv2_Dictionary/Dictionary');
const movementEngine = require('./modules/Archv2_MovementEngine/MovementEngine');

net = require('net');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
var client;

net.createServer(function (socket) {
    socket.name = socket.remoteAddress + ":" + socket.remotePort
    client = socket;

    console.log("[*] Connected to unity client" + socket.name + "\n");
    client.write("Conected to Server");
    client.setNoDelay(true);

    client.on('data', function (data) {
        var dataString = data.toString('utf8');

        //Parse data from unity to direction dictonary
        var front = (dataString.indexOf(dictionary.direction_dictionary[0]) == -1);
        var right = (dataString.indexOf(dictionary.direction_dictionary[1]) == -1);
        var back = (dataString.indexOf(dictionary.direction_dictionary[2]) == -1);
        var left = (dataString.indexOf(dictionary.direction_dictionary[3]) == -1);

        console.log("Left: "+ left );
        console.log("Right: "+ right );
        console.log("Back: "+ back );
        console.log("Front: "+ front );

        var decision = decisionTaker.decisionTaker(front, right, back, left);
        console.log("Decision to be taken: "+decision);
        movementEngine.performDesicion(decision, client);
    });
    client.on('end', function () {
        throw new Error("[-] Unity client disconnected");
    });

    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
        process.exit();
    }
    if (key.name === 'up' || key.name === 'back' || key.name === 'right' || key.name === 'left') {
        console.log(key.name);
        client.write(key.name+"\n");
    }

    });

}).listen(5000);

console.log("Server running at port 5000\n");