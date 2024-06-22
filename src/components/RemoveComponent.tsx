import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'

const RemoveComponent = defineComponent({
  name: 'RemoveComponent',
  props: {
    onRemove: {
      type: Function as PropType<(event: MouseEvent) => void>,
      default: () => {},
    },
  },
  setup(props) {
    const removeRef = ref()
    const { onRemove } = props
    return () => (
      <span
        ref={removeRef}
        class="cursor-pointer"
        onClick={onRemove}
      >
        x
      </span>
    )
  },
})

export default RemoveComponent
