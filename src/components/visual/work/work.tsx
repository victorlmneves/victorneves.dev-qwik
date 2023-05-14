import { component$, Resource, useResource$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import './item.scss'

interface IWork {
  id: string | number
  client: string
  project: string
  slug: string
  image: string
}

interface IProject {
  work: IWork
}

export default component$((props: IProject) => {
  const workResource = useResource$<any>(async () => {
    return props
  })

  return (
    <Resource
      value={workResource}
      onPending={() => <>Loading...</>}
      onRejected={(error) => <>Error: {error.message}</>}
      onResolved={(work) => (
        <div class="item">
          <div class="item__content-wrapper">
            <div class="item__content">
              <div class="item__content">
                <h2 class="item__title">
                  <Link href={`work/${work.slug}`}>{work.client}</Link>
                </h2>
                <p class="item__info">{work.project}</p>
                <Link class="item__link" href={`work/${work.slug}`}>
                  View Project
                </Link>
              </div>
            </div>
          </div>
          <div class="item__wrapper-img">
            <div
              class="item__image"
              style={{
                backgroundImage: `url(https://res.cloudinary.com/vitorneves/image/upload/v1604866915/victorneves-static-images/${work.image})`,
              }}
            ></div>
          </div>
        </div>
      )}
    />
  )
})
