import type { PropType } from 'vue'
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
    onDelete: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    const tagRef = ref()
    const name = ref(props.name)

    return () => (
      <div
        ref={tagRef.value}
        class="ml-2 bg-blue-400 text-white px-1.5 py-2 rounded"
      >
        <span class="mr-2">{name.value}</span>
        <RemoveComponent onRemove={props.onDelete} />
      </div>
    )
  },
})
export default SingleTag
