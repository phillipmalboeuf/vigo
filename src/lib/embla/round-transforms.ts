import type { EmblaCarouselType } from 'embla-carousel'
import type { CreatePluginType } from 'embla-carousel'

export type RoundTransformsPluginType = CreatePluginType<{}, Record<string, never>>

declare module 'embla-carousel' {
  interface EmblaPluginsType {
    roundTransforms: RoundTransformsPluginType
  }
}

function roundTransformValues(transform: string): string {
  return transform.replace(/(-?\d*\.?\d+(?:e[-+]?\d+)?)/gi, (match) =>
    String(Math.round(Number.parseFloat(match)))
  )
}

function applyRoundedTransform(container: HTMLElement) {
  const current = container.style.transform
  if (!current) return

  const rounded = roundTransformValues(current)
  if (rounded !== current) {
    container.style.transform = rounded
  }
}

function RoundTransformsPlugin(): RoundTransformsPluginType {
  let embla: EmblaCarouselType | undefined
  let originalTo: ((target: number) => void) | undefined

  function init(api: EmblaCarouselType) {
    embla = api
    const container = api.containerNode()
    const { translate } = api.internalEngine()
    originalTo = translate.to.bind(translate)

    translate.to = (target: number) => {
      originalTo!(target)
      applyRoundedTransform(container)
    }

    applyRoundedTransform(container)
  }

  function destroy() {
    if (embla && originalTo) {
      embla.internalEngine().translate.to = originalTo
    }

    embla = undefined
    originalTo = undefined
  }

  return {
    name: 'roundTransforms',
    options: {},
    init,
    destroy
  }
}

export default RoundTransformsPlugin
