# scss 脚手架

> 旨在让我们能够 `方便`、`规范`、`优雅` 地写样式。

## 解决难题

### 1、选择器命名

统一采用`集合` + `区块` + `修饰器` + `辅助器`的命名方式

- 集合：用于。
- 区块：用于表示固定的一类布局，比如nav、menu等。
-

`.#{$prefix}#{$block}_#{$element}` 加修饰符`.#{$prefix}#{$modifier}`的命名方式。

```css

.gt-nav_item {
  color: black;
  &.is-active {
    color: red;
  }
}

```
