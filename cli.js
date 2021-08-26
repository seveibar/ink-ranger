#!/usr/bin/env node
"use strict"
const React = require("react")
const importJsx = require("import-jsx")
const { render } = require("ink")
const meow = require("meow")

const ui = importJsx("./ui")

const cli = meow(`
	Usage
	  $ ink-ranger

	Options
		--name  Your name

	Examples
	  $ ink-ranger --name=Jane
	  Hello, Jane
`)
console.clear()
render(React.createElement(ui, cli.flags))
