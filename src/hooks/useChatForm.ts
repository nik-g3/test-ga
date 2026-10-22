import { useState } from 'react';
import type { AppState } from './useApp.ts';
interface UseChatFormProps {
  appState: AppState;
  handleSendMessage: (params: { message: string }) => Promise<void>;
}

export const useChatForm = (props: UseChatFormProps) => {
  const {
    appState: { phoneNumber },
    handleSendMessage,
  } = props;
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!message.trim()) {
      return;
    }
    setIsLoading(true);
    handleSendMessage({ message })
      .then(() => {
        setMessage('');
      })
      .catch((err) => {
        console.dir(err);
        if (err.message) {
          setError(err.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return {
    message,
    phoneNumber,
    handleSendMessageSubmit,
    setMessage,
    error,
    isLoading,
  };
};
