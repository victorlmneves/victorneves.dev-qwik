import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import ContactAddress from '~/components/visual/contacts/contacts-address'
import ContactForm from '~/components/visual/contacts/contacts-form'
import { headTags } from '~/utils/head-tags'
import './index.scss'

export default component$(() => {
  return (
    <div class="contacts">
      <ContactAddress />
      <ContactForm />
    </div>
  )
})

export const head: DocumentHead = {
  title: 'Contact Victor Neves - Senior creative developer',
}
