import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import { TAG_DELETE_TEST_ID } from '@/common/constants'

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
        class="cursor-pointer ml-2 vue-tags__remove"
        onClick={onRemove}
        data-testid={TAG_DELETE_TEST_ID}
      >
        x
      </span>
    )
  },
})

export default RemoveComponent
