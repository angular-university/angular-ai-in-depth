import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalLoadingService {
  private readonly activeCount = signal(0);
  readonly loading = computed(() => this.activeCount() > 0);

  show() {
    this.activeCount.update(count => count + 1);
  }

  hide() {
    this.activeCount.update(count => Math.max(0, count - 1));
  }
}
