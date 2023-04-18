import { component$, $ } from '@builder.io/qwik'
import './newsletter.scss'

export default component$(() => {
  const handleSubmit = $(() => {
    alert('You have submitted the form.')
  })

  return (
    <div class="newsletter">
      <h3 class="newsletter__title">Subscribe Newsletter</h3>
      <p class="newsletter__text">Subscribe our newsletter and get latest update</p>
      <div class="newsletter__group">
        <form
          preventdefault:submit
          onSubmit$={handleSubmit}
          action="https://dev.us1.list-manage.com/subscribe/post?u=0bfab83c7d1ac1ce846909de6&amp;id=87b6b5acbf"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          class="validate"
          target="_blank"
          noValidate
        >
          <label class="is-hidden">Email</label>
          <input type="email" value="" name="EMAIL" id="mce-EMAIL" class="newsletter__input" placeholder="Your email" />
          <input
            type="submit"
            value="Subscribe"
            name="subscribe"
            id="mc-embedded-subscribe"
            class="newsletter__button"
          />
        </form>
      </div>
    </div>
  )
})
