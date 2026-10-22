import './ContactForm.css';
import { useContactForm } from '../hooks/useContactForm.ts';
import type { AppState } from '../hooks/useApp.ts';
import { Spinner } from './common/Spinner.tsx';
interface ContactFormProps {
  appState: AppState;
}

export function ContactForm(props: ContactFormProps) {
  const { handleCheckAccount, setPhoneNumberValue, phoneNumberValue, error, isLoading } =
    useContactForm(props);
  return (
    <form className="contact-form" onSubmit={handleCheckAccount}>
      <div className="contact-form__header">
        <div className="contact-form__icon">+</div>

        <h1 className="contact-form__title">Новый чат</h1>

        <p className="contact-form__description">Введите номер телефона, чтобы открыть чат</p>
      </div>

      <label className="field">
        <span className="field__label">Номер телефона</span>
        <input
          className="field__input"
          type="tel"
          value={phoneNumberValue}
          placeholder="799991234567"
          inputMode="numeric"
          pattern="\+?\d{9,}"
          required
          onChange={(event) => setPhoneNumberValue(event.target.value)}
        />
      </label>

      <button className="button button--primary" type="submit" disabled={isLoading}>
        {isLoading && <Spinner />}
        {isLoading ? 'Ищем контакт...' : 'Открыть чат'}
      </button>

      {error ? <div className="form-error">{error}</div> : null}
    </form>
  );
}
