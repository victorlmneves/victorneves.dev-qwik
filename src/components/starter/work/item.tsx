import { component$ } from "@builder.io/qwik";
import "./item.scss";

interface IWork {
  id: string;
  type: string;
  client: string;
  project: string;
  description: string;
  slug: string;
  image: string;
}

export default component$((props: IWork) => {
  return (
    <div class="item">
      <div class="item__content-wrapper">
        <div class="item__content">
          <div class="item__content">
            <h2 class="item__title">
              <a href={`work/${props.project.slug}`}>{props.project.client}</a>
            </h2>
            <p class="item__info">{props.project.project}</p>
            <a class="item__link" href={`work/${props.project.slug}`}>
              View Project
            </a>
          </div>
        </div>
      </div>
      <div class="item__wrapper-img">
        <div
          class="item__image"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/vitorneves/image/upload/v1604866915/victorneves-static-images/${props.project.image})`,
          }}
        ></div>
      </div>
    </div>
  );
});
