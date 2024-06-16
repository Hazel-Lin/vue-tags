import { defineComponent, ref } from 'vue'

const RemoveComponent = defineComponent({
  name: 'RemoveComponent',
  props: {
    // removeComponent: () => {},
    // onRemove: () => {},
  },
  setup() {
    const removeRef = ref()
    return () => (
      <span
        ref={removeRef}
        class="cursor-pointer"
      >
        x
      </span>
    )
  },
})

export default RemoveComponent
