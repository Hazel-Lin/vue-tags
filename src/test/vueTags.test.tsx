import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import type { Tag } from '../types/vueTags'
import VueTags from '../components/VueTags'

describe('test VueTags', () => {
  const sampleTags: Tag[] = [
    { id: '1', name: 'Thailand' },
    { id: '2', name: 'India' },
  ]

  it.skip('should render correctly', () => {
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
    expect(screen.getByRole('textbox')).toBeTruthy()
    expect(screen.getByPlaceholderText('Add new tag')).toBeTruthy()
    // 一键清空按钮是否存在
    expect(getByText('一键清空')).toBeTruthy()
  })

  describe('when readOnly is true', () => {
    it.skip('should not render input', () => {
      const container = render(VueTags, {
        props: {
          tags: sampleTags,
          readOnly: true,
        },
      })
      // 当 readOnly 为 true 时，输入框不存在
      expect(container.queryByTestId('input')).toBeNull()
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
      expect(container.queryByTestId('tag-edit')).toBeNull()
    })
    it('should not delete tag', () => {
      const container = render(VueTags, {
        props: {
          tags: sampleTags,
          readOnly: true,
        },
      })
      // 删除按钮不存在
      expect(container.queryByTestId('tag-delete')).toBeNull()
    })
    it('should not drag tag', async () => {
      const { getByText, container } = render(VueTags, {
        props: {
          tags: sampleTags,
          readOnly: true,
          allowDrag: true,
        },
      })
      // 不存在这个样式
      expect(container.querySelectorAll('.cursor-move').length).toEqual(0)
      const dest = getByText('Thailand')

      // TODO 模拟拖拽
      await fireEvent.dragStart(dest)
      await fireEvent.dragEnter(dest)
      await fireEvent.dragOver(dest)
      await fireEvent.drop(dest)
      await fireEvent.dragEnd(dest)
    })
  })

  // it('should adds a new tag', async () => {
  //   const wrapper = mount(VueTags, {
  //     props: {
  //       tags: sampleTags,
  //       handleAddition: vi.fn(),
  //     },
  //   })

  //   const input = wrapper.find('input[data-automation="input"]')
  //   await input.setValue('NewTag')
  //   await input.trigger('keydown.enter')

  //   expect(wrapper.props().handleAddition).toHaveBeenCalled()
  // })

  // it('deletes a tag', async () => {
  //   const handleDelete = vi.fn()
  //   const wrapper = mount(VueTags, {
  //     props: {
  //       tags: sampleTags,
  //       handleDelete,
  //     },
  //   })

  //   const deleteButtons = wrapper.findAll('.single-tag .delete-button')
  //   await deleteButtons[0].trigger('click')

  //   expect(handleDelete).toHaveBeenCalledWith(0, expect.any(MouseEvent))
  // })

  // it('clears all tags', async () => {
  //   const handleClearAll = vi.fn()
  //   const wrapper = mount(VueTags, {
  //     props: {
  //       tags: sampleTags,
  //       handleClearAll,
  //       clearAll: true,
  //     },
  //   })

  //   const clearButton = wrapper.find('button.clear-button')
  //   await clearButton.trigger('click')

  //   expect(handleClearAll).toHaveBeenCalled()
  //   expect(wrapper.props().tags).toHaveLength(0)
  // })

  // it('edits a tag', async () => {
  //   const handleChangeTag = vi.fn()
  //   const wrapper = mount(VueTags, {
  //     props: {
  //       tags: sampleTags,
  //       editable: true,
  //       handleChangeTag,
  //     },
  //   })

  //   const editInputs = wrapper.findAll('input.h-8')
  //   await editInputs[0].setValue('EditedTag')
  //   await editInputs[0].trigger('blur')

  //   expect(handleChangeTag).toHaveBeenCalledWith(0, 'EditedTag')
  // })
})
