// @ts-ignore: Unused import
import { component$, useStore, Resource, useResource$ } from "@builder.io/qwik";
import Item from "~/components/starter/work/item";
import "./list.scss";

export default component$(() => {
  // Use useResource$() to set up how the data is fetched from the server.
  const worksResource = useResource$<string[]>(({ cleanup }) => {
    // A good practice is to use `AbortController` to abort the fetching of data if
    // new request comes in. We create a new `AbortController` and register a `cleanup`
    // function which is called when this function re-runs.
    const controller = new AbortController();
    cleanup(() => controller.abort());

    // Fetch the data and return the promises.
    return fetchWorks(controller);
  });

  console.log("Render", worksResource);
  return (
    <Resource
      value={worksResource}
      onPending={() => <>Loading...</>}
      onRejected={(error) => <>Error: {error.message}</>}
      onResolved={(works) => (
        <section class="list">
          {works.map((work, i) => (
            <Item key={i} project={work} />
          ))}
        </section>
      )}
    />
  );
});

export async function fetchWorks(
  controller?: AbortController
): Promise<string[]> {
  const resp = await fetch(`https://api.victorneves.dev/works/read.php`, {
    signal: controller?.signal,
  });
  console.log("FETCH resolved");
  const json = await resp.json();
  return Array.isArray(json) ? json : Promise.reject(json);
}
