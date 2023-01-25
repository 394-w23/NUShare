import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FcLeftUp2, FcRight } from "react-icons/fc";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDbData, useDbUpdate } from "../utils/firebase";
import { useProfile } from "../utils/userProfile";
import getTodaysDate from "../utils/todayDate";

const Chat = () => {
  const { id } = useParams();
  const [user] = useProfile();
  const [chat] = useDbData("/chats/" + id);
  const [updateData] = useDbUpdate("/");

  const [message, setMessage] = useState("");

  const handleMessageUpload = () => {
    if (message) {
      let messages = chat.messages;
      const newMessage = {
        sender: user.uid,
        name: user.displayName,
        photo: user.photoURL,
        message: message,
        date: getTodaysDate(),
      };

      if (messages) {
        messages.push(newMessage);
      } else {
        messages = [newMessage];
      }

      updateData({ ["/chats/" + id]: { ...chat, messages } });
      setMessage("");
    }
  };

  if (!chat) return <h4 className="text-muted">Loading chat...</h4>;

  return (
    <div className="chat-container">
      <div className="text-muted text-center mb-3">
        <h3>Group Chat Board</h3>
      </div>
      <div className="chat-input mb-4">
        <InputGroup>
          <Form.Control
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </InputGroup>
        <Button className="ms-2" variant="light" onClick={handleMessageUpload}>
          <FcRight size={28} />
        </Button>
      </div>
      <div className="chat-board">
        {chat.messages ? (
          chat.messages.map((msg, idx) => (
            <div className="message-container" key={idx}>
              {msg.sender === user.uid ? (
                <>
                  <p className="right-message">{msg.message}</p>
                  <div className="image-container">
                    <img className="right-photo" src={msg.photo} />
                  </div>
                </>
              ) : (
                <>
                  <div className="image-container">
                    <img className="left-photo" src={msg.photo} />
                  </div>
                  <p className="left-message">{msg.message}</p>
                </>
              )}
            </div>
          ))
        ) : (
          <h4 className="text-center text-muted">No Messages</h4>
        )}
      </div>
    </div>
  );
};

export default Chat;
