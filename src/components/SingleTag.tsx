import { defineComponent, ref } from 'vue'
import RemoveComponent from './RemoveComponent'

const TagCompName = 'SingleTag'
const SingleTag = defineComponent({
  name: TagCompName,
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const tagRef = ref()
    const name = ref(props.name)
    return () => (
      <span
        ref={tagRef}
        class="ml-1 bg-blue-500 text-white px-2 py-1 rounded"
      >
        <span class="mr-1">{name.value}</span>
        <RemoveComponent />
      </span>
    )
  },
})
export default SingleTag
