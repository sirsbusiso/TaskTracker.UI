import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { apiInterceptor } from './app/core/interceptors/task-api-interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideAnimations(),
    importProvidersFrom(MatNativeDateModule),
  ],
});
