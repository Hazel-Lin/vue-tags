import type { PropType } from 'vue'
import { defineComponent, nextTick, ref } from 'vue'
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
    handleChangeTag: {
      type: Function as PropType<(index: number, newText: string) => void>,
      default: () => {},
    },
    handleInputChange: {
      type: Function as PropType<(value: string, event: Event) => void>,
      default: () => {},
    },
    handleInputBlur: {
      type: Function as PropType<(value: string, event: FocusEvent) => void>,
      default: () => {},
    },
    classNames: {
      type: Object as PropType<Record<string, string>>,
      default: () => ({}),
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
    const newText = ref()
    const currentEditIndex = ref(-1)
    const inputRef = ref()
    const tagInputRef = ref()

    const isExist = ref(false)

    // TODO 优化 可以自定义类名
    const clearAllClass = 'cursor-pointer p-2.5 bg-red-500 text-white rounded border-none ml-2'

    const onAdd = (value: string) => {
      const newTag: Tag = { id: String(tags.value.length + 1), name: value }

      isExist.value = tags.value.some((tag: Tag) => tag.name === value)
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
      const value = (event.target as HTMLInputElement).value

      if (props.handleInputChange) {
        props.handleInputChange(value, event)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      const value = (event.target as HTMLInputElement).value
      if (event.key === 'Enter') {
        if (value) {
          currentEditIndex.value !== -1 ? props?.handleChangeTag?.(currentEditIndex.value, value) : onAdd(value)
        }
        currentEditIndex.value = -1
      }
    }
    const handleBlur = (event: FocusEvent) => {
      const value = (event.target as HTMLInputElement).value
      if (props.handleInputBlur) {
        props.handleInputBlur(value, event)
      }
      currentEditIndex.value = -1
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
        currentEditIndex.value !== -1 ? props?.handleChangeTag?.(currentEditIndex.value, clipboardText) : onAdd(clipboardText)
      }
      currentEditIndex.value = -1
    }
    function handleClickTag(index: number, text: string) {
      currentEditIndex.value = index
      // 自动 focus 函数
      nextTick(() => {
        tagInputRef.value?.focus()
        newText.value = text
      })
    }
    return () => (
      <div>
        <div class="flex">
          {tags.value.map((tag: Tag, index: number) => (
            <div>
              {currentEditIndex.value === index
                ? (
                  <input
                    ref={tagInputRef}
                    class="h-8"
                    type="text"
                    value={newText.value}
                    onChange={handleChange}
                    onKeydown={handleKeyDown}
                    onBlur={handleBlur}
                    onPaste={handlePaste}
                  />
                  )
                : (
                  <SingleTag
                    key={tag.id}
                    id={tag.id}
                    name={tag.name}
                    onDelete={(event: MouseEvent) => handleDeleteTag(index, event)}
                    onTagClicked={() => handleClickTag(index, tag.name)}
                  />
                  )}
            </div>
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
              class={clearAllClass}
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
