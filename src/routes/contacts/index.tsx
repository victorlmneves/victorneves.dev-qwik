import { component$ } from "@builder.io/qwik";
import ContactAddress from '~/components/starter/contacts/contacts-address'
import ContactForm from '~/components/starter/contacts/contacts-form'
import "./index.scss";

export default component$(() => {
  return (
    <div class="contacts">
      <ContactAddress />
      <ContactForm />
    </div>
  );
});
