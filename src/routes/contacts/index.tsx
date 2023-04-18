import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import ContactAddress from '~/components/visual/contacts/contacts-address'
import ContactForm from '~/components/visual/contacts/contacts-form'
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
  title: 'Contacts page',
  meta: [
    {
      name: 'description',
      content: 'Copy of my personal website orinally made with Vue, using Qwik',
    },
  ],
}
