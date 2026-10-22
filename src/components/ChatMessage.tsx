import './Chat.css';
import type { Message } from '../types/message.ts';

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`chat-message ${
        message.isIncoming ? 'chat-message--incoming' : 'chat-message--outgoing'
      }`}
    >
      <div className="chat-message__bubble">
        <div className="chat-message__text">{message.messageText}</div>

        <div className="chat-message__meta">
          {!message.isIncoming && <span className="chat-message__status"></span>}
        </div>
      </div>
    </div>
  );
}
