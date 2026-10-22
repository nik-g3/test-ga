import { useState } from 'react';

export const useApp = () => {
  const [chatId, setChatId] = useState('');
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  return {
    chatId,
    setChatId,
    idInstance,
    setIdInstance,
    apiTokenInstance,
    setApiTokenInstance,
    phoneNumber,
    setPhoneNumber,
  };
};

export type AppState = ReturnType<typeof useApp>;
