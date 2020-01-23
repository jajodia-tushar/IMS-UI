import { Notification } from './Notification';

export class NotificationResponse extends Response{
    notifications: Notification[];
}