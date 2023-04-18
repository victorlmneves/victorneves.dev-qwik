// @ts-ignore: Unused import
import { component$, Resource, useResource$ } from '@builder.io/qwik'
import Item from '~/components/visual/work/item'
import './list.scss'

interface IWorks {
  id: string | number
  client: string
  project: string
  slug: string
  image: string
}

export const fetchWorks = () => {
  return fetch('https://api.victorneves.dev/works/read.php')
}

export default component$(() => {
  const works = useResource$(() => {
    const res = fetchWorks()
      .then((res) => {
        return res.json() as Promise<IWorks[]>
      })
      .catch((err) => {
        console.log(err)
        throw new Error('Error fetching works')
      })

    return res
  })

  return (
    <Resource
      value={works}
      onPending={() => <>Loading...</>}
      onRejected={(error) => <>Error: {error.message}</>}
      onResolved={(works) => (
        <section class="list">
          {works.map((work, index) => (
            <Item key={index} work={work} />
          ))}
        </section>
      )}
    />
  )
})
