import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import './chat.css';

export function Chat(props: {
    toggleRecording(isRecording: boolean): void;
    onSubmit(e: KeyboardEvent<HTMLInputElement>): void;
    onReset(): void;
    messages: { text: string, timestamp: Date }[]
}) {
    const [initialMessage, setInitialMessage] = useState('');
    if (props.messages.length > 0) {
        return <ChatScreen {...props} onClose={() => props.onReset()} />;
    }
    return <div className="--light-theme" id="chat">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src="static/img/liam-small.jpg" alt="" style={{ height: '63px', borderRadius: '100%', marginRight: '15px' }} />
            <ChatConversationPanel
                toggleRecording={(isRecording) => {
                    props.toggleRecording(isRecording);
                }}
                message={initialMessage}
                setMessage={setInitialMessage}
                onSubmit={(e) => {
                    props.onSubmit(e);
                }} />
        </div>
    </div>
}

export function ChatScreen(props: {
    toggleRecording: (isRecording: boolean) => void;
    onClose(): void;
    onSubmit(e: KeyboardEvent<HTMLInputElement>): void;
    messages: { text: string, timestamp: Date }[]
}) {
    const [message, setMessage] = useState('');
    const boardRef = useRef<HTMLDivElement>(null);

    const [chatMessages, setChatMessages] = useState<{ text: string, timestamp: Date }[]>([]);
    useEffect(() => {
        const lastMessage = props.messages[props.messages.length - 1];
        if (!lastMessage) return;
        const previousMessages = props.messages.slice(0, props.messages.length - 1)
        const newMessage = { text: '', timestamp: lastMessage.timestamp };

        let idx = 0;
        const intervalId = setInterval(() => {
            newMessage.text = lastMessage.text.substring(0, idx++);
            setChatMessages([...previousMessages, newMessage]);
            boardRef.current!.scrollTop = boardRef.current!.scrollHeight;
            document.body.scrollTop = document.body.scrollHeight;
            if (idx > lastMessage.text.length) {
                clearInterval(intervalId);
            }
        }, 20);

    }, [props.messages[props.messages.length - 1]?.text]);
    return <div className="--light-theme" id="chat">
        <span className="chat__conversation-board__close" onClick={() => props.onClose()}>
            <svg className="feather feather-plus sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" transform="rotate(45 0 0)"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </span>
        <div className="chat__conversation-board" ref={boardRef}>
            {chatMessages.map((message, midx) => <div key={message.timestamp.getTime() + midx} className={"chat__conversation-board__message-container" + (midx % 2 === 0 ? ' reversed' : '')}>
                <div className="chat__conversation-board__message__person">
                    <div className="chat__conversation-board__message__person__avatar">
                        <img src={midx % 2 === 0 ? "static/img/team-2.jpeg" : "static/img/liam-small.jpg"} alt="Monika Figi" />
                    </div>
                    <span className="chat__conversation-board__message__person__nickname">Liam</span>
                </div>
                <div className="chat__conversation-board__message__context">
                    <div className={'chat__conversation-board__message__bubble'}>
                        {message.text.split('\n')
                            .filter(line => line !== '')
                            .map((line, lidx) =>
                                <span key={message.timestamp.getTime() + midx + lidx} >{line}</span>
                            )}
                    </div>
                </div>
                <div className="chat__conversation-board__message__options">
                    <button className="btn-icon chat__conversation-board__message__option-button option-item emoji-button">
                        <svg className="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                            <line x1="9" y1="9" x2="9.01" y2="9"></line>
                            <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
                    </button>
                    <button className="btn-icon chat__conversation-board__message__option-button option-item more-button">
                        <svg className="feather feather-more-horizontal sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                    </button>
                </div>
            </div>)}
        </div>
        <ChatConversationPanel
            toggleRecording={props.toggleRecording}
            onSubmit={props.onSubmit}
            message={message}
            setMessage={setMessage} />
    </div>
}

export function ChatConversationPanel(props: {
    toggleRecording(isRecording: boolean): void;
    onSubmit(e: KeyboardEvent<HTMLInputElement>): unknown;
    message: string,
    setMessage: (v: string) => void,
}) {
    const [isRecording, setIsRecording] = useState(false);
    return <div className="chat__conversation-panel">
        <div className="chat__conversation-panel__container">
            <input className="chat__conversation-panel__input panel-item"
                placeholder="Chat with Liam..."
                value={props.message}
                onChange={e => props.setMessage(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        props.onSubmit?.(e);
                        props.setMessage('');
                    }
                }}
            />
            <button className="chat__conversation-panel__button panel-item btn-icon send-message-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-reactid="1036">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            </button>

            <button className={"chat__conversation-panel__button panel-item btn-icon send-message-button" + (isRecording ? ' recording' : '')}
                onClick={() => {
                    props.toggleRecording(isRecording)
                    setIsRecording(!isRecording);
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-reactid="1036">
                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3m5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72z"></path>
                </svg>
            </button>
        </div>
    </div>
}
