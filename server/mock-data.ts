import { StoredConversation } from './conversations-db';

export const mockConversations: StoredConversation[] = [
  {
    id: 'mock-conv-1',
    promptId: 'angular-assistant',
    createdAt: new Date('2024-12-01T10:00:00'),
    messages: [
      { role: 'user', content: 'How to create a component in Angular?' },
      {
        role: 'assistant',
        content:
          'You can create a component using the Angular CLI:\n\nng generate component my-component\n\nOr the shorthand: ng g c my-component\n\nIn Angular v17+, components are standalone by default. The CLI generates a TypeScript class, an HTML template, a SCSS stylesheet, and a spec file. Use the input() and output() functions to declare typed inputs and outputs, and signal() for local state.',
      },
      { role: 'user', content: 'How do I add an input property to it?' },
      {
        role: 'assistant',
        content:
          "Use the input() function from @angular/core:\n\nimport { input } from '@angular/core';\n\ntitle = input<string>();\ncount = input.required<number>();\n\nThis returns a Signal<T | undefined> for optional inputs and Signal<T> for required ones. Read the value in templates or computed signals with this.title() or this.count().",
      },
    ],
  },
  {
    id: 'mock-conv-2',
    promptId: 'angular-assistant',
    createdAt: new Date('2024-12-02T14:30:00'),
    messages: [
      { role: 'user', content: 'Angular routing how it works' },
      {
        role: 'assistant',
        content:
          "Angular routing maps URL paths to components via a routes array configured with provideRouter(routes) in app.config.ts. The router renders the matched component inside a <router-outlet> in your template.\n\nLazy loading is strongly recommended:\n\n{\n  path: 'feature',\n  loadComponent: () => import('./feature/feature').then(m => m.FeatureComponent)\n}\n\nThis splits your bundle and only loads code when the user navigates to that route.",
      },
      { role: 'user', content: 'What are route guards and how do I use them?' },
      {
        role: 'assistant',
        content:
          "Route guards are functions that decide whether navigation should proceed. Define a CanActivateFn:\n\nexport const authGuard: CanActivateFn = () => {\n  const profile = inject(UserProfileService).profile();\n  return profile ? true : inject(Router).createUrlTree(['/sign-in']);\n};\n\nAttach it to a route with canActivate: [authGuard]. Guards can return boolean, UrlTree, or a Promise/Observable of either.",
      },
    ],
  },
  {
    id: 'mock-conv-3',
    promptId: 'angular-assistant',
    createdAt: new Date('2024-12-03T09:15:00'),
    messages: [
      { role: 'user', content: 'What is a service in Angular?' },
      {
        role: 'assistant',
        content:
          "An Angular service is a class decorated with @Injectable that holds business logic, shared state, or data access. Set providedIn: 'root' to make it a singleton for the whole app.\n\nUse the inject() function to consume services in components:\n\nprivate readonly authService = inject(AuthService);\n\nServices are the right place for HTTP calls, signal-based state, and any logic shared across multiple components.",
      },
      { role: 'user', content: 'How do I share state between components using signals?' },
      {
        role: 'assistant',
        content:
          "Keep writable signals private in a service and expose them as readonly:\n\n@Injectable({ providedIn: 'root' })\nexport class CounterService {\n  private count = signal(0);\n  readonly value = this.count.asReadonly();\n  readonly doubled = computed(() => this.count() * 2);\n\n  increment() { this.count.update(n => n + 1); }\n}\n\nAny component that injects CounterService can read value() or doubled() reactively. Angular only re-renders the parts of the template that read a changed signal.",
      },
    ],
  },
];
