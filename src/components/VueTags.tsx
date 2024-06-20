import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import type { Tag } from '../types/vueTags'
import SingleTag from './SingleTag'
import TagInput from './TagInput'

const VueTags = defineComponent({
  name: 'VueTags',
  props: {
    tags: {
      type: Array as PropType<Tag[]>,
      required: true,
    },
    handleAddition: {
      type: Function,
      default: Function as PropType<(tag: Tag) => void>,
    },
    // onRemove: {
    //   type: Function as PropType<(tags: Tag[]) => void>,
    //   default: () => {},
    // },
  },
  setup(props) {
    const tags = ref(props.tags)
    const onAdd = (value: string) => {
      const newTag: Tag = { id: String(tags.value.length + 1), name: value }
      tags.value.push(newTag)
    }
    return () => (
      <div>
        {tags.value.map((tag: Tag) => (
          <SingleTag
            key={tag.id}
            tag={tag}
            id={tag.id}
            name={tag.name}
          />
        ))}
        <TagInput onAddAction={onAdd} />
      </div>
    )
  },

})

export default VueTags
