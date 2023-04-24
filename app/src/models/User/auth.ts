/**
 * Запрос на авторизацию
 */
export type AuthorizationRequest = {
  phone: string;
  password: string;
};

/**
 * Ответ авторизации (токен)
 */
export type AuthorizationResponse = {
  accessToken: string;
};
