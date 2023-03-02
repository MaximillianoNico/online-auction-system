import { io } from "socket.io-client";

const Websocket = (() => {
  return io(
    process.env?.WS_HOST,
    { reconnectionDelayMax: 10000 }
  );
})();

export default Websocket;
