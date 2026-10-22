import { CredentialsForm } from '../CredentialsForm.tsx';
import type { AppState } from '../../hooks/useApp.ts';
interface CredentialsPageProps {
  appState: AppState;
}
export const CredentialsPage = (props: CredentialsPageProps) => {
  return <CredentialsForm {...props}></CredentialsForm>;
};
