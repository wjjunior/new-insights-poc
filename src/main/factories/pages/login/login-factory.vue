<script lang="ts">
import { h, RendererElement, RendererNode, VNode } from 'vue'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthenticationUrl } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { makeLocalSaveAccessTokenFactory } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'

export default {
  render (): VNode<
    RendererNode,
    RendererElement,
    {
      [key: string]: any;
    }
    > {
    return h(Login, {
      authentication: makeRemoteAuthenticationUrl(),
      validation: makeLoginValidation(),
      saveAccessToken: makeLocalSaveAccessTokenFactory()
    })
  }
}
</script>
