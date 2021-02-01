<script lang="ts">
import { h, RendererElement, RendererNode, VNode } from 'vue'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'

export default {
  render (): VNode<
    RendererNode,
    RendererElement,
    {
      [key: string]: any;
    }
    > {
    return h(Login, {
      authentication: makeRemoteAuthentication(),
      validation: makeLoginValidation()
    })
  }
}
</script>
