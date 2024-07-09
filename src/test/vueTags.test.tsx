import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import type { Tag } from '../types/vueTags'
import VueTags from '../components/VueTags'
import { CLEAR_ALL_TEXT, ENTER_ARROW_KEY, INPUT_TEST_ID, SINGLE_TAG_TEST_ID, TAG_DELETE_TEST_ID, TAG_EDIT_TEST_ID } from '@/common/constants'

const sampleTags: Tag[] = [
  { id: '1', name: 'Thailand' },
  { id: '2', name: 'India' },
]

describe('test VueTags', () => {
  it('should render correctly', () => {
    const { getByText } = render(VueTags, {
      props: {
        tags: sampleTags,
      },
    })
    // sampleTags 获取到的文本是否存在
    for (const tag of sampleTags) {
      expect(getByText(tag.name)).toBeTruthy()
    }
    // 输入框是否存在
    expect(screen.getByTestId(INPUT_TEST_ID)).toBeTruthy()
    expect(screen.getByPlaceholderText('Add new tag')).toBeTruthy()
    // 一键清空按钮是否存在
    expect(getByText(CLEAR_ALL_TEXT)).toBeTruthy()
  })

  describe('when readOnly is true', () => {
    it('should not render input', () => {
      const container = render(VueTags, {
        props: {
          tags: sampleTags,
          readOnly: true,
        },
      })
      // 当 readOnly 为 true 时，输入框不存在
      expect(container.queryByTestId(INPUT_TEST_ID)).toBeNull()
    })
    it('should not edit tag', async () => {
      const container = render(VueTags, {
        props: {
          tags: sampleTags,
          readOnly: true,
          editable: true,
        },
      })
      // 点击某一个 tag 后，编辑框不存在
      await fireEvent.click(container.getByText('Thailand'))
      expect(container.queryByTestId(TAG_EDIT_TEST_ID)).toBeNull()
    })
    it('should not delete tag', () => {
      const container = render(VueTags, {
        props: {
          tags: sampleTags,
          readOnly: true,
        },
      })
      // 删除按钮不存在
      expect(container.queryByTestId(TAG_DELETE_TEST_ID)).toBeNull()
    })
    it('should not drag tag', async () => {
      const { getByText, container } = render(VueTags, {
        props: {
          tags: sampleTags,
          readOnly: true,
          allowDrag: true,
        },
      })
      const list = [{ id: '1', name: 'Thailand' }, { id: '2', name: 'India' }]
      // 不存在这个样式
      expect(container.querySelectorAll('.cursor-move').length).toEqual(0)
      const dest = getByText('Thailand')

      // TODO 模拟拖拽
      await fireEvent.dragStart(dest)
      await fireEvent.dragEnter(dest)
      await fireEvent.dragOver(dest)
      await fireEvent.drop(dest)
      await fireEvent.dragEnd(dest)

      expect(sampleTags).toEqual(list)
    })
  })

  describe('test handle', () => {
    // 测试回车可添加 tag
    it('should add a new tag when press enter', async () => {
      const _sampleTags = [...sampleTags]
      const container = render(VueTags, {
        props: {
          tags: _sampleTags,
        },
      })
      // 输入框输入 NewTag
      const input = screen.getByTestId(INPUT_TEST_ID)
      await fireEvent.change(input, { target: { value: 'test' } })
      // 按下 enter 键
      await fireEvent.keyDown(input, { key: ENTER_ARROW_KEY, code: ENTER_ARROW_KEY })
      // 判断是否添加成功
      expect(container.getByText('test')).toBeTruthy()
      expect(_sampleTags).toEqual([...sampleTags, { id: '3', name: 'test' }])
    })
    // 测试删除 tag
    it('should delete a tag when click the remove button', async () => {
      const handleDelete = vi.fn()
      const tags = [...sampleTags]
      const container = render(VueTags, {
        props: {
          tags,
          handleDelete,
        },
      })
      const list = [{
        id: '2',
        name: 'India',
      }]
      const deleteButtons = container.queryAllByTestId(TAG_DELETE_TEST_ID)
      await fireEvent.click(deleteButtons[0])
      expect(tags).toEqual(list)
      expect(handleDelete).toHaveBeenCalled()
    })
    // 测试清空所有 tag
    it('should clear all tags when click the clearAll button', async () => {
      const handleClearAll = vi.fn()
      const container = render(VueTags, {
        props: {
          tags: sampleTags,
          handleClearAll,
          clearAll: true,
        },
      })

      await fireEvent.click(container.getByText(CLEAR_ALL_TEXT))

      expect(handleClearAll).toHaveBeenCalled()
      expect(container.queryAllByTestId(SINGLE_TAG_TEST_ID).length).toEqual(0)
    })
    // 测试粘贴函数是否生效
    it('should paste tags when paste', async () => {
      const _sampleTags = [...sampleTags]

      render(VueTags, {
        props: {
          tags: _sampleTags,
        },
      })
      const input = screen.getByTestId(INPUT_TEST_ID)
      await fireEvent.paste(input, { clipboardData: { getData: () => 'hazel-lin' } })
      expect(_sampleTags).toEqual([...sampleTags, { id: '3', name: 'hazel-lin' }])
    })

    it('should not paste tags when allowAdditionFromPaste is false', async () => {
      const _sampleTags = [...sampleTags]
      render(VueTags, {
        props: {
          tags: _sampleTags,
          allowAdditionFromPaste: false,
        },
      })
      const input = screen.getByTestId(INPUT_TEST_ID)
      await fireEvent.paste(input, { clipboardData: { getData: () => 'hazel-lin' } })
      expect(_sampleTags).toEqual(sampleTags)
    })
  })
  it('should not add the same tag when the allowDuplicate is false', async () => {
    const _sampleTags = [...sampleTags]
    const count = sampleTags.length
    const container = render(VueTags, {
      props: {
        tags: _sampleTags,
        allowDuplicate: false,
      },
    })
    const input = screen.getByTestId(INPUT_TEST_ID)
    await fireEvent.change(input, { target: { value: 'hazel' } })
    await fireEvent.keyDown(input, { key: ENTER_ARROW_KEY, code: ENTER_ARROW_KEY })

    expect(container.getByText('hazel')).toBeTruthy()
    expect(_sampleTags.length).toEqual(count + 1)

    await fireEvent.change(input, { target: { value: 'hazel' } })
    await fireEvent.keyDown(input, { key: ENTER_ARROW_KEY, code: ENTER_ARROW_KEY })

    expect(_sampleTags.length).toEqual(count + 1)
  })
  it('should allow duplicate tags when allowDuplicate is true', async () => {
    const _sampleTags = [...sampleTags]
    const count = sampleTags.length
    const container = render(VueTags, {
      props: {
        tags: _sampleTags,
        allowDuplicate: true,
      },
    })
    const input = screen.getByTestId(INPUT_TEST_ID)

    await fireEvent.change(input, { target: { value: 'hazel' } })
    await fireEvent.keyDown(input, { key: ENTER_ARROW_KEY, code: ENTER_ARROW_KEY })

    expect(container.getByText('hazel')).toBeTruthy()
    expect(_sampleTags.length).toBe(count + 1)

    await fireEvent.change(input, { target: { value: 'hazel' } })
    await fireEvent.keyDown(input, { key: ENTER_ARROW_KEY, code: ENTER_ARROW_KEY })

    expect(_sampleTags).toEqual([...sampleTags, { id: '3', name: 'hazel' }, { id: '4', name: 'hazel' }])
  })

  it('should not add a new tag when the tags length is equal to maxTags', async () => {
    const _sampleTags = [...sampleTags]
    const maxTags = 3
    const container = render(VueTags, {
      props: {
        tags: _sampleTags,
        maxTags,
      },
    })
    const input = screen.getByTestId(INPUT_TEST_ID)

    await fireEvent.change(input, { target: { value: 'hazel' } })
    await fireEvent.keyDown(input, { key: ENTER_ARROW_KEY, code: ENTER_ARROW_KEY })

    expect(container.getByText('hazel')).toBeTruthy()
    expect(_sampleTags).toHaveLength(maxTags)

    await fireEvent.change(input, { target: { value: 'lin' } })
    await fireEvent.keyDown(input, { key: ENTER_ARROW_KEY, code: ENTER_ARROW_KEY })

    expect(_sampleTags).toEqual([...sampleTags, { id: '3', name: 'hazel' }])
  })
})
