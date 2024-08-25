import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NotificationComponent } from '../common/components/notifcation/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private dialog: MatDialog) {}

  show(message: string, title?: string): void {
    this.dialog.open(NotificationComponent, {
      data: { message, title },
    });
  }
}
