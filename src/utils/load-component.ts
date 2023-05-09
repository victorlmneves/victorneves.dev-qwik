export const loadComponent = (name: string) =>
  import(/* @vite-ignore */ `../components/visual/${name}/${name}.tsx`).then((module) => module.default)
