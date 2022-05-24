import { KeycloakService } from "keycloak-angular";
import { switchMap } from "rxjs";
import { from } from 'rxjs';
import { ConfigInitService } from "./config-init.service";


export function initializeKeycloak(
  keycloak: KeycloakService,
  configService: ConfigInitService
  ) {
    return () =>
      configService.getConfig()
        .pipe(
          switchMap<any, any>((config) => {

            return from(keycloak.init({
              config: {
                url: config['KEYCLOAK_URL'] + '/auth',
                realm: config['KEYCLOAK_REALM'],
                clientId: config['KEYCLOAK_CLIENT_ID'],
              },
              initOptions: {
                checkLoginIframe: false,
                checkLoginIframeInterval: 25,
              },
              loadUserProfileAtStartUp: true
              }))
          })
        ).toPromise()
}