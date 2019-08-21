import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone) { }

  showSuccess(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, null, {duration: 3000, panelClass: ['alert', 'alert-success']});
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, 'X', {panelClass: ['alert', 'alert-danger']});
    });
  }
}
