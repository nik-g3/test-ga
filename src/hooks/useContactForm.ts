import { checkAccount } from '../api/greenApi.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { AppState } from './useApp.ts';

interface UseContactFormProps {
  appState: AppState;
}
export const useContactForm = (props: UseContactFormProps) => {
  const {
    appState: { idInstance, apiTokenInstance, setChatId, setPhoneNumber },
  } = props;
  const navigate = useNavigate();
  const [phoneNumberValue, setPhoneNumberValue] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCheckAccount = (event: React.FormEvent<HTMLFormElement>) => {
    setError(false);
    event.preventDefault()
    setIsLoading(true);
    checkAccount({ phoneNumber: parseInt(phoneNumberValue.replace(/\D/g, '')), idInstance, apiTokenInstance })
      .then((res) => {
        if (res.exist) {
          setChatId(res.chatId);
          setPhoneNumber(phoneNumberValue.replace(/\D/g, ''));
          navigate('/chat');
        } else {
          setError(true);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return {
    handleCheckAccount,
    phoneNumber: phoneNumberValue,
    setPhoneNumberValue,
    error,
    isLoading,
  };
};
