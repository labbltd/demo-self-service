import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  } from "@material-tailwind/react";
import { ArrowPathIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useChat } from "@/context/chat-context";
import { useEffect } from "react";

export function Chat() {

  const {input, setInput, endConversation, postBack, sendMessage, handleRadioButtonClick, chat, typing, selectedIndex, chatWindowRef} = useChat();

  const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
  };

  useEffect(() => {
  if (chatWindowRef?.current) {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }
  }, [chat]);

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
          <div className="font-thin text-sm text-gray-800 pb-2">{message.author}</div>
          {message.text}
          </div>
          </div>
        ) : message.type === "buttons" ? (
          <div key={index} className="flex flex-col gap-4 px-6 py-3">
          <div
          key={index}
          className={
            message.sender === "server" ? "relative bg-gray-200 text-black p-4 rounded-[20px] rounded-bl-[5px] max-w-[75%] self-start text-left before:border-t-gray-200" : "relative bg-blue-400 text-white p-4 rounded-[20px] rounded-br-[5px] max-w-[75%] self-end text-right"
          }
          >
          {message.choices.map((choice, index) => (
          <div key={index} className="flex flex-col gap-4">
            <button
              className={`relative flex items-center px-4 py-2 cursor-pointer transition-all border-2 rounded-lg ${
                selectedIndex === index ? "" : "border-transparent"
              }`}
              onClick={() => {
                if (selectedIndex === null) {
                  postBack(choice.payload);
                  handleRadioButtonClick(index);
                }
              }}
              disabled={selectedIndex !== null}
            >
              {/* Radio Button Circle */}
              <span
                className={`w-5 h-5 flex items-center justify-center rounded-full border-2 mr-2 ${
                  selectedIndex === index ? "border-white bg-blue-500" : "border-gray-400 bg-white"
                }`}
              >
                {selectedIndex === index && <span className="w-2.5 h-2.5 rounded-full"></span>}
              </span>
              <span>{choice.text}</span>
            </button>
          </div>
        ))}
          </div>
          </div>
        ) : null
        )}
        {/* {typing ? <Typing></Typing> : null} */}
        </div>
        <div className="flex items-center gap-2 px-6 p-2">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyDown={handleKeyDown}
          placeholder="Chat with Pega..."
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={sendMessage}><PaperAirplaneIcon className="h-6 w-6"/></button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={endConversation}><ArrowPathIcon className="h-6 w-6"/></button>
        </div>
      </div>
      </CardBody>
    </Card>
    
    </div>
  );
  }
  
  export default Chat;