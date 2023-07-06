import { component$, useSignal, $ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import './main-menu.scss'

export default component$(() => {
  const isMenuOpen = useSignal(false as boolean)

  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value
    const body = document.body
    body.classList.remove('menu-is-open')
    const header = document.querySelector('.header')
    header?.classList.remove('is-open')
    const nav = document.querySelector('.main-menu')
    nav?.classList.remove('main-menu--open')
    const menuIsOpen = document.querySelector('#menuIsOpen')
    menuIsOpen?.classList.remove('menu-is-open')
  })

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
            <Link class="main-menu__link" href="/about">
              About
            </Link>
          </li>
          <li class="main-menu__item">
            <a class="main-menu__link" target="_blank" href="http://localhost:3000/?type=success&message=This%20is%20a%20success%20message">
              Playground
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
})
