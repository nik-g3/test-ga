import { useCredentialsForm } from '../hooks/useCredentialsForm.ts';
import './CredentialsForm.css';
import type { AppState } from '../hooks/useApp.ts';
import { Spinner } from './common/Spinner.tsx';
interface CredentialsFormProps {
  appState: AppState;
}

export function CredentialsForm(props: CredentialsFormProps) {
  const {
    handleSubmitCredentials,
    setApiTokenInstance,
    setIdInstance,
    idInstance,
    error,
    apiTokenInstance,
    isLoading,
  } = useCredentialsForm(props);

  return (
    <form className="credentials-form" onSubmit={handleSubmitCredentials}>
      <div className="credentials-form__header">
        <div className="credentials-form__logo">M</div>

        <h1 className="credentials-form__title">Подключение</h1>

        <p className="credentials-form__description">
          Введите данные GREEN-API <strong>для весии Telegram</strong>, чтобы начать работу с мессенджером
        </p>
      </div>

      <div className="credentials-form__fields">
        <label className="field">
          <span className="field__label">ID Instance</span>
          <input
            className="field__input"
            type="text"
            required
            onChange={(event) => setIdInstance(event.target.value)}
            value={idInstance}
            placeholder="Введите idInstance"
          />
        </label>

        <label className="field">
          <span className="field__label">API Token Instance</span>
          <input
            className="field__input"
            type="password"
            required
            value={apiTokenInstance}
            onChange={(event) => setApiTokenInstance(event.target.value)}
            placeholder="Введите apiTokenInstance"
          />
        </label>
      </div>

      <button className="button button--primary" type="submit" disabled={isLoading}>
        {isLoading && <Spinner />}
        {isLoading ? 'Подключение...' : 'Подключиться'}
      </button>

      {error ? <div className="form-error">{error}</div> : null}
    </form>
  );
}
