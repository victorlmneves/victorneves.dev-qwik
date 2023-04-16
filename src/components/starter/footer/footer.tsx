import { component$ } from "@builder.io/qwik";
import "./footer.scss";

export default component$(() => {
  return (
    <footer class="footer">
      <p class="footer__text">
        Copyright ©2020 All rights reserved | info@victorneves.dev
      </p>
    </footer>
  );
});
