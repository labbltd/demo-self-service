import React, { useState } from "react";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import ChatScreen from "./ChatScreen";

const FloatingChatContainer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen((prev) => !prev);

  return (
    <div style={styles.container}>
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>Chat with us</div>
          <div style={styles.chatBody}>
            <ChatScreen />
          </div>
        </div>
      )}
      <button
        onClick={toggleChat}
        style={styles.chatToggleButton}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#3a8530")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#4da940")
        }
      >
        <ChatBubbleLeftEllipsisIcon style={{ width: 24, height: 24 }} />
      </button>
    </div>
  );
};

export default FloatingChatContainer;

const styles: {
  container: React.CSSProperties;
  chatWindow: React.CSSProperties;
  chatHeader: React.CSSProperties;
  chatBody: React.CSSProperties;
  chatToggleButton: React.CSSProperties;
} = {
  container: {
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  chatWindow: {
    width: "min(500px, 70vw)",
    height: "min(700px, 70vh)",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
  },
  chatHeader: {
    backgroundColor: "#f3f3f3",
    padding: 10,
    fontWeight: 400,
    fontFamily: "UniversNextforHSBC, sans-serif",
  },
  chatBody: {
    flex: 1,
    padding: 10,
    overflowY: "auto",
    color: "#000000",
    backgroundColor: "#ffffff",
  },
  chatToggleButton: {
    width: 56,
    height: 56,
    backgroundColor: "#4da940",
    color: "#ffffff",
    border: "none",
    borderRadius: "50%",
    fontSize: 24,
    cursor: "pointer",
    transition: "background-color 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
