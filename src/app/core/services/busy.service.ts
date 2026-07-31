import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BusyService {
  busyRequestCount = 0;
  loading = signal(false);   // <-- reactive signal

  busy() {
    this.busyRequestCount++;
    this.loading.set(true);
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.loading.set(false);
    }
  }
}
