import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    //this will work if i stored my last 10 messages in state
    //with the property chatMessages
    const chatMessages = useSelector((state) => state && state.chatMessages);

    const keyCheck = (e) => {
        e.preventDefault();
        // console.log("value: ", e.target.value);
        // console.log("key pressed", e.key);
        if (e.key === "Enter") {
            console.log("our Message: ", e.target.value);
            socket.emit("my amazing chat message", e.target.value);
            e.target.value == "";
        }
    };
    return (
        <div>
            <p className="chat">WElcome to chat</p>
            <div className="chatarea">
                <p>My text Messages</p>
                <p>My text Messages</p>
                <p>My text Messages</p>
                <p>My text Messages</p>
                <p>My text Messages</p>
                <p>My text Messages</p>
                <p>My text Messages</p>
                <p>My text Messages</p>
                <p>My text Messages</p>
            </div>
            <textarea
                placeholder="add your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
