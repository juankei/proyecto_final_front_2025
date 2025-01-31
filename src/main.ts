import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from "@angular/common/http";
import { provideAuth0 } from '@auth0/auth0-angular';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-v1cdzbeeqnm4rfie.eu.auth0.com',
      clientId: 'LjRtaIuciCp927Je9RCPNC66d5ytYsgC',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
});
