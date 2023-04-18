import { component$, $ } from "@builder.io/qwik";
import "./contacts-form.scss";

export default component$(() => {
  const handleSubmit = $(() => {
    alert("You have submitted the form.");
  });

  return (
    <div class="contact-form">
      <form onSubmit$={handleSubmit}>
        <div class="contact-form__group contact-form__group--flex">
          <input
            required
            name="name"
            type="text"
            class="contact-form__input"
            placeholder="Name"
          />
          <input
            required
            name="email"
            type="email"
            class="contact-form__input"
            placeholder="Email"
          />
        </div>
        <div class="contact-form__group">
          <textarea
            required
            name="message"
            class="contact-form__input contact-form__input--textarea"
            placeholder="Message"
          ></textarea>
        </div>
        <div class="contact-form__group">
          {/* {submitting && (
            <input
              type="submit"
              value="Sending..."
              class="contact-form__button contact-form__button--disabled"
              disabled
            />
          )}
          {!submitting && ( */}
          <input
            type="submit"
            value="Send Message"
            class="contact-form__button"
          />
          {/* )} */}
        </div>
      </form>
    </div>
  );
});
