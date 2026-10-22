import { Navigate, Route, Routes } from 'react-router';
import { CredentialsPage } from '../components/pages/CredentialsPage.tsx';
import { ChatPage } from '../components/pages/ChatPage.tsx';
import type { AppState } from '../hooks/useApp.ts';
import { ContactPage } from '../components/pages/ContactPage.tsx';

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
        element={hasCredentials ? <ContactPage {...props} /> : <Navigate to="/" replace />}
      />
      <Route
        path="chat"
        element={hasChat ? <ChatPage {...props} /> : <Navigate to="/contact" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
