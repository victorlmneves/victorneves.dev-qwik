import { component$, $ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { useAuthSignin } from '~/routes/plugin@auth'
import './index.scss'

export default component$(() => {
  const signIn = useAuthSignin()
  const logInAction = $(() => {
    signIn.submit({ providerId: 'auth0' })
  })

  return (
    <div class="login">
      <div class="login__item">
        <div class="login__content-wrapper">
          <div class="login__content">
            <h2 class="login__title">Hi! I'm Victor Neves</h2>
            <a class="main-menu__link" onClick$={logInAction}>
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
})

export const head: DocumentHead = {
  title: `About Victor Neves - Senior creative developer`,
}
