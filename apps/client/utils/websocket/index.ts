import { io } from "socket.io-client";

const Websocket = (() => {
  return io(
    process?.env?.WS_HOST ?? "ws://209.97.161.156:3000",
    {
      reconnectionDelayMax: 10000
    }
  );
})();

export default Websocket;
