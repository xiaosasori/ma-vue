<template lang="pug">
  div
    table(style="background-color:blue")
      th
        td(style="background-color:red" @contextmenu.prevent="$refs.ctx.open")
          | Hello
        td(style="background-color:green" @contextmenu.prevent="$refs.ctx.open")
          | td2
      </th>
    context-menu(ref="ctx")
      ul(@contextmenu.prevent)
        li Menu 1
        li Menu 2
        li menu 3
</template>

<script>
import ContextMenu from '@/components/contextmenu/context-menu'
export default {
  components: {
    ContextMenu
  }
}
</script>