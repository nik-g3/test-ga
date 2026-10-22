import { connect } from '../api/greenApi.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { AppState } from './useApp.ts';

interface UseCredentialsFormProps {
  appState: AppState;
}

export const useCredentialsForm = (props: UseCredentialsFormProps) => {
  const {
    appState: { setApiTokenInstance, setIdInstance },
  } = props;
  const navigate = useNavigate();

  const [idInstanceValue, setIdInstanceValue] = useState('');
  const [apiTokenInstanceValue, setApiTokenInstanceValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitCredentials = (event: React.FormEvent<HTMLFormElement>) => {
    setError('');
    event.preventDefault();
    setIsLoading(true);
    connect({ idInstance: idInstanceValue, apiTokenInstance: apiTokenInstanceValue })
      .then((res) => {
        const { stateInstance } = res;

        if (stateInstance === 'authorized') {
          setApiTokenInstance(apiTokenInstanceValue);
          setIdInstance(idInstanceValue);
          navigate('/contact');
        }
      })
      .catch((err) => {
        if (err.message) {
          setError(err.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return {
    handleSubmitCredentials,
    idInstance: idInstanceValue,
    setIdInstance: setIdInstanceValue,
    apiTokenInstance: apiTokenInstanceValue,
    setApiTokenInstance: setApiTokenInstanceValue,
    isLoading,
    error,
  };
};
