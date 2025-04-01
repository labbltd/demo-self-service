import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const ChatContext = createContext();
const socket = io("https://labbchathook.onrender.com"); // Ensure socket persists

export const ChatProvider = ({ children }) => {
  const options = [
    { value: "ABC1234581", label: "John Brown" },
    { value: "", label: "Unauthenticated person" },
    { value: "other", label: "Other" },
  ];

  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const chatWindowRef = useRef();

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    const handleServerMessage = (data, acknowledgmentCallback) => {
      setTyping(false);
      setChat((prevChat) => {
        if (data.type === "typing_indicator") {
          setTyping(true);
          setTimeout(() => setTyping(false), 3000);
          return [...prevChat, { text: "", sender: "server", type: "indicator", author: data.author }];
        } else if (data.type === "menu") {
          return [...prevChat, { choices: data.items, sender: "server", type: "buttons", author: data.author }];
        } else if (data.type === "text") {
          return [...prevChat, { text: data.text, sender: "server", type: "text", author: data.author }];
        }
        return [...prevChat, { text: "", sender: "server", type: "not-supported", author: data.author }];
      });
      
      acknowledgmentCallback && acknowledgmentCallback();
    };
    
    socket.on("serverMessage", handleServerMessage);
    return () => {
      socket.off("serverMessage", handleServerMessage);
    };
  }, []);

  const sendMessageToServer = async (type, text, isPostback = false) => {
    const message = {
      type,
      customer_id: selectedOption.value,
      customer_name: selectedOption.label,
      message_id: Date.now(),
      text: [text],
      postback: isPostback ? text : undefined,
    };

    try {
      socket.emit("clientMessage", message, (acknowledgment) => console.log("Server acknowledgment:", acknowledgment));
      
      if (type === "text" && !isPostback) {
        setChat((prevChat) => [...prevChat, { text, sender: "user", type: "text", author: selectedOption.label }]);
        setInput("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const endConversation = async () => {
    await sendMessageToServer("customer_end_session");
    setChat([]);
    setSelectedIndex(null);
  };

  const postBack = async (choice) => {
    await sendMessageToServer("text", choice, true);
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;
    await sendMessageToServer("text", input);
  };

  const handleRadioButtonClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ChatContext.Provider
      value={{ input, setInput, chat, typing, selectedIndex, setSelectedIndex, selectedOption, setSelectedOption, chatWindowRef, sendMessage, postBack, endConversation, handleRadioButtonClick }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
