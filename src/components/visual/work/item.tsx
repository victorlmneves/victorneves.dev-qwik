import { component$ } from '@builder.io/qwik'
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
  return (
    <div class="item">
      <div class="item__content-wrapper">
        <div class="item__content">
          <div class="item__content">
            <h2 class="item__title">
              <Link href={`work/${props.work.slug}`}>{props.work.client}</Link>
            </h2>
            <p class="item__info">{props.work.project}</p>
            <Link class="item__link" href={`work/${props.work.slug}`}>
              View Project
            </Link>
          </div>
        </div>
      </div>
      <div class="item__wrapper-img">
        <div
          class="item__image"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/vitorneves/image/upload/v1604866915/victorneves-static-images/${props.work.image})`,
          }}
        ></div>
      </div>
    </div>
  )
})
