import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, RouterModule } from '@angular/router';  // Import RouterModule for routing configuration
import { LoginComponent } from './app/login/login.component'; 
import { RegisterComponent } from './app/register/register.component'; 
import { AppComponent } from './app/app.component';  // Root component


import {routes} from './app/app.routes';

// Bootstrap the application
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ],
  
});
