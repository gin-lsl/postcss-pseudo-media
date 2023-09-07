# PostCSS Pseudo Media

Help to generate `@media` quickly.

## Examples:

```css
.btn {
  width: 100px;

  :xs {
    width: 50px;
  }
}
```

It will be

```css
.btn {
  width: 100px;

  @media (max-width: 768px) {
    width: 50px;
  }
}
```
