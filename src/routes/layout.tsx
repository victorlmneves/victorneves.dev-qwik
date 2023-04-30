import { type Signal, component$, Slot, createContextId, useContextProvider, useSignal } from '@builder.io/qwik'
import { useLocation, routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { getAuthSession } from '~/routes/plugin@auth'
import Header from '~/components/visual/header/header'
import MainMenu from '~/components/visual/main-menu/main-menu'
import Newsletter from '~/components/visual/footer/newsletter'
import Footer from '~/components/visual/footer/footer'
import { headTags } from '~/utils/head-tags'

export const userContext = createContextId<Signal<string>>('user-context')

export const useUserSignInState = routeLoader$(async (event) => {
  const session = await getAuthSession(event)

  if (!session) {
    return false
  }

  return true
})

export default component$(() => {
  const isLoggedIn = useUserSignInState()

  const loggedInState = useSignal(isLoggedIn.value ? 'true' : 'false')
  useContextProvider(userContext, loggedInState)

  const location = useLocation()
  const isWorkDetailsPage = location.url.pathname.includes('/work/')
  const isAboutPage = location.url.pathname.includes('/about')
  const isContactPage = location.url.pathname.includes('/contacts')
  const cssContainerClass = isWorkDetailsPage ? 'container container--full' : 'container'

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
  )
})

export const head: DocumentHead = () => {
  return {
    meta: [...headTags],
  }
}
