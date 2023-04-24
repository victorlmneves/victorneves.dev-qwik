import { component$, useSignal, $ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import './header.scss'

export default component$(() => {
  const isMenuOpen = useSignal(false as boolean)

  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value
    const body = document.body
    body.classList.add('menu-is-open')
    const header = document.querySelector('.header')
    header?.classList.add('is-open')
    const nav = document.querySelector('.main-menu')
    nav?.classList.add('main-menu--open')
    const menuIsOpen = document.querySelector('#menuIsOpen')
    menuIsOpen?.classList.add('menu-is-open')
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
