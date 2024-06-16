import { defineComponent, ref } from 'vue'
import RemoveComponent from './RemoveComponent'

const TagCompName = 'Tag'
const Tag = defineComponent({
  name: TagCompName,
  props: {
    id: '',
    name: '',
  },
  setup(props) {
    const tagRef = ref()
    return () => (
      <span
        ref={tagRef}
        class="ml-1 bg-blue-500 text-white px-2 py-1 rounded"
      >
        <span class="mr-1">{props.name}</span>
        <RemoveComponent />
      </span>
    )
  },
})
export default Tag
