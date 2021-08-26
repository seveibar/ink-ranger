"use strict"
const React = require("react")
const {
  Text,
  Box,
  useFocus,
  useApp,
  useInput,
  useFocusManager,
} = require("ink")

const sample = {
  header: "seve@ucha /home/seve/workspace/os/ink-ranger/test.js",
  leftColumn: [
    "collaboration-server",
    "compare-data-tools",
    "confidis",
    "dataset-managers",
    "devlive",
    "etl9",
    "github-workflow-manager",
    "gwm",
    "ink-ranger",
    "jac-format",
    "jsc",
    "jsc-website",
    "mmgc1",
    "node-traefik",
    "node-zwave-js",
    "ohio2",
    "pgknexlove",
    "pgtui",
    "qspg",
    "raiders.dev",
    "react-image-annotate",
    "react-install-render",
  ],
  middleColumn: [
    { label: "node_modules", size: "514" },
    { label: "cli.js", size: "379 B" },
    { label: "package.json", size: "939 B" },
    { label: "README.md", size: "337 B" },
    { label: "test.js", size: "428 B" },
    { label: "ui.js", size: "1.11 K" },
    { label: "yarn.lock", size: "246 K" },
  ],
  rightPreview: require("fs").readFileSync("./test.js").toString(),
  footer: {
    leftSide: "-rw-r--r-- 1 seve seve 428B",
    rightSide: "249K sum, 18.9G free 5/7 All",
  },
}

const App = () => {
  const { exit } = useApp()
  const { focusNext, focusPrevious } = useFocusManager()

  useInput((input, key) => {
    if (input === "q") {
      exit()
    }

    if (key.downArrow) {
      focusNext()
    }

    if (key.upArrow) {
      focusPrevious()
    }
  })

  const leftColumnSize = 10

  return (
    <Box flexDirection="column">
      <Text bold>{sample.header}</Text>
      <Box flexDirection="row">
        <Box
          flexDirection="column"
          flexShrink={0}
          marginRight={1}
          marginLeft={1}
        >
          {sample.leftColumn.map((t) => (
            <Text key={t}>{t.length > 10 ? t.slice(0, 9) + "~" : t}</Text>
          ))}
        </Box>
        <Box
          flexDirection="column"
          marginLeft={1}
          marginRight={1}
          flexGrow={0.5}
        >
          {sample.middleColumn.map((item) => (
            <Item key={item.label} label={item.label} size={item.size} />
          ))}
        </Box>
        <Box flexDirection="column" marginLeft={1} flexGrow={0.25}>
          <Text>{sample.rightPreview}</Text>
        </Box>
      </Box>
    </Box>
  )
}

const Item = ({ label, size }) => {
  const { isFocused } = useFocus()
  return (
    <Box justifyContent="space-between" flexDirection="row">
      <Text backgroundColor={isFocused && "gray"}>{label}</Text>
      <Text flexShrink={0} backgroundColor={isFocused && "gray"}>
        {size}
      </Text>
    </Box>
  )
  // return <Text backgroundColor={isFocused && "white"}>{label}</Text>
}

module.exports = App
