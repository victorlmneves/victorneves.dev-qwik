export const openCloseMenu = () => {
  const body = document.body
  body.classList.toggle('menu-is-open')
  const header = document.querySelector('.header')
  header?.classList.toggle('is-open')
  const nav = document.querySelector('.main-menu')
  nav?.classList.toggle('main-menu--open')
  const menuIsOpen = document.querySelector('#menuIsOpen')
  menuIsOpen?.classList.toggle('menu-is-open')
}
