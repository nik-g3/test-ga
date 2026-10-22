import { ContactForm } from '../ContactForm.tsx';
import type { AppState } from '../../hooks/useApp.ts';
interface ContactPageProps {
  appState: AppState;
}
export const ContactPage = (props: ContactPageProps) => {
  return <ContactForm {...props}></ContactForm>;
};
