import { Conversation } from './conversation.model';

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    title: 'What are the new features in Angular 19?',
    messages: [
      {
        id: 'm1-1',
        role: 'user',
        content: 'What are the new features and improvements in Angular 19?',
      },
      {
        id: 'm1-2',
        role: 'assistant',
        content: `Angular 19 introduces several exciting new features designed to enhance developer productivity and application performance. One of the standout improvements is the enhanced standalone components support, which simplifies the way developers build and manage components without the need for NgModules. This change streamlines the development process and reduces boilerplate code.

Additionally, Angular 19 brings improved hydration capabilities for server-side rendering, enabling faster initial page loads and better SEO performance. The framework also updates its compiler and runtime to optimize bundle sizes, resulting in quicker load times and more efficient applications.`,
      },
      {
        id: 'm1-3',
        role: 'user',
        content: 'What about the new signals APIs in Angular 19?',
      },
      {
        id: 'm1-4',
        role: 'assistant',
        content: `Angular 19 significantly expands the signals ecosystem with several new APIs:

**linkedSignal** — creates a writable signal that automatically resets when a source signal changes. This is perfect for dependent form fields or selections that should reset when a parent value changes.

**resource()** — provides a declarative way to load async data (like HTTP requests) that integrates natively with signals. The resource tracks loading, error, and data states as signals you can read directly in templates.

**toSignal() improvements** — better support for converting Observables to signals with more fine-grained control over the initial value and error handling.

These additions make it possible to build fully reactive, zoneless Angular apps using only the signals API — no RxJS required.`,
      },
    ],
  },
  {
    id: '2',
    title: 'How to create component in angular',
    messages: [
      {
        id: 'm2-1',
        role: 'user',
        content: 'How do I create a component in Angular?',
      },
      {
        id: 'm2-2',
        role: 'assistant',
        content: `To create a component in Angular, you can use the Angular CLI:

\`ng generate component my-component\`

or the shorthand:

\`ng g c my-component\`

This generates four files: a TypeScript class, an HTML template, a SCSS stylesheet, and a spec file for testing. In modern Angular, generated components are standalone by default and do not need to be declared in an NgModule.`,
      },
      {
        id: 'm2-3',
        role: 'user',
        content: 'What are the main parts of an Angular component?',
      },
      {
        id: 'm2-4',
        role: 'assistant',
        content: `An Angular component has three core parts:

1. **The TypeScript class** — decorated with @Component, it holds the component's logic, signals, and methods.
2. **The HTML template** — defines the UI structure, referenced via templateUrl.
3. **The CSS/SCSS styles** — scoped to the component by default, referenced via styleUrl.

In a signals-based, zoneless app, the class uses Angular's signal(), computed(), and effect() instead of RxJS observables for reactive state management. Inputs and outputs use the modern input() and output() functions rather than the decorator-based @Input() and @Output().`,
      },
    ],
  },
  {
    id: '3',
    title: 'Angular routing how it works',
    messages: [
      {
        id: 'm3-1',
        role: 'user',
        content: 'Can you explain how Angular routing works?',
      },
      {
        id: 'm3-2',
        role: 'assistant',
        content: `Angular's router maps URL paths to components. Here's the basic flow:

1. You define a Routes array where each entry maps a path to a component.
2. You provide the router with provideRouter(routes) in your app.config.ts.
3. You place a <router-outlet> in your app template — this is where routed components render.

When a user navigates to a URL, the router finds the matching route and renders the component inside the outlet. You can also use lazy loading (loadComponent) to split your app into smaller bundles that are only fetched when needed.`,
      },
      {
        id: 'm3-3',
        role: 'user',
        content: 'How do I navigate programmatically in Angular?',
      },
      {
        id: 'm3-4',
        role: 'assistant',
        content: `To navigate programmatically in Angular, inject the Router service using the inject() function and call navigate() or navigateByUrl():

\`\`\`typescript
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

export class MyComponent {
  private router = inject(Router);

  goToProfile(userId: string) {
    this.router.navigate(['/profile', userId]);
  }

  goToSearch() {
    this.router.navigateByUrl('/search?query=angular');
  }
}
\`\`\`

Use navigate() with an array of path segments when you want to compose routes programmatically, and navigateByUrl() when you already have a full URL string.`,
      },
    ],
  },
  {
    id: '4',
    title: 'What is service in angular',
    messages: [
      {
        id: 'm4-1',
        role: 'user',
        content: 'What is a service in Angular and when should I use one?',
      },
      {
        id: 'm4-2',
        role: 'assistant',
        content: `An Angular service is a class decorated with @Injectable that encapsulates shared logic, state, or data access. Use a service when:

- Multiple components need to share the same data or functionality.
- You want to separate business logic from presentation logic.
- You need to make HTTP requests to a backend API.
- You want to persist state across route navigations.

Services are provided via Angular's dependency injection system. With modern Angular, you typically set providedIn: 'root' to make the service a singleton available throughout the entire application.`,
      },
      {
        id: 'm4-3',
        role: 'user',
        content: 'How do I inject a service into a component?',
      },
      {
        id: 'm4-4',
        role: 'assistant',
        content: `In modern Angular, use the inject() function rather than constructor injection:

\`\`\`typescript
import { Component, inject } from '@angular/core';
import { UserService } from './user.service';

@Component({ ... })
export class UserListComponent {
  private userService = inject(UserService);

  users = this.userService.getUsers();
}
\`\`\`

The inject() function works anywhere in an injection context — inside component class fields, computed signals, or effects. It is the preferred approach in a signals-based Angular application and produces cleaner, more testable code than constructor injection.`,
      },
    ],
  },
  {
    id: '5',
    title: 'Angular signals explained',
    messages: [
      {
        id: 'm5-1',
        role: 'user',
        content: 'Can you explain Angular signals and how they differ from RxJS?',
      },
      {
        id: 'm5-2',
        role: 'assistant',
        content: `Angular signals are reactive primitives that represent a value that can change over time. When a signal's value changes, Angular automatically knows which parts of the UI depend on it and updates only those parts.

The key difference from RxJS is simplicity and synchronicity:
- Signals are synchronous — you read a signal's current value by calling it as a function: mySignal()
- Signals don't need subscriptions or pipe operators
- Signals integrate directly with Angular's change detection
- No memory leak risk from unsubscribed observables

RxJS is still useful for complex async event streams, but for component state and simple data flows, signals are the cleaner choice.`,
      },
      {
        id: 'm5-3',
        role: 'user',
        content: 'How do computed signals work?',
      },
      {
        id: 'm5-4',
        role: 'assistant',
        content: `Computed signals derive their value from other signals and automatically update when those dependencies change:

\`\`\`typescript
import { signal, computed } from '@angular/core';

const price = signal(100);
const quantity = signal(3);

const total = computed(() => price() * quantity());

console.log(total()); // 300

price.set(150);
console.log(total()); // 450 — automatically recalculated
\`\`\`

Computed signals are lazy and memoized — they only recalculate when a dependency changes, and only when they are actually read. This makes them highly efficient for derived state in Angular templates.`,
      },
    ],
  },
];

export const MOCK_AI_RESPONSES: string[] = [
  `That's a great question! Angular's signals-based reactivity model makes state management much simpler. Signals are reactive primitives that automatically notify dependents when their value changes, without needing Zone.js or RxJS subscriptions.`,
  `Angular's zoneless mode removes the Zone.js dependency entirely, giving you full control over change detection. Components update only when signals they read are written to, resulting in more predictable and efficient rendering.`,
  `When building Angular applications, always prefer composition over inheritance. Use signals for reactive state, services for shared business logic, and keep your components focused on presentation with minimal logic.`,
  `The key to effective Angular architecture is keeping components thin and pushing logic into injectable services. Services are singletons by default (with providedIn: 'root'), making them ideal for shared state and API communication.`,
  `Angular's inject() function is the modern way to consume dependencies. It works anywhere within an injection context — class fields, computed signals, and effects — making your code cleaner and easier to test than constructor injection.`,
];
