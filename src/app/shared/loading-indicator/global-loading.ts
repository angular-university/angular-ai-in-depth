import { Component, inject, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoadingIndicator } from './loading-indicator';
import { GlobalLoadingService } from './global-loading.service';

@Component({
  selector: 'global-loading',
  imports: [LoadingIndicator],
  template: `<loading-indicator [visible]="loadingService.loading()" />`,
})
export class GlobalLoading implements OnInit {
  protected readonly loadingService = inject(GlobalLoadingService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loadingService.hide();
      }
    });
  }
}
