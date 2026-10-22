const baseUrl = import.meta.env.VITE_GREEN_API_BASE_URL

interface ConnectParams {
  idInstance: string;
  apiTokenInstance: string;
}

export const connect = ({ idInstance, apiTokenInstance }: ConnectParams) => {
  return fetch(`${baseUrl}waInstance${idInstance}/getStateInstance/${apiTokenInstance}`).then(
    (res) => {
      if (res.status === 401) {
        throw new Error("Не удалось подключиться к апи");
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

export const checkAccount = ({ phoneNumber, idInstance, apiTokenInstance }: CheckAccountParams) => {
  return fetch(`${baseUrl}waInstance${idInstance}/checkAccount/${apiTokenInstance}`, {
    method: 'POST',
    body: JSON.stringify({ phoneNumber }),
  }).then((res) => res.json());
};

interface SendMessageParams {
  chatId: string;
  idInstance: string;
  apiTokenInstance: string;
  message: string;
}

export const sendMessage = ({
  message,
  chatId,
  idInstance,
  apiTokenInstance,
}: SendMessageParams) => {
  return fetch(`${baseUrl}waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
    method: 'POST',
    body: JSON.stringify({ message, chatId }),
  }).then((res) => res.json());
};

interface FetchNotificationParams {
  idInstance: string;
  apiTokenInstance: string;
  abortController: AbortController;
}

export const fetchNotification = ({
  idInstance,
  apiTokenInstance,
  abortController,
}: FetchNotificationParams) => {
  return fetch(`${baseUrl}waInstance${idInstance}/receiveNotification/${apiTokenInstance}`, {
    signal: abortController.signal,
  }).then((res) => res.json());
};

interface DeleteNotificationParams {
  receiptId: string;
  idInstance: string;
  apiTokenInstance: string;
  abortController: AbortController;
}

export const deleteNotification = ({
  idInstance,
  apiTokenInstance,
  receiptId,
  abortController,
}: DeleteNotificationParams) => {
  return fetch(
    `${baseUrl}waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    {
      method: 'DELETE',
      signal: abortController.signal,
    },
  );
};
