import { useEffect, useState } from 'react';
import { deleteNotification, fetchNotification, sendMessage } from '../api/greenApi.ts';
import type { Message } from '../types/message.ts';
import { type AppState } from './useApp.ts';

interface UseChatProps {
  appState: AppState;
}

export const useChat = (props: UseChatProps) => {
  const {
    appState: { phoneNumber, chatId, idInstance, apiTokenInstance },
  } = props;
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    const startPolling = ({ abortController }: { abortController: AbortController }) => {
      fetchNotification({ idInstance, apiTokenInstance, abortController })
        .then((res) => {
          if (
            res.body.typeWebhook === 'incomingMessageReceived' &&
            res.body.messageData.typeMessage === 'textMessage' &&
            res.body.senderData.chatId === chatId
          ) {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                messageText: res.body.messageData.textMessageData.textMessage,
                isIncoming: true,
                messageId: res.body.idMessage,
              },
            ]);
          }
          return res;
        })
        .then((res) => {
          if (res !== null) {
            return deleteNotification({
              idInstance,
              apiTokenInstance,
              receiptId: res.receiptId,
              abortController,
            });
          } else {
            return res;
          }
        })
        .then(() => {
          if (!abortController.signal.aborted) {
            startPolling({ abortController });
          }
        })
        .catch(() => {
          setTimeout(() => {
            if (!abortController.signal.aborted) {
              startPolling({ abortController });
            }
          }, 2000);
        });
    };

    startPolling({ abortController });

    return () => {
      abortController.abort('unmount');
    };
  }, [apiTokenInstance, chatId, idInstance]);

  const handleSendMessage = (params: { message: string }) => {
    const { message } = params;
    return sendMessage({ message, chatId, idInstance, apiTokenInstance }).then((res) => {
      if (res.idMessage) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            messageText: message,
            isIncoming: false,
            messageId: res.idMessage,
          },
        ]);
      }
    });
  };
  return {
    messages,
    handleSendMessage,
    phoneNumber,
  };
};
