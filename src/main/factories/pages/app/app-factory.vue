<script lang="ts">
import { h, RendererElement, RendererNode, VNode } from 'vue'
import { App } from '@/presentation/pages'
import { makeLocalAccessTokenFactory } from '@/main/factories/usecases/access-token/local-access-token-factory'

export default {
  render (): VNode<
    RendererNode,
    RendererElement,
    {
      [key: string]: any;
    }
    > {
    return h(App, {
      accessToken: makeLocalAccessTokenFactory()
    })
  }
}
</script>
