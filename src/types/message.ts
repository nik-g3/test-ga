export interface Message {
  messageText: string;
  isIncoming: boolean;
  chatId?: string;
  messageSent?: string;
  messageId: string;
}
