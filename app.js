const readline = require('readline');
net = require('net');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

var client;

net.createServer(function (socket) {
    socket.name = socket.remoteAddress + ":" + socket.remotePort
    client = socket;

    client.write("[*] Connected to unity client" + socket.name + "\n");
    client.setNoDelay(true);

    client.on('data', function (data) {
        console.log("Data:");
        console.log(data.toString('utf8'));
    });
    client.on('end', function () {
        throw new Error("[-] Unity client disconnected");
    });

    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
        process.exit();
    }
    if (key.name === 'up' || key.name === 'down' || key.name === 'right' || key.name === 'left') {
        console.log(key.name);
        client.write(key.name+"\n");
    }

    });

}).listen(5000);


console.log("Server running at port 5000\n");