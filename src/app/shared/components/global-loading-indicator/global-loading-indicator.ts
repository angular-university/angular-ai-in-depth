import { Component, inject, signal } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LoadingIndicator } from '../loading-indicator/loading-indicator';

@Component({
  selector: 'global-loading-indicator',
  imports: [LoadingIndicator],
  template: `
    @if (loading()) {
      <div class="router-loading-overlay" aria-live="polite" aria-label="Page loading">
        <loading-indicator />
      </div>
    }
  `,
  styles: [`
    .router-loading-overlay {
      position: fixed;
      inset: 0;
      z-index: 9000;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.35);
    }
  `]
})
export class GlobalLoadingIndicator {
  private readonly router = inject(Router);

  protected readonly loading = signal(false);

  constructor() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.loading.set(true);
      } else if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
        this.loading.set(false);
      }
    });
  }
}
