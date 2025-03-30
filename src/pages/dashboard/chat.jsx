import React, { useState, useEffect, useRef } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  import io from "socket.io-client";

export function Chat() {

  const socket = io("https://labbchathook.onrender.com");

  // Test data
  const options = [
    { value: "ABC1234581", label: "John Brown" },
    { value: "", label: "Unauthenticated person" },
    { value: "other", label: "Other" },
  ];

    // State declarations
    const [input, setInput] = useState("");
    const [chat, setChat] = useState([]);
    const [typing, setTyping] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const chatWindowRef = useRef();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleRadioButtonClick = (index) => {
    setSelectedIndex(index);
  };

  // useEffects
  useEffect(() => {
    // Scroll to the bottom when messages change
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [chat]);

  useEffect(() => {
    // Handle incoming server messages
    socket.on("serverMessage", (data, acknowledgmentCallback) => {
      console.log(data);

      // Set typing to false
      setTyping(false);

      setChat((prevChat) => {
        if (data.type === "typing_indicator") {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
          }, 3000);
          return [
            ...prevChat,
            {
              text: "",
              sender: "server",
              type: "indicator",
              author: data.author,
            },
          ];
        } else if (data.type === "menu") {
          return [
            ...prevChat,
            {
              choices: data.items,
              sender: "server",
              type: "buttons",
              author: data.author,
            },
          ];
        } else if (data.type === "text") {
          return [
            ...prevChat,
            {
              text: data.text,
              sender: "server",
              type: "text",
              author: data.author,
            },
          ];
        } else {
          return [
            ...prevChat,
            {
              text: "",
              sender: "server",
              type: "not-supported",
              author: data.author,
            },
          ];
        }
      });

      // Acknowledge the receipt on the client side
      acknowledgmentCallback && acknowledgmentCallback();
    });

    return () => {
      // Clean up when component unmounts
    };
  });

  const sendMessageToServer = async (type, text, isPostback) => {
    const message = {
      type,
      customer_id: selectedOption.value,
      customer_name: selectedOption.label,
      message_id: Date.now(),
      text: [text],
      postback: isPostback ? text : undefined,
    };

    try {
      socket.emit("clientMessage", message, (acknowledgment) => {
        console.log("Server acknowledgment:", acknowledgment);
      });

      if (type === "text" && !isPostback) {
        setChat((prevChat) => [
          ...prevChat,
          { text, sender: "user", type: "text", author: selectedOption.label },
        ]);
        setInput("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const endConversation = async () => {
    await sendMessageToServer("customer_end_session");
    setChat([]);
  };

  const postBack = async (choice) => {
    await sendMessageToServer("text", choice, true);
  };

  const sendMessage = async () => {
    if (input.trim() === "") {
      return;
    }

    await sendMessageToServer("text", input);
  };
  
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Chat with us
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <div className="flex flex-col gap-4">
              <div ref={chatWindowRef} className="overflow-y-auto h-[400px]">
              {chat.map((message, index) =>
                message.type === "text" ? (
                  <div key={index} className="flex flex-col gap-4 px-6 py-3">
                  <div
                    className={(
                      message.sender === "server" ? "relative bg-gray-200 text-black p-4 rounded-[20px] rounded-bl-[5px] max-w-[75%] self-start text-left before:border-t-gray-200" : "relative bg-blue-400 text-white p-4 rounded-[20px] rounded-br-[5px] max-w-[75%] self-end text-right"
                    )}
                  >
                    <div className="font-semibold text-gray-800">{message.author}</div>
                    {message.text}
                  </div>
                  </div>
                ) : message.type === "buttons" ? (
                  <div
                    key={index}
                    className={
                      message.sender === "server" ? "relative bg-gray-200 text-black p-4 rounded-[20px] rounded-bl-[5px] max-w-[75%] self-start text-left before:border-t-gray-200" : "relative bg-blue-400 text-white p-4 rounded-[20px] rounded-br-[5px] max-w-[75%] self-end text-right"
                    }
                  >
                    {message.choices.map((choice, index) => (
                      <div className="menu-container">
                        <button
                          key={index}
                          className={`menu-button radio-button ${
                            selectedIndex === index ? "selected" : ""
                          }`}
                          onClick={() => {
                            postBack(choice.payload);
                            handleRadioButtonClick(index);
                          }}
                        >
                          {choice.text}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null
              )}
              {/* {typing ? <Typing></Typing> : null} */}
              </div>
              <div className="flex items-center gap-2 p-2 border-t border-gray-300">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Chat with Pega..."
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={sendMessage}>Send</button>
              </div>
            </div>
          </CardBody>
        </Card>
        
      </div>
    );
  }
  
  export default Chat;