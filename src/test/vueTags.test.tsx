import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import type { Tag } from '../types/vueTags'
import VueTags from '../components/VueTags'

describe('test VueTags', () => {
  const sampleTags: Tag[] = [
    { id: '1', name: 'Thailand' },
    { id: '2', name: 'India' },
  ]

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
    expect(screen.getByRole('textbox')).toBeTruthy()
    expect(screen.getByPlaceholderText('Add new tag')).toBeTruthy()
    // 一键清空按钮是否存在
    expect(getByText('一键清空')).toBeTruthy()
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

  describe('test handle', () => {
    // 测试回车可添加 tag
    it('should add a new tag when press enter', async () => {
      const container = render(VueTags, {
        props: {
          tags: sampleTags,
        },
      })
      // 输入框输入 NewTag
      const input = screen.getByTestId('input')
      await fireEvent.change(input, { target: { value: 'test' } })
      // 按下 enter 键
      await fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
      // 判断是否添加成功
      expect(container.getByText('test')).toBeTruthy()
      const list = [{
        id: '1',
        name: 'Thailand',
      }, {
        id: '2',
        name: 'India',
      }, {
        id: '3',
        name: 'test',
      }]
      expect(sampleTags).toEqual(list)
    })
    // 测试删除 tag
    it('should delete a tag when click the remove button', async () => {
      const handleDelete = vi.fn()
      const tags = [{
        id: '1',
        name: 'Thailand',
      }, {
        id: '2',
        name: 'India',
      }]
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
      const deleteButtons = container.queryAllByTestId('tag-delete')
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

      await fireEvent.click(container.getByText('一键清空'))

      expect(handleClearAll).toHaveBeenCalled()
      expect(container.queryAllByTestId('single-tag').length).toEqual(0)
    })
  })
})
