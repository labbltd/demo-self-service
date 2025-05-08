import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  MutableRefObject,
} from "react";
import io from "socket.io-client";

const socket = io("https://labbchathook.onrender.com");

interface ChatChoice {
  text: string;
  payload: string;
}

type ChatMessage =
  | {
      type: "text";
      text: string;
      sender: "user" | "server";
      author: string;
    }
  | {
      type: "buttons";
      choices: ChatChoice[];
      sender: "server";
      author: string;
    }
  | {
      type: "indicator" | "not-supported";
      text: string;
      sender: "server";
      author: string;
    };

interface Option {
  value: string;
  label: string;
}

interface ChatContextType {
  input: string;
  setInput: (value: string) => void;
  chat: ChatMessage[];
  typing: boolean;
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
  selectedOption: Option;
  setSelectedOption: (option: Option) => void;
  chatWindowRef: MutableRefObject<HTMLDivElement | null>;
  sendMessage: () => void;
  postBack: (choice: string) => void;
  endConversation: () => void;
  handleRadioButtonClick: (index: number) => void;
}

interface ChatProviderProps {
  children: ReactNode;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: ChatProviderProps): JSX.Element => {
  const options: Option[] = [
    { value: "ABC1234581", label: "John Brown" },
    { value: "", label: "Unauthenticated person" },
    { value: "other", label: "Other" },
  ];

  const [input, setInput] = useState<string>("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    const handleServerMessage = (
      data: any,
      acknowledgmentCallback?: () => void
    ) => {
      setTyping(false);
      setChat((prevChat) => {
        if (data.type === "typing_indicator") {
          setTyping(true);
          setTimeout(() => setTyping(false), 3000);
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
        }
        return [
          ...prevChat,
          {
            text: "",
            sender: "server",
            type: "not-supported",
            author: data.author,
          },
        ];
      });

      acknowledgmentCallback?.();
    };

    socket.on("serverMessage", handleServerMessage);
    return () => {
      socket.off("serverMessage", handleServerMessage);
    };
  }, []);

  const sendMessageToServer = async (
    type: string,
    text?: string,
    isPostback = false
  ) => {
    const message = {
      type,
      customer_id: selectedOption.value,
      customer_name: selectedOption.label,
      message_id: Date.now(),
      text: text ? [text] : [],
      postback: isPostback ? text : undefined,
    };

    try {
      socket.emit("clientMessage", message, (ack: any) =>
        console.log("Server acknowledgment:", ack)
      );

      if (type === "text" && text && !isPostback) {
        setChat((prevChat) => [
          ...prevChat,
          {
            text,
            sender: "user",
            type: "text",
            author: selectedOption.label,
          },
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
    setSelectedIndex(null);
  };

  const postBack = async (choice: string) => {
    await sendMessageToServer("text", choice, true);
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;
    await sendMessageToServer("text", input);
  };

  const handleRadioButtonClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <ChatContext.Provider
      value={{
        input,
        setInput,
        chat,
        typing,
        selectedIndex,
        setSelectedIndex,
        selectedOption,
        setSelectedOption,
        chatWindowRef,
        sendMessage,
        postBack,
        endConversation,
        handleRadioButtonClick,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// ----------- Hook -----------

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
