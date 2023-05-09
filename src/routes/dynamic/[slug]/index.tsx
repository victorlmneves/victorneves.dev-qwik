import { component$, Resource, useResource$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import jsonData from '~/data/scene.json'
import { loadComponent } from '~/utils/load-component'

export const useScene = routeLoader$(async (/*requestEvent*/) => {
  // requestEvent
  // This code runs only on the server, after every navigation
  const scene = jsonData.data.components

  return scene
})

const dynamicComponent = (appearance: string) => loadComponent(appearance)

export default component$(() => {
  // In order to access the `routeLoader$` data within a Qwik Component, you need to call the hook.
  const signal = useScene() // Readonly<Signal<Product>>

  const workResource = useResource$<any>(async () => {
    return signal.value
  })

  const MyComponent = signal.value.map(async (props) => {
    const Component = await dynamicComponent(props.appearance)

    // return Component
    const customKey = props.appearance

    if (!Component) {
      return <div key="notFound">Component not found</div>
    }

    return <Component key={customKey} {...props.data} />
  })

  return (
    <Resource
      value={workResource}
      onPending={() => <>Loading...</>}
      onRejected={(error) => <>Error: {error.message}</>}
      onResolved={() => MyComponent as any}
    />
  )

  // return signal.value.map(async (props) => {
  //   const Component = await dynamicComponent(props.appearance)
  //   // console.log("🚀 ~ file: index.tsx:21 ~ returnsignal.value.map ~ Component:", Component)
  //   const customKey = props.appearance

  //   if (!Component) {
  //     return <div key="notFound">Component not found</div>
  //   }

  //   return <Component key={customKey} {...props.data} />
  // }) as any
})
