---
title: Jaseci Column
aliases: [Column]
tags: [documentation]
---

#### Summary

A `Column` is a layout component that allows you to align `children` components vertically. A column is rendered as a flexbox container.

<u>Example:</u>

```JSON
{
	"component": "Column",
	"events": {},
	"slots": {
		"children": []
	},
	"props": {
		"justify": "center",
		"items": "start"
	},
}
```

The above will align the children elements in a column that's aligned to the right of the x-axis and center-aligned on the y-axis.

#### Slots

- children

#### Props

- justify
- items
