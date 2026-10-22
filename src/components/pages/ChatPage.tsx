import { Chat } from '../Chat.tsx';
import type { AppState } from '../../hooks/useApp.ts';

interface ChatPageProps {
  appState: AppState;
}

export const ChatPage = (props: ChatPageProps) => {
  return <Chat {...props} />;
};
