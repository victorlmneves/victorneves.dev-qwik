import type { Provider } from '@auth/core/providers'
import Auth0Provider from '@auth/core/providers/auth0'
import type { AuthConfig } from '@auth/core/types'
import type { RequestEventBase } from '@builder.io/qwik-city'

export const authConfig = (event: RequestEventBase): AuthConfig => {
  const secret = event.env.get('AUTH0_ISSUER_BASE_URL') || import.meta.env.AUTH0_ISSUER_BASE_URL;
  const clientId = event.env.get('AUTH0_CLIENT_ID') || import.meta.env.AUTH0_CLIENT_ID;
  const clientSecret = event.env.get('AUTH0_CLIENT_SECRET') || import.meta.env.AUTH0_CLIENT_SECRET;
  const issuer = event.env.get('AUTH0_ISSUER_BASE_URL') || import.meta.env.AUTH0_ISSUER_BASE_URL;

  return {
    secret,
    trustHost: true,
    providers: [
      Auth0Provider({
        clientSecret,
        clientId,
        issuer,
        checks: ['state'],
        authorization: {
          params: {
            scope: 'openid profile email offline_access read:bsr:cmdm read:bsr:pc read:bsr:thunderhead read:bsr:permission read:bsr:pin',
            responseType: 'code',
          },
        },
      }),
    ] as Provider[],
  };
};