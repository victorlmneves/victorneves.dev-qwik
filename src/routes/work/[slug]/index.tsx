import { component$, Resource, useResource$ } from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import './index.scss'

export const fetchWork = (slug: String) => {
  return fetch(`https://api.victorneves.dev/work/read.php?slug=${slug}`)
}

export default component$(() => {
  const loc = useLocation()

  const workResource = useResource$<any>(async () => {
    const res = await fetch(`https://api.victorneves.dev/work/read.php?slug=${loc.params.slug}`)
    const data = res.json()

    return data.then(
      (res) => {
        const workItem = res[0]
        const allImages = workItem.images.split(',')
        workItem.allImages = allImages

        return res[0]
      },
      (error) => {
        console.log(error)
      }
    )
  })

  return (
    <Resource
      value={workResource}
      onPending={() => <>Loading...</>}
      onRejected={(error) => <>Error: {error.message}</>}
      onResolved={(work) => (
        <div class="work">
          {work.allImages.length > 1 && (
            <ul class="work__slideshow">
              <li class="work__nav">« prev</li>
              <li class="work__nav">next »</li>
            </ul>
          )}
          <div class="work__item">
            <div class="work__img-wrapper">
              {work.allImages.map((image: string, i: number) => (
                <div
                  key={i}
                  class="work__img"
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/vitorneves/image/upload/v1604866915/victorneves-static-images/${image})`,
                  }}
                ></div>
              ))}
            </div>
            <div class="work__content-wrapper">
              <div class="work__content">
                <h2 class="work__title">{work.client}</h2>
                <p class="work__info">{work.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  )
})
