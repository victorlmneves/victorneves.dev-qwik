import { component$ } from '@builder.io/qwik'
import './contacts-address.scss'

export default component$(() => {
  return (
    <div class="contact-address">
      <h3 class="contact-address__title">My Contacts</h3>
      <ul class="contact-address__list">
        <li class="contact-address__item">
          <span class="contact-address__icon">
            <i class="icon-phone4"></i>
          </span>
          + 351 96 480 54 53
        </li>
        <li class="contact-address__item">
          <span class="contact-address__icon">
            <i class="icon-envelope2"></i>
          </span>
          <a href="mailto:info@victorneves.dev">info@victorneves.dev</a>
        </li>
        <li class="contact-address__item">
          <span class="contact-address__icon">
            <i class="icon-globe3"></i>
          </span>
          <a target="#" href="https://www.victorneves.dev">
            www.victorneves.dev
          </a>
        </li>
      </ul>
    </div>
  )
})
