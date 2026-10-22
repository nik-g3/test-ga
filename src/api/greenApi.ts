const baseUrl = import.meta.env.VITE_GREEN_API_BASE_URL;

interface ConnectParams {
  idInstance: string;
  apiTokenInstance: string;
}
interface ConnectResponse {
  stateInstance:
    'notAuthorized' | 'authorized' | 'blocked' | 'suspended' | 'starting' | 'pendingPassword';
}

export const connect = ({
  idInstance,
  apiTokenInstance,
}: ConnectParams): Promise<ConnectResponse> => {
  return fetch(`${baseUrl}waInstance${idInstance}/getStateInstance/${apiTokenInstance}`).then(
    (res) => {
      if (res.status === 401) {
        throw new Error('Не удалось подключиться к апи');
      }

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      return res.json();
    },
  );
};

interface CheckAccountParams {
  phoneNumber: number;
  idInstance: string;
  apiTokenInstance: string;
}
interface CheckAccountResponse {
  exist: boolean;
  chatId: string;
  username: string;
  phoneNumber: number;
  fromCache: boolean;
}

export const checkAccount = ({
  phoneNumber,
  idInstance,
  apiTokenInstance,
}: CheckAccountParams): Promise<CheckAccountResponse> => {
  return fetch(`${baseUrl}waInstance${idInstance}/checkAccount/${apiTokenInstance}`, {
    method: 'POST',
    body: JSON.stringify({ phoneNumber }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    return res.json();
  });
};

interface SendMessageParams {
  chatId: string;
  idInstance: string;
  apiTokenInstance: string;
  message: string;
}
interface SendMessageResponse {
  idMessage: string;
}

export const sendMessage = ({
  message,
  chatId,
  idInstance,
  apiTokenInstance,
}: SendMessageParams): Promise<SendMessageResponse> => {
  return fetch(`${baseUrl}waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
    method: 'POST',
    body: JSON.stringify({ message, chatId }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    return res.json();
  });
};

interface FetchNotificationParams {
  idInstance: string;
  apiTokenInstance: string;
  abortController: AbortController;
}

interface FetchNotificationResponse {
  receiptId: number;
  body: {
    typeWebhook: string;
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
      chatId: string;
      chatName: string;
      sender: string;
      senderName: string;
      senderContactName: string;
      senderPhoneNumber: number;
    };
    messageData: {
      typeMessage: string;
      textMessageData: {
        textMessage: string;
      };
    };
  };
}

export const fetchNotification = ({
  idInstance,
  apiTokenInstance,
  abortController,
}: FetchNotificationParams): Promise<FetchNotificationResponse> => {
  return fetch(`${baseUrl}waInstance${idInstance}/receiveNotification/${apiTokenInstance}`, {
    signal: abortController.signal,
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    return res.json();
  });
};

interface DeleteNotificationParams {
  receiptId: number;
  idInstance: string;
  apiTokenInstance: string;
  abortController: AbortController;
}

export const deleteNotification = ({
  idInstance,
  apiTokenInstance,
  receiptId,
  abortController,
}: DeleteNotificationParams): Promise<void> => {
  return fetch(
    `${baseUrl}waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    {
      method: 'DELETE',
      signal: abortController.signal,
    },
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
  });
};
