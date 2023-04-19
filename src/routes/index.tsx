import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { headTags } from '~/utils/head-tags'
import WorksList from '~/components/visual/work/list'

export default component$(() => {
  return <WorksList />
})

export const head: DocumentHead = {
  title: 'Victor Neves - Senior creative developer',
  meta: [...headTags],
}
