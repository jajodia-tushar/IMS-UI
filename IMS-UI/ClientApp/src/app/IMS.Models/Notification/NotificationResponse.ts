import { Notification } from './Notification';
import { PagingInfo } from '../Shared/PagingInfo';
import { Response } from '../Response';

export class NotificationResponse extends Response {
    notifications: Notification[];
    pagingInfo: PagingInfo;
}