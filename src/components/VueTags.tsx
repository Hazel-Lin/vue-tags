import type { PropType } from 'vue'
import { defineComponent, nextTick, ref } from 'vue'
import { useDraggable } from 'vue-draggable-plus'
import type { Tag } from '../types/vueTags'
import { INPUT_FIELD_POSITIONS, TAG_EDIT_TEST_ID } from '../common/constants'
import SingleTag from './SingleTag'
import { hasEditItem } from '@/utils'
import { CLEAR_ALL_TEXT, ENTER_ARROW_KEY, INPUT_TEST_ID, SINGLE_TAG_TEST_ID } from '@/common/constants'

const name = 'VUE_TAGS'

const VueTags = defineComponent({
  name,
  props: {
    tags: {
      type: Array as PropType<Tag[]>,
      required: true,
    },
    labelField: {
      type: String as PropType<string>,
      default: 'name',
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
    allowDuplicate: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    clearAllText: {
      type: String as PropType<string>,
      default: CLEAR_ALL_TEXT,
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
      allowDuplicate,
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
    const labelField = ref(props.labelField.trim())

    /**
     * @description 添加标签
     * @param value 标签名称
     * 存在重复的标签时根据 allowDuplicate 判断是否添加
     * 不存在重复的标签时根据 maxTags 判断是否添加
     */
    const onAdd = (value: string) => {
      if (!value) {
        return
      }
      const newTag: Tag = { id: String(tagList.value.length + 1), [labelField.value]: value }
      if (!hasMaxTags()) {
        isExist.value = tagList.value.some((tag: Tag) => tag[labelField.value] === value)
        if (!allowDuplicate && isExist.value) {
          return
        }
        (tagList.value.push(newTag) && (inputText.value = ''))
      }
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
      if (event.key === ENTER_ARROW_KEY && value) {
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
    if (allowDrag && !readOnly) {
      useDraggable(el, tagList, {
        animation: 150,
        onUpdate() {
          props?.handleDrag(tagList.value)
        },
      })
    }
    // 输入框组件
    const inputComponent = () => (
      <div class="flex vue-tags__tagInput">
        <input
          class="h-8 vue-tags__tagInputField"
          ref={inputRef.value}
          type="text"
          value={inputText.value}
          placeholder={placeholder}
          onChange={handleChange}
          onKeydown={handleKeyDown}
          onBlur={handleBlur}
          onPaste={handlePaste}
          data-automation="input"
          data-testid={INPUT_TEST_ID}
        />
        {clearAll && tagList.value.length > 0 && (
          <button
            onClick={handleClickClearAll}
            class="cursor-pointer p-2.5 bg-red-500 text-white rounded border-none ml-2 vue-tags__clearAll"
          >
            {clearAllText}
          </button>
        )}
      </div>
    )

    return () => (
      <div class="grid gap-sm vue-tags-wrapper">
        {!readOnly && inputFieldPosition === INPUT_FIELD_POSITIONS.TOP && inputComponent()}
        <div class="flex gap-2">
          <div
            ref={el}
            class="flex vue-tags-inline"
          >
            {tagList.value.map((tag: Tag, index: number) => (
              <div key={tag.id}>
                {currentEditIndex.value === index && editable && !readOnly
                  ? (
                    <input
                      ref={tagInputRef}
                      class="h-8 vue-tags__editTagInput"
                      type="text"
                      value={newText.value}
                      onChange={handleChange}
                      onKeydown={handleKeyDown}
                      onBlur={handleBlur}
                      onPaste={handlePaste}
                      data-testid={TAG_EDIT_TEST_ID}
                    />
                    )
                  : (
                    <SingleTag
                      key={tag.id}
                      id={tag.id}
                      name={tag[labelField.value]}
                      onDelete={(event: MouseEvent) => handleDeleteTag(index, event)}
                      onTagClicked={() => handleClickTag(index, tag[labelField.value])}
                      class={(allowDrag && !readOnly) && 'cursor-move'}
                      readOnly={readOnly}
                      data-testid={SINGLE_TAG_TEST_ID}
                    />
                    )}
              </div>
            ))}
          </div>
          {!readOnly && inputFieldPosition === INPUT_FIELD_POSITIONS.INLINE && inputComponent()}
        </div>

        {!readOnly && inputFieldPosition === INPUT_FIELD_POSITIONS.BOTTOM && inputComponent()}
      </div>
    )
  },

})

export default VueTags
