// DOM's img handle (is exists)
let img;

// timeout handler
let timeout;

const wsUri = `${WS_URI}:${WS_PORT}`;

const connect = () => {
    console.log(`Connecting to ${wsUri} ...`);
    const ws = new WebSocket(wsUri);

    ws.onopen = () => {
        console.log('Connected');
    };

    ws.onclose = (event) => {
        console.log('Connection close (reconnect in 1s)',event.reason);
        setTimeout(function() {
            connect();
        }, 1000);
    };

    ws.onmessage = function(msg) {
        /** @type {WebsocketMessage} */
        msg = JSON.parse(msg.data);

        const clearImg = () => {
            if (img) {
                img.remove();
                img = null;
            }
        };

        if (msg.type === 'image') {
            clearImg();

            img = document.createElement('img');
            img.src = msg.url;

            document.body.appendChild(img);

            if (AUTO_CLEAR) {
                if (timeout)
                    clearTimeout(timeout);

                timeout = setTimeout(function() {
                    clearImg();
                }, AUTO_CLEAR_TIMING || 60000);
            }
        } else if (msg.type === 'clear') {
            clearImg();
        }
    };
}

connect();