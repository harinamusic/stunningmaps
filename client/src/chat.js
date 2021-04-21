import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Chat() {
    //this will work if i stored my last 10 messages in state
    //with the property chatMessages
    const elemRef = useRef();
    const chatMessages = useSelector((state) => state && state.messages);
    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);
    const keyCheck = (e) => {
        console.log("value: ", e.target.value);
        console.log(e.key);

        if (e.key === "Enter") {
            console.log("our Message: ", e.target.value);
            socket.emit("newMessage", e.target.value);
            e.target.value == "";
        }
    };
    return (
        <div className="chat">
            <div className="navbar">
                <a className="friendslink" href="/friends">
                    MY FRIENDS
                </a>
                <a className="findpeoplelink" href="/users">
                    SEARCH
                </a>
                <a className="chatlink" href="/">
                    PROFILE
                </a>
            </div>
            <p className="chat">Chat with your friends or likeminded people!</p>
            <div className="chatarea" ef={elemRef}>
                <div className="chat-container" ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map((message, id) => {
                            return (
                                <div className="chatpersona" key={id}>
                                    <Link to={`/user/${message.sender_id}`}>
                                        <img
                                            className="chatimage"
                                            src={
                                                message.profile_pic ||
                                                "default.png"
                                            }
                                            alt={`${message.first} ${message.last}`}
                                        />
                                    </Link>
                                    <p>
                                        {message.first} {message.last} at{" "}
                                        {message.created_at}: {message.message}
                                    </p>
                                    {/* <div className="chatmessage">
                                        {message.message}
                                    </div> */}
                                </div>
                            );
                        })}
                </div>
            </div>
            <textarea
                onKeyDown={keyCheck}
                placeholder="add your message here"
            ></textarea>
        </div>
    );
}
