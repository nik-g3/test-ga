import './Chat.css';
import { ChatForm } from './ChatForm';
import { ChatMessageList } from './ChatMessageList';
import { useChat } from '../hooks/useChat.ts';
import type { AppState } from '../hooks/useApp.ts';
interface ChatProps {
  appState: AppState;
}

export function Chat(props: ChatProps) {
  const { messages, phoneNumber, handleSendMessage } = useChat(props);
  return (
    <section className="chat">
      <header className="chat__header">
        <div className="chat__avatar">N</div>

        <div className="chat__info">
          <h1 className="chat__name">+{phoneNumber}</h1>
        </div>
      </header>

      <ChatMessageList messages={messages} />

      <ChatForm {...props} handleSendMessage={handleSendMessage} />
    </section>
  );
}
