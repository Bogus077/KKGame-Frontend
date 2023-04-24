/**
 * Запрос на авторизацию
 */
export type SignUpRequest = {
  phone: string;
  password: string;
  code: string;
};

/**
 * Ответ авторизации (пользователь + токен)
 */
export type SignUpResponse = {
  id: number;
  name: string;
  surname: string;
  phone: string;
  accessToken: string;
};
