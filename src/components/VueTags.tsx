import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import type { Tag } from '../types/vueTags'
import SingleTag from './SingleTag'

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
    allowAdditionFromPaste: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    placeholder: {
      type: String as PropType<string>,
      default: 'Add new tag',
    },
    handleDelete: {
      type: Function as PropType<(index: number, event: MouseEvent) => void>,
      default: () => {},
    },
    handleClearAll: {
      type: Function as PropType<() => void>,
      default: () => {},
    },
  },
  setup(props) {
    const {
      allowAdditionFromPaste,
      placeholder,
      handleClearAll,
    } = props
    const tags = ref(props.tags)
    const inputText = ref()
    const inputRef = ref()
    const isExist = ref(false)

    const onAdd = (value: string) => {
      const newTag: Tag = { id: String(tags.value.length + 1), name: value }

      isExist.value = tags.value.some(tag => tag.name === value)
      !isExist.value && (tags.value.push(newTag) && (inputText.value = ''))
    }
    /**
     * @description 删除标签
     * @param index 标签索引
     * @param event 事件对象
     */
    function handleDeleteTag(index: number, event: MouseEvent) {
      event.preventDefault()
      event.stopPropagation()

      props?.handleDelete?.(index, event)
      tags.value.splice(index, 1)
    }
    function handleClick() {
      handleClearAll?.()
      tags.value = []
      inputText.value = ''
    }
    const handleChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      inputText.value = target.value
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      const value = (event.target as HTMLInputElement).value
      if (event.key === 'Enter') {
        if (value) {
          onAdd(value)
        }
      }
    }
    const handleBlur = (event: FocusEvent) => {
      const value = (event.target as HTMLInputElement).value
      if (value) {
        // onAdd(value)
      }
    }

    const handlePaste = (event: ClipboardEvent) => {
      if (!allowAdditionFromPaste) {
        return
      }
      // 解决粘贴后，输入框的值不清空的问题
      event.preventDefault()

      const clipboardData = event.clipboardData || (window as any).clipboardData
      const clipboardText = clipboardData.getData('text')
      if (clipboardText) {
        inputText.value = ''
        onAdd(clipboardText)
      }
    }
    const className = 'cursor-pointer p-2.5 bg-red-500 text-white rounded border-none ml-2'
    return () => (
      <div>
        <div class="flex">
          {tags.value.map((tag: Tag, index) => (
            <SingleTag
              key={tag.id}
              tag={tag}
              id={tag.id}
              name={tag.name}
              onDelete={(event: MouseEvent) => handleDeleteTag(index, event)}
            />
          ))}
        </div>
        <div class="mt-2 flex">
          <input
            class="h-8"
            ref={inputRef.value}
            type="text"
            value={inputText.value}
            placeholder={placeholder}
            onChange={handleChange}
            onKeydown={handleKeyDown}
            onBlur={handleBlur}
            onPaste={handlePaste}
            data-automation="input"
          />
          { tags.value.length > 0 && (
            <button
              onClick={handleClick}
              class={className}
            >
              一键清空
            </button>
          )}

        </div>
      </div>
    )
  },

})

export default VueTags
