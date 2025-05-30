import React, { useEffect } from "react";
import { PaperAirplaneIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { useChat } from "../../context/ChatContext";

export function ChatScreen() {
  const {
    input,
    setInput,
    endConversation,
    postBack,
    sendMessage,
    handleRadioButtonClick,
    chat,
    typing,
    selectedIndex,
    chatWindowRef,
  } = useChat();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatWindowRef?.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    };
    if (chat.length == 0){
      postBack("intr_aa11");
    }
  }, [chat]);

  const styles: {
    container: React.CSSProperties;
    header: React.CSSProperties;
    headerText: React.CSSProperties;
    messages: React.CSSProperties;
    messageWrapper: React.CSSProperties;
    bubble: React.CSSProperties;
    serverBubble: React.CSSProperties;
    userBubble: React.CSSProperties;
    author: React.CSSProperties;
    inputRow: React.CSSProperties;
    input: React.CSSProperties;
    sendButton: React.CSSProperties;
    resetButton: React.CSSProperties;
    icon: React.CSSProperties;
    choiceButton: React.CSSProperties;
    choiceButtonSelected: React.CSSProperties;
    radioCircle: React.CSSProperties;
    radioCircleSelected: React.CSSProperties;
    radioDot: React.CSSProperties;
  } = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      backgroundColor: "#ffffff",
      overflow: "hidden",
      fontFamily: "UniversNextforHSBC",
    },
    header: {
      backgroundColor: "#F3F3F3",
      padding: "12px 16px",
      borderBottom: "1px solid #000000",
    },
    headerText: {
      fontWeight: "bold",
      fontSize: "16px",
    },
    messages: {
      flex: 1,
      overflowY: "auto",
      padding: "12px",
    },
    messageWrapper: {
      marginBottom: 12,
      display: "flex",
      flexDirection: "column",
    },
    bubble: {
      padding: 12,
      borderRadius: 20,
      maxWidth: "75%",
      fontSize: 14,
      position: "relative",
      whiteSpace: "pre-wrap",
    },
    serverBubble: {
      alignSelf: "flex-start",
      backgroundColor: "#F3F3F3",
      color: "#000000",
      borderBottomLeftRadius: 5,
    },
    userBubble: {
      alignSelf: "flex-end",
      backgroundColor: "#f3f3f3",
      color: "#000",
      borderBottomRightRadius: 5,
    },
    author: {
      fontSize: "12px",
      color: "#555",
      marginBottom: 4,
    },
    inputRow: {
      display: "flex",
      alignItems: "center",
      padding: 12,
      borderTop: "1px solid #F3F3F3",
      gap: 8,
    },
    input: {
      flex: 1,
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid #ccc",
      fontSize: 14,
      outline: "none",
    },
    sendButton: {
      backgroundColor: "#db0011",
      color: "#ffffff",
      padding: "8px",
      borderRadius: 1,
      border: "none",
      cursor: "pointer",
    },
    resetButton: {
      backgroundColor: "#F3F3F3",
      color: "#000000",
      padding: "8px",
      borderRadius: 1,
      border: "none",
      cursor: "pointer",
    },
    icon: {
      height: 20,
      width: 20,
    },
    choiceButton: {
      display: "flex",
      alignItems: "center",
      padding: "6px 12px",
      borderRadius: 8,
      border: "2px solid transparent",
      backgroundColor: "#ffffff",
      color: "#000000",
      cursor: "pointer",
      marginBottom: 8,
    },
    choiceButtonSelected: {
      borderColor: "#000000",
    },
    radioCircle: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      border: "2px solid #ccc",
      marginRight: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    radioCircleSelected: {
      borderColor: "#000000",
      backgroundColor: "#000000",
    },
    radioDot: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "#ffffff",
    },
  };

  return (
    <div style={styles.container}>
      <div ref={chatWindowRef} style={styles.messages}>
        {chat.map((message, index) =>
          message.type === "text" ? (
            <div key={index} style={styles.messageWrapper}>
              <div
                style={{
                  ...styles.bubble,
                  ...(message.sender === "server"
                    ? styles.serverBubble
                    : styles.userBubble),
                }}
              >
                <div style={styles.author}>{message.author}</div>
                {message.text}
              </div>
            </div>
          ) : message.type === "buttons" ? (
            <div key={index} style={styles.messageWrapper}>
              <div
                style={{
                  ...styles.bubble,
                  ...(message.sender === "server"
                    ? styles.serverBubble
                    : styles.userBubble),
                }}
              >
                {message.choices.map((choice, i) => (
                  <button
                    key={i}
                    style={{
                      ...styles.choiceButton,
                      ...(selectedIndex === i
                        ? styles.choiceButtonSelected
                        : {}),
                    }}
                    onClick={() => {
                      if (selectedIndex === null) {
                        postBack(choice.payload);
                        handleRadioButtonClick(i);
                      }
                    }}
                    disabled={selectedIndex !== null}
                  >
                    <span
                      style={{
                        ...styles.radioCircle,
                        ...(selectedIndex === i
                          ? styles.radioCircleSelected
                          : {}),
                      }}
                    >
                      {selectedIndex === i && (
                        <span style={styles.radioDot}></span>
                      )}
                    </span>
                    {choice.text}
                  </button>
                ))}
              </div>
            </div>
          ) : null
        )}
        {/* {typing ? <Typing /> : null} */}
      </div>

      <div style={styles.inputRow}>
        <input
          type="text"
          placeholder="Chat with Pega..."
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage} style={styles.sendButton}>
          <PaperAirplaneIcon style={styles.icon} />
        </button>
        <button onClick={endConversation} style={styles.resetButton}>
          <ArrowPathIcon style={styles.icon} />
        </button>
      </div>
    </div>
  );
}

export default ChatScreen;
