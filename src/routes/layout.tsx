import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";

import Header from "~/components/starter/header/header";
import MainMenu from "~/components/starter/main-menu/main-menu";
import Newsletter from "~/components/starter/footer/newsletter";
import Footer from "~/components/starter/footer/footer";

export default component$(() => {
  const location = useLocation();
  const isWorkDetailsPage = location.url.pathname.includes("/work/");
  const isAboutPage = location.url.pathname.includes("/about");
  const isContactPage = location.url.pathname.includes("/contacts");
  const cssContainerClass = isWorkDetailsPage
    ? "container container--full"
    : "container";

  return (
    <div id="app">
      <div id="menuIsOpen"></div>
      <div class={cssContainerClass}>
        <MainMenu />
        <Header />
        <main>
          <Slot />
        </main>
        {!isWorkDetailsPage && !isAboutPage && !isContactPage && <Newsletter />}
        {!isWorkDetailsPage && <Footer />}
      </div>
    </div>
  );
});
