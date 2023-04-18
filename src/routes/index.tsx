import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import WorksList from '~/components/visual/work/list'

export default component$(() => {
  return <WorksList />
})

export const head: DocumentHead = {
  title: 'My personal website made with Qwik',
  meta: [
    {
      name: 'description',
      content: 'Copy of my personal website orinally made with Vue, using Qwik',
    },
  ],
}
