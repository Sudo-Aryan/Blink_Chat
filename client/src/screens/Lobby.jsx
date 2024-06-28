import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1>Lobby</h1>
      <div className="flex justify-center items-center h-4/6 bg-indigo-800 w-6/12 text-white">
        <form onSubmit={handleSubmitForm} className="flex items-center flex-col w-full gap-4">
          <div className="flex items-start w-5/12 justify-between">
            <label htmlFor="email">Email ID</label>
            <input
              className="border-none text-black"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-start w-5/12 justify-between">
            <label htmlFor="room">Room </label>
            <input
              className=" border-none text-black"
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>

          <br />
          <button>Join</button>
        </form>
      </div>
    </div>
  );
};

export default LobbyScreen;
