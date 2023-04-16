import { component$ } from "@builder.io/qwik";
import "./index.scss";

export default component$(() => {
  return (
    <div class="about">
      <div class="about__item">
        <div class="about__content-wrapper">
          <div class="about__content">
            <h2 class="about__title">Hi! I'm Victor Neves</h2>
            <p class="about__info">
              Self-taught professional, competent, motivated and dedicated,
              experienced in Desktop Publishing and Web Development.
            </p>
          </div>
        </div>
        <div class="about__wrapper-img">
          <div
            class="about__image"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/vitorneves/image/upload/v1617370600/victorneves-static-images/me.jpg)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
});
