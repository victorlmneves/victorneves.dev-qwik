import { Auth, skipCSRFCheck } from '@auth/core'
import type { AuthAction, AuthConfig, Session } from '@auth/core/types'
import { implicit$FirstArg, type QRL } from '@builder.io/qwik'
import {
  globalAction$,
  z,
  zod$,
  type RequestEvent,
  type RequestEventBase,
  type RequestEventCommon,
} from '@builder.io/qwik-city'
import { isServer } from '@builder.io/qwik/build'
import { parseString, splitCookiesString } from 'set-cookie-parser'

export interface QwikAuthConfig extends AuthConfig {}

const actions: AuthAction[] = [
  'providers',
  'session',
  'csrf',
  'signin',
  'signout',
  'callback',
  'verify-request',
  'error',
]

const fixCookies = (req: RequestEventCommon) => {
  req.headers.set('set-cookie', req.headers.get('set-cookie') || '')
  const cookie = req.headers.get('set-cookie')
  if (cookie) {
    req.headers.delete('set-cookie')
    splitCookiesString(cookie).forEach((cookie) => {
      const { name, value, ...rest } = parseString(cookie)
      req.cookie.set(name, value, rest as any)
    })
  }
}

const authAction = async (
  body: URLSearchParams | undefined,
  event: RequestEventCommon,
  path: string,
  authOptions: QwikAuthConfig
) => {
  const request = new Request(new URL(path, event.request.url), {
    method: event.request.method,
    headers: event.request.headers,
    body,
  })
  request.headers.set('content-type', 'application/x-www-form-urlencoded')
  const res = await Auth(request, {
    ...authOptions,
    skipCSRFCheck,
  })
  res.headers.forEach((value, key) => {
    event.headers.set(key, value)
  })
  fixCookies(event)

  try {
    return await res.json()
  } catch (error) {
    return await res.text()
  }
}

const getCurrentPageForAction = (req: RequestEventCommon) => {
  return req.url.href.split('/q-')[0]
}

type GetSessionResult = Promise<Session | null>

const getSessionData = async (event: Request, options: AuthConfig): GetSessionResult => {
  options.secret ??= 'g51OdEPk7VGPwK_gLKUr3'
  options.trustHost ??= true

  const url = new URL('/api/auth/session', event.url)
  const response = await Auth(new Request(url, { headers: event.headers }), options)
  // console.log("🚀 ~ file: qwik-auth.ts:80 ~ getSessionData ~ response:", response)

  const { status = 200 } = response
  const data = await response.json()

  if (!data || !Object.keys(data).length) {
    return null
  }

  if (status === 200) {
    return data
  }

  throw new Error(data.message)
}

export const onAuthRequestQrl = (configQrl: QRL<(event: RequestEventBase) => AuthConfig>) => {
  return {
    // eslint-disable-next-line qwik/loader-location
    useAuthSignin: globalAction$(
      async ({ providerId, callbackUrl, ...rest }, event) => {
        // console.log("🚀 ~ file: qwik-auth.ts:95 ~ providerId:", providerId)
        const config = await configQrl(event)

        callbackUrl ??= getCurrentPageForAction(event)
        console.log("🚀 ~ file: qwik-auth.ts:105 ~ callbackUrl:", callbackUrl)
        const body = new URLSearchParams({ callbackUrl })

        Object.entries(rest || {}).forEach(([key, value]) => {
          body.set(key, String(value))
        })

        const pathname = '/api/auth/signin' + (providerId ? `/${providerId}` : '')
        const data = await authAction(body, event, pathname, config)
        console.log("🚀 ~ file: qwik-auth.ts:108 ~ pathname:", pathname)

        if (data.url) {
          throw event.redirect(301, data.url)
        }
      },
      zod$({
        callbackUrl: z.string().optional(),
        providerId: z.string().optional(),
      })
    ),
    // eslint-disable-next-line qwik/loader-location
    useAuthSignout: globalAction$(
      async ({ callbackUrl }, event) => {
        const config = await configQrl(event)

        callbackUrl ??= getCurrentPageForAction(event)
        const body = new URLSearchParams({ callbackUrl })
        await authAction(body, event, `/api/auth/signout`, config)
      },
      zod$({
        callbackUrl: z.string().optional(),
      })
    ),
    getAuthSession: async (event: RequestEventBase) => {
      const promise = event.sharedMap.get('session')

      if (promise) {
        return promise
      }

      const config = await configQrl(event)
      const shared = getSessionData(event.request, config)
      event.sharedMap.set('session', shared)

      return shared
    },
    onRequest: async (event: RequestEvent) => {
      if (isServer) {
        const config = await configQrl(event)
        const prefix: string = '/api/auth'

        const action = event.url.pathname.slice(prefix.length + 1).split('/')[0] as AuthAction

        if (actions.includes(action) && event.url.pathname.startsWith(prefix + '/')) {
          const res = await Auth(event.request, config)
          const cookie = res.headers.get('set-cookie')
          if (cookie) {
            event.headers.set('set-cookie', cookie)
            res.headers.delete('set-cookie')
            fixCookies(event)
          }
          throw event.send(res)
        } else {
          const session = await getSessionData(event.request, config)
          event.sharedMap.set('session', session)
        }
      }
    },
  }
}

export const onAuthRequest$ = /*#__PURE__*/ implicit$FirstArg(onAuthRequestQrl)
