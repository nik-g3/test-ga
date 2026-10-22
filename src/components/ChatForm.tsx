import './Chat.css';
import { useChatForm } from '../hooks/useChatForm.ts';
import type { AppState } from '../hooks/useApp.ts';
import { Spinner } from './common/Spinner.tsx';

interface ChatFormProps {
  appState: AppState;
  handleSendMessage: (params: { message: string }) => Promise<void>;
}

export function ChatForm(props: ChatFormProps) {
  const { message, setMessage, handleSendMessageSubmit, isLoading, error } = useChatForm(props);

  return (
    <>
      <form className="chat-form" onSubmit={handleSendMessageSubmit}>
        <textarea
          className="chat-form__input"
          rows={2}
          value={message}
          placeholder="Напишите сообщение..."
          onChange={(event) => setMessage(event.target.value)}
          maxLength={4096}
        />

        <button
          className="chat-form__send"
          type="submit"
          aria-label="Отправить сообщение"
          disabled={isLoading}
        >
          {isLoading && <Spinner />}
          {isLoading ? '' : '➤'}
        </button>
        {error && (
          <div className="chat-form__error" role="alert">
            Что-то пошло не так, попробуйте еще раз позже
          </div>
        )}
      </form>
    </>
  );
}
