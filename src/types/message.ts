export interface Message {
  messageText: string;
  isIncome: boolean;
  chatId?: string;
  messageSent?: string;
  messageId: string;
}
