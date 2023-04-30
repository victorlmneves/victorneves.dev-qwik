import { component$, useContext, useSignal, $ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { IsMenuOpenContext } from '~/root'
import { userContext } from '~/routes/layout'
import { useAuthSignin, useAuthSignout } from '~/routes/plugin@auth'
import { openCloseMenu } from '~/utils/open-close-menu'
import './main-menu.scss'

export default component$(() => {
  const signIn = useAuthSignin()
  const signOut = useAuthSignout();
  const isMenuOpen = useContext(IsMenuOpenContext)
  const userState = useContext(userContext)
  const isLoggedIn = useSignal(userState.value === 'true' ? true : false)

  const toggleMenu = $(() => {
    isMenuOpen.value = isMenuOpen.value === 'true' ? 'false' : 'true'
    openCloseMenu()
  })

  const logInAction = $(() => {
    signIn.submit({ providerId: 'auth0' })
  })

  const logoutAction = $(() => signOut.submit({}))

  return (
    <nav class="main-menu" role="navigation">
      <span class="main-menu__icon" onClick$={toggleMenu}>
        <i class="icon-close"></i>
      </span>
      <div class="main-menu__wrapper">
        <ul class="main-menu__content" onClick$={toggleMenu}>
          <li class="main-menu__item">
            <Link class="main-menu__link" href="/">
              Home
            </Link>
          </li>
          <li class="main-menu__item">
            <Link class="main-menu__link" href="/contacts">
              Contacts
            </Link>
          </li>
          <li class="main-menu__item">
            <Link class="main-menu__link" href="/about">
              About
            </Link>
          </li>
          <li class="main-menu__item">
          {isLoggedIn.value ? (
            <a class="main-menu__link" onClick$={logoutAction}>Logout</a>
          ) : (
            <a class="main-menu__link" onClick$={logInAction}>Login</a>
          )}
          </li>
        </ul>
      </div>
    </nav>
  )
})
