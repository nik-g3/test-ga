import './Chat.css';
import { ChatMessage } from './ChatMessage';
import type { Message } from '../types/message.ts';

type ChatMessageListProps = {
  messages: Message[];
};

export function ChatMessageList({ messages }: ChatMessageListProps) {
  if (!messages.length) {
    return (
      <div className="chat-message-list chat-message-list--empty">
        <div className="chat-message-list__empty">
          <div className="chat-message-list__empty-icon">💬</div>
          <p>Начните общение</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-message-list">
      {messages.map((message) => (
        <ChatMessage key={message.messageId} message={message} />
      ))}
    </div>
  );
}
