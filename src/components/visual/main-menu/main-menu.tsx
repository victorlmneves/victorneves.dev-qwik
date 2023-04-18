import { component$, useSignal, $ } from "@builder.io/qwik";
import "./main-menu.scss";

export default component$(() => {
  const isMenuOpen = useSignal(false as boolean);

  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
    const body = document.body;
    body.classList.remove("menu-is-open");
    const header = document.querySelector(".header");
    header?.classList.remove("is-open");
    const nav = document.querySelector(".main-menu");
    nav?.classList.remove("main-menu--open");
    const menuIsOpen = document.querySelector("#menuIsOpen");
    menuIsOpen?.classList.remove("menu-is-open");
  });

  return (
    <nav class="main-menu" role="navigation">
      <span class="main-menu__icon" onClick$={toggleMenu}>
        <i class="icon-close"></i>
      </span>
      <div class="main-menu__wrapper">
        <ul class="main-menu__content">
          <li class="main-menu__item">
            <a class="main-menu__link" href="/" onClick$={toggleMenu}>
              Home
            </a>
          </li>
          <li class="main-menu__item">
            <a class="main-menu__link" href="/contacts" onClick$={toggleMenu}>
              Contacts
            </a>
          </li>
          <li class="main-menu__item">
            <a class="main-menu__link" href="/about" onClick$={toggleMenu}>
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
});