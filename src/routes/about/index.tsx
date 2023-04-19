import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import './index.scss'

export default component$(() => {
  return (
    <div class="about">
      <div class="about__item">
        <div class="about__content-wrapper">
          <div class="about__content">
            <h2 class="about__title">Hi! I'm Victor Neves</h2>
            <p class="about__info">
              Self-taught professional, competent, motivated and dedicated, experienced in Desktop Publishing and Web
              Development.
            </p>
          </div>
        </div>
        <div class="about__wrapper-img">
          <div
            class="about__image"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/vitorneves/image/upload/v1617370600/victorneves-static-images/me.jpg)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
})

export const head: DocumentHead = {
  title: 'About Victor Neves - Senior creative developer',
  meta: [
    {
      name: 'description',
      content:
        'Victor Neves - Senior creative developer | Copy of my personal website orinally made with Vue, using Qwik',
    },
    {
      property: 'og:site_name',
      content:
        'Victor Neves - Senior creative developer | Copy of my personal website orinally made with Vue, using Qwik',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://www.victorneves.dev',
    },
    {
      property: 'og:title',
      content:
        'Victor Neves - Senior creative developer | Copy of my personal website orinally made with Vue, using Qwik',
    },
    {
      property: 'og:description',
      content: 'Senior creative developer based in Portugal',
    },
    {
      property: 'og:image',
      content: 'https://res.cloudinary.com/vitorneves/image/upload/v1617370600/victorneves-static-images/me.jpg',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content:
        'Victor Neves - Senior creative developer | Copy of my personal website orinally made with Vue, using Qwik',
    },
    {
      name: 'twitter:description',
      content: 'Senior creative developer based in Portugal',
    },
    {
      name: 'twitter:image',
      content: 'https://res.cloudinary.com/vitorneves/image/upload/v1617370600/victorneves-static-images/me.jpg',
    },
  ],
}
