import { defineComponent, ref } from 'vue'

const TagInput = defineComponent({
  name: 'TagInput',
  props: {
    // text: {
    //   type: String,
    //   default: '',
    // },
    // onRemove: () => {},
  },
  setup(props, { emit }) {
    const inputText = ref()
    const inputRef = ref()

    const handleChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      inputText.value = target.value
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (inputText.value) {
          emit('addAction', inputText.value)
          inputText.value = ''
        }
      }
    }
    const handleBlur = (event: FocusEvent) => {
      const value = (event.target as HTMLInputElement).value
      if (value) {
        inputText.value = ''
        emit('addAction', value)
      }
    }

    const handlePaste = (event: ClipboardEvent) => {
      const clipboardData = event.clipboardData || (window as any).clipboardData
      const clipboardText = clipboardData.getData('text')
      if (clipboardText) {
        inputText.value = ''
        emit('addAction', clipboardText)
      }
    }

    return () => (
      <input
        ref={inputRef.value}
        value={inputText.value}
        onChange={handleChange}
        onKeydown={handleKeyDown}
        onBlur={handleBlur}
        onPaste={handlePaste}
      />
    )
  },
})

export default TagInput
