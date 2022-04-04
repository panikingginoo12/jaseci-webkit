---
title: Jaseci Inputbox
---

#### Summary
An `Inputbox` component will render a container, `jsc-inputbox`, that will a render an `input` element within it's DOM.

<u>Example:</u>
```JSON
{
	"component": "Inputbox",
	"events": {},
	"props": {
		"placeholder": "Enter your name..."
		"fullwidth": "true",
		"value": "Jaseci",
	},
	"css": {
		"padding": "0 2px"
	},
}
```

The code above will render an input with a placeholder of "Enter your name", it will span the full width of its parent and have its value set to 'Jaseci'.

#### Props
- placeholder
- fullwidth
- value