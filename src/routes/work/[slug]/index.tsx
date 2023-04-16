import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import "./index.scss";

export default component$(() => {
  const loc = useLocation();
  let slideIndex = 1;

  const showSlides = (n) => {
    let i;
    const images = document.querySelectorAll(".work__img");
    const nrOfImages = images.length;

    if (n > nrOfImages) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = nrOfImages;
    }

    for (i = 0; i < nrOfImages; i++) {
      images[i].style.display = "none";
    }

    images[slideIndex - 1].style.display = "block";
  };

  const navSlide = (n) => {
    const newIndex = (slideIndex += n);
    showSlides(newIndex);
  };

  // Use useResource$() to set up how the data is fetched from the server.
  const workResource = useResource$<string[]>(({ cleanup }) => {
    // A good practice is to use `AbortController` to abort the fetching of data if
    // new request comes in. We create a new `AbortController` and register a `cleanup`
    // function which is called when this function re-runs.
    const controller = new AbortController();
    cleanup(() => controller.abort());

    // Fetch the data and return the promises.
    return fetchWork(loc.params.slug, controller);
  });

  return (
    <Resource
      value={workResource}
      onPending={() => <>Loading...</>}
      onRejected={(error) => <>Error: {error.message}</>}
      onResolved={(work) => (
        <div class="work">
          {work.images.length > 1 && (
            <ul class="work__slideshow">
              <li class="work__nav">« prev</li>
              <li class="work__nav">next »</li>
            </ul>
          )}
          <div class="work__item">
            <div class="work__img-wrapper">
              {work.images.map((image, i) => (
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
  );
});

export async function fetchWork(
  slug: string,
  controller?: AbortController
): Promise<string[]> {
  const resp = await fetch(
    `https://api.victorneves.dev/work/read.php?slug=${slug}`,
    {
      signal: controller?.signal,
    }
  );
  console.log("FETCH resolved");
  const json = await resp.json();

  const workItem = json[0];
  const allImages = workItem.images.split(",");
  workItem.images = allImages;

  return Array.isArray(json) ? workItem : Promise.reject(json);
}
