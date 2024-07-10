import type { VNode } from 'vue'

export interface Tag {
  id: string
  [key: string]: string
}

export interface VueTagsProps {
  /**
   * Placeholder text for the input field.
   */
  placeholder?: string
  /**
   * Field name to use for the label of each tag.
   */
  labelField?: string
  /**
   * Array of suggestions to display in the dropdown.
   */
  suggestions?: Array<Tag>
  /**
   * Array of key codes that will trigger a tag addition.
   */
  delimiters?: Array<number>
  /**
   * Array of characters that will trigger a tag addition.
   * This should match the event.key property of the keydown event.
   */
  separators?: Array<string>
  /**
   * Whether the input field should automatically focus on mount.
   */
  autofocus?: boolean
  /**
   * Whether the input field should automatically focus on mount.
   */
  autoFocus?: boolean
  /**
   * Whether the input field should be read-only.
   */
  readOnly?: boolean
  /**
   * Whether the input field should be displayed inline.
   * TODO: Remove in v7.x.x
   */
  inline?: boolean
  /**
   * Position of the input field relative to the tags.
   */
  inputFieldPosition?: 'inline' | 'top' | 'bottom'
  /**
   * Handler for tag deletion.
   */
  handleDelete?: (
    i: number,
    event:
      | MouseEvent
      | KeyboardEvent
  ) => void
  /**
   * Handler for tag addition.
   */
  handleAddition?: (tag: Tag) => void
  /**
   * Handler for tag updates.
   */
  onTagUpdate?: (i: number, tag: Tag) => void
  /**
   * Handler for tag drag and drop.
   */
  handleDrag?: (tag: Tag, currPos: number, newPos: number) => void
  /**
   * Handler for filtering suggestions.
   */
  handleFilterSuggestions?: (
    query: string,
    suggestions: Array<Tag>
  ) => Array<Tag>
  /**
   * Handler for tag click events.
   */
  handleTagClick?: (
    i: number,
    e: MouseEvent
  ) => void
  /**
   * Whether to allow deletion from an empty input field.
   */
  allowDeleteFromEmptyInput?: boolean
  /**
   * Whether to allow addition from pasted text.
   */
  allowAdditionFromPaste?: boolean
  /**
   * Whether to allow drag and drop of tags.
   */
  allowDragDrop?: boolean
  /**
   * Handler for input field changes.
   */
  handleInputChange?: (
    value: string,
    event: HTMLInputElement
  ) => void
  /**
   * Handler for input field focus events.
   */
  handleInputFocus?: (
    value: string,
    e: HTMLInputElement
  ) => void
  /**
   * Handler for input field blur events.
   */
  handleInputBlur?: (
    value: string,
    event: HTMLInputElement
  ) => void
  /**
   * Minimum length of the query to trigger suggestions.
   */
  minQueryLength?: number
  /**
   * Function to determine whether to render suggestions.
   */
  shouldRenderSuggestions?: (query: string) => boolean
  /**
   * Component to be rendered for removing tags.
   */
  removeComponent?: VNode
  /**
   * Whether to enable autocomplete when typing for suggestions
   */
  autocomplete?: boolean | number
  /**
   * CSS class names for the component.
   */
  classNames?: {
    root: string
    rootFocused: string
    selected: string
    selectedTag: string
    selectedTagName: string
    search: string
    searchInput: string
    suggestions: string
    suggestionActive: string
    suggestionDisabled: string
  }
  /**
   * Name attribute for the input field.
   */
  name?: string
  /**
   * ID attribute for the input field.
   */
  id?: string
  /**
   * Maximum length of the input field.
   */
  maxLength?: number
  /**
   * Value of the input field.
   */
  inputValue?: string
  /**
   * Maximum number of tags that can be added.
   */
  maxTags?: number
  /**
   * Array of tags to display.
   */
  tags?: Array<Tag>
  /**
   * Whether to allow unique tags only.
   */
  allowUnique?: boolean
  /**
   * Render function to render each suggestion item.
   */
  renderSuggestion?: (item: Tag, query: string) => VNode
  /**
   * Additional props to pass to the input field.
   */
  inputProps?: { [key: string]: string }
  /**
   * Whether the tags are editable.
   */
  editable?: boolean
  /**
   * Whether to display a button to clear all the tags.
   */
  clearAll?: boolean
  /**
   * Handler for clearing all the tags.
   */
  onClearAll?: () => void
}
