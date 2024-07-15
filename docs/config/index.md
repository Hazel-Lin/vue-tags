# 配置

属性 | 类型 | 默认值 | 描述
--- | --- | --- | ---
|[`tags`](#tags) | `Array` | `[]` | 一个包含标签对象的数组。
[`placeholder`](#placeholder) | `String` | `Add new tag` | 提示用户输入新标签的占位符。
[`labelField`](#labelField) | `String` | `text` | 为标签提供一个替代的 `label` 属性。
[`readOnly`](#readOnly) | `Boolean` | `false` | 是否开启只读模式，在只读模式下无法添加、删除和拖拽。
[`name`](#name) | `String` | `undefined` | 添加到输入的 `name` 属性。
[`id`](#id) | `String` | `undefined` | 添加到输入的 `id` 属性。
[`inputFieldPosition`](#inputFieldPosition) | `String` | `bottom` | 指定输入框相对于标签的位置。
[`allowDuplicate`](#allowUnique) | `Boolean` | `false` | 标签值是否可重复。
[`allowDragDrop`](#allowDragDrop) | `Boolean` | `true` | 标签是否支持拖拽。
[`editable`](#editable) | `boolean` | `false` | 是否可编辑。
[`maxTags`](#maxTags) | `number` | | 可添加的标签的最大计数。
[`onTagUpdate`](#onTagUpdate) | `Function` | | 如果存在，则在编辑标签时触发此回调。
[`clearAll`](#clearAll) | `boolean` | `false` | 是否显示“一键清空”按钮。
[`onClearAll`](#onClearAll) | `Function` | | 如果存在，则在单击“一键清空”按钮时触发此回调。
[`handleAddition`](#handleAddition) | `Function` | `undefined` | 添加标签时调用的函数（必需）。
[`handleDelete`](#handleDelete) | `Function` | `undefined` | 删除标签时调用的函数（必需）。
[`handleDrag`](#handleDrag) | `Function` | `undefined` | 拖动标签时调用的函数。
[`handleTagClick`](#handleTagClick) | `Function` | `undefined` | 点击了标签时调用的函数。
[`handleInputChange`](#handleInputChange) | `Function` | `undefined` | 输入变化的事件处理程序。
[`handleInputFocus`](#handleInputFocus) | `Function` | `undefined` | 输入焦点的事件处理程序。
[`handleInputBlur`](#handleInputBlur) | `Function` | `undefined` | 输入失焦的事件处理程序。
