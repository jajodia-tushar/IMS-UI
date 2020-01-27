import { Notification } from './Notification';
import { PagingInfo } from '../Shared/PagingInfo';

export class NotificationResponse extends Response{
    notifications: Notification[];
    pagingInfo: PagingInfo;
}