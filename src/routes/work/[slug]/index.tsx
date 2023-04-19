import { component$, Resource, useResource$, useSignal, useTask$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { isServer } from '@builder.io/qwik/build'
import { headTags } from '~/utils/head-tags'
import './index.scss'

export const useWork = routeLoader$(async (requestEvent) => {
  const slug = requestEvent.url.pathname.substring(6).replace('/', '')
  const res = await fetch(`https://api.victorneves.dev/work/read.php?slug=${slug}`)
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

export default component$(() => {
  const slideIndex = useSignal(1)
  const nrOfImages = useSignal(0)
  const workData = useWork()
  const work = { ...workData.value }

  useTask$(async (taskContext) => {
    taskContext.track(() => slideIndex.value)

    if (slideIndex.value > nrOfImages.value) {
      slideIndex.value = 1
    }

    if (slideIndex.value < 1) {
      slideIndex.value = nrOfImages.value
    }

    if (isServer) {
      return // Server guard
    }

    const images = document.querySelectorAll('.work__img') as NodeListOf<HTMLDivElement>

    for (let i = 0; i < nrOfImages.value; i++) {
      images[i].style.display = 'none'
    }

    images[slideIndex.value - 1].style.display = 'block'
  })

  const workResource = useResource$<any>(async () => {
    const workItem = work
    const allImages = workItem.images.split(',')
    workItem.allImages = allImages
    nrOfImages.value = allImages.length

    return workItem
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
              <li
                onClick$={() => (slideIndex.value >= slideIndex.value ? slideIndex.value-- : slideIndex.value++)}
                class="work__nav"
              >
                « prev
              </li>
              <li
                onClick$={() => (slideIndex.value <= slideIndex.value ? slideIndex.value++ : slideIndex.value--)}
                class="work__nav"
              >
                next »
              </li>
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

export const head: DocumentHead = ({ resolveValue }) => {
  const { client } = resolveValue(useWork)

  return {
    title: `${client} | Victor Neves - Senior creative developer`,
    meta: [...headTags],
  }
}
