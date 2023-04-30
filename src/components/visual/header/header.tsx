import { component$, useContext, $ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { IsMenuOpenContext } from '~/root'
import { openCloseMenu } from '~/utils/open-close-menu'
import './header.scss'

export default component$(() => {
  const isMenuOpen = useContext(IsMenuOpenContext)

  const toggleMenu = $(() => {
    isMenuOpen.value = isMenuOpen.value === 'true' ? 'false' : 'true'
    openCloseMenu()
  })

  return (
    <header class="header">
      <div class="header__content">
        <div class="header__logo">
          <Link href="/" class="header__logo-link">
            Victor Neves
          </Link>
        </div>
        <span class="header__toggle-menu" onClick$={toggleMenu}>
          <i class="icon-menu"></i>
        </span>
      </div>
    </header>
  )
})
