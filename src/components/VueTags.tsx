import type { PropType } from 'vue'
import { defineComponent, nextTick, ref } from 'vue'
import { useDraggable } from 'vue-draggable-plus'
import type { Tag } from '../types/vueTags'
import { INPUT_FIELD_POSITIONS } from '../common/constants'
import SingleTag from './SingleTag'
import { hasEditItem } from '@/utils'

const name = 'VUE_TAGS'

const VueTags = defineComponent({
  name,
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
    handleDrag: {
      type: Function as PropType<(tags: Tag[]) => void>,
      default: () => {},
    },
    classNames: {
      type: Object as PropType<Record<string, string>>,
      default: () => ({}),
    },
    maxTags: {
      type: Number as PropType<number>,
      default: -1,
    },
    allowDrag: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    // 是否可编辑
    editable: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    inputFieldPosition: {
      type: String as PropType<'top' | 'bottom' | 'inline'>,
      default: 'bottom',
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    allowUnique: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    clearAllText: {
      type: String as PropType<string>,
      default: '一键清空',
    },
    clearAll: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup(props) {
    const {
      allowAdditionFromPaste,
      placeholder,
      maxTags,
      allowDrag,
      editable,
      inputFieldPosition,
      allowUnique,
      readOnly,
      tags,
      clearAllText,
      clearAll,
      handleClearAll,
      handleDelete,
      handleInputChange,
      handleInputBlur,
    } = props
    const tagList = ref(tags)
    const inputText = ref()
    const newText = ref()
    const currentEditIndex = ref(-1)
    const inputRef = ref()
    const tagInputRef = ref()
    const isExist = ref(false)

    // TODO 优化 可以自定义类名
    const clearAllClass = 'cursor-pointer p-2.5 bg-red-500 text-white rounded border-none ml-2'

    const onAdd = (value: string) => {
      // 是否存在重复的标签 allowUnique
      if (!allowUnique) {
        isExist.value = tagList.value.some((tag: Tag) => tag.name === value)
      }

      const newTag: Tag = { id: String(tagList.value.length + 1), name: value }

      // 不存在重复的标签 且 没有达到最大标签数
      !hasMaxTags() && !isExist.value && (tagList.value.push(newTag) && (inputText.value = ''))
    }
    /**
     * @description 删除标签
     * @param index 标签索引
     * @param event 事件对象
     */
    function handleDeleteTag(index: number, event: MouseEvent) {
      event.preventDefault()
      event.stopPropagation()

      handleDelete?.(index, event)
      tagList.value.splice(index, 1)
    }

    function handleClickClearAll() {
      handleClearAll?.()
      tagList.value = []
      inputText.value = ''
    }
    const handleChange = (event: Event) => {
      const value = (event.target as HTMLInputElement).value
      // 避免 newText 和 inputText 互相影响
      if (!newText.value) {
        inputText.value = value
      }

      if (handleInputChange) {
        handleInputChange(value, event)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      const value = (event.target as HTMLInputElement).value
      if (event.key === 'Enter' && value) {
        if (hasEditItem(currentEditIndex.value)) {
          props?.handleChangeTag?.(currentEditIndex.value, value)
        }
        else {
          onAdd(value)
        }
        currentEditIndex.value = -1
      }
    }
    const handleBlur = (event: FocusEvent) => {
      const value = (event.target as HTMLInputElement).value
      if (handleInputBlur) {
        handleInputBlur(value, event)
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
        hasEditItem(currentEditIndex.value) ? props?.handleChangeTag?.(currentEditIndex.value, clipboardText) : onAdd(clipboardText)
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
    function hasMaxTags() {
      if (!hasEditItem(maxTags)) {
        return false
      }
      return tagList.value.length >= maxTags
    }
    const el = ref()
    if (allowDrag) {
      useDraggable(el, tagList, {
        animation: 150,
        onUpdate() {
          props?.handleDrag(tagList.value)
        },
      })
    }
    // 输入框组件
    const inputComponent = () => (
      <div class="flex">
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
        {clearAll && tagList.value.length > 0 && (
          <button
            onClick={handleClickClearAll}
            class={clearAllClass}
          >
            {clearAllText}
          </button>
        )}
      </div>
    )

    return () => (
      <div class="grid gap-sm">
        {readOnly && inputFieldPosition === INPUT_FIELD_POSITIONS.TOP && inputComponent()}
        <div class="flex gap-2">
          <div
            ref={el}
            class="flex"
          >
            {tagList.value.map((tag: Tag, index: number) => (
              <div key={tag.id}>
                {currentEditIndex.value === index && editable
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
                      class={allowDrag && 'cursor-move'}
                    />
                    )}
              </div>
            ))}
          </div>
          {readOnly && inputFieldPosition === INPUT_FIELD_POSITIONS.INLINE && inputComponent()}
        </div>

        {readOnly && inputFieldPosition === INPUT_FIELD_POSITIONS.BOTTOM && inputComponent()}
      </div>
    )
  },

})

export default VueTags
