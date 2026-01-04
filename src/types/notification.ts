// src/types/notification.ts

export type NotificationType = 'all' | 'unread' | 'trips' | 'promos';
export type NotificationItem = {
  id: string;
  type: 'trip' | 'promo';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: 'receipt' | 'gift';
};
