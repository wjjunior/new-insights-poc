<script lang="ts">
import { h, RendererElement, RendererNode, VNode } from 'vue'
import { Home } from '@/presentation/pages'

export default {
  render (): VNode<
    RendererNode,
    RendererElement,
    {
      [key: string]: any;
    }
    > {
    return h(Home, {})
  }
}
</script>
