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

  const handleSendMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    handleSendMessage({ message })
      .then(() => {
        setMessage('');
      })
      .finally(() => setIsLoading(false));
  };

  return {
    message,
    phoneNumber,
    handleSendMessageSubmit,
    setMessage,
    isLoading,
  };
};
