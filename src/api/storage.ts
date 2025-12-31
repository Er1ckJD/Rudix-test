import { storage } from '@/utils/storage';

const TOKEN_KEY = 'userToken';

export const saveToken = async (token: string) => {
  await storage.setSecureItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  return await storage.getSecureItem(TOKEN_KEY);
};

export const deleteToken = async () => {
  await storage.removeSecureItem(TOKEN_KEY);
};