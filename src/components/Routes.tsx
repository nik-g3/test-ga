import { Navigate, Route, Routes } from 'react-router';
import { CredentialsPage } from './pages/CredentialsPage.tsx';
import { ChatPage } from './pages/ChatPage.tsx';
import { ContactForm } from './ContactForm.tsx';
import type { AppState } from '../hooks/useApp.ts';

interface AppRouterProps {
  appState: AppState;
}

export const AppRouter = (props: AppRouterProps) => {
  const {
    appState: { idInstance, apiTokenInstance, chatId },
  } = props;

  const hasCredentials = Boolean(idInstance && apiTokenInstance);
  const hasChat = Boolean(hasCredentials && chatId);

  return (
    <Routes>
      <Route index element={<CredentialsPage {...props} />} />
      <Route
        path="contact"
        element={hasCredentials ? <ContactForm {...props} /> : <Navigate to="/" replace />}
      />
      <Route
        path="chat"
        element={hasChat ? <ChatPage {...props} /> : <Navigate to="/contact" replace />}
      />
    </Routes>
  );
};
