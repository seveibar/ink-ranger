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
    { id: 1, label: "node_modules", size: "514" },
    { id: 2, label: "cli.js", size: "379 B" },
    { id: 3, label: "package.json", size: "939 B" },
    { id: 4, label: "README.md", size: "337 B" },
    { id: 5, label: "test.js", size: "428 B" },
    { id: 6, label: "ui.js", size: "1.11 K" },
    { id: 7, label: "yarn.lock", size: "246 K" },
  ],
  rightPreview: [
    { id: 1, preview: "Some preview 1" },
    { id: 2, preview: "Some preview 2" },
    { id: 3, preview: "Some preview 3" },
    { id: 4, preview: "Some preview 4" },
    { id: 5, preview: require("fs").readFileSync("./test.js").toString() },
    { id: 6, preview: "Some preview 6" },
    { id: 7, preview: "Some preview 7" },
  ],
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

  const windowWidth = process.stdout.columns
  const windowHeight = process.stdout.rows
  const leftColumnSize = windowWidth / 4 - 2
  const middleColumnSize = windowWidth / 2 - 2
  const rightColumnSize = windowWidth / 4 - 1

  return (
    <Box height={windowHeight} flexDirection="column">
      <Text bold>{sample.header}</Text>
      <Box flexDirection="row">
        <Box flexDirection="column" marginRight={1} marginLeft={1}>
          {sample.leftColumn.map((t) => (
            <Text key={t}>{t.length > 10 ? t.slice(0, 9) + "~" : t}</Text>
          ))}
        </Box>
        <Box flexDirection="column" marginLeft={1} marginRight={1}>
          {sample.middleColumn.map((item) => (
            <Item key={item.label} label={item.label} size={item.size} />
          ))}
        </Box>
        <Box flexDirection="column" marginLeft={1} flexGrow={0.25}>
          <Text>{sample.rightPreview[4].preview}</Text>
        </Box>
      </Box>
      <Box flexGrow={1} />
      <Box justifyContent="space-between">
        <Text>{sample.footer.leftSide}</Text>
        <Text>{sample.footer.rightSide}</Text>
      </Box>
    </Box>
  )
}

const Item = ({ label, size }) => {
  const { isFocused } = useFocus()
  const itemBackgroundColor = label.includes(".") ? "green" : "blue"

  return (
    <Box justifyContent="space-between" flexDirection="row">
      <Text
        color={isFocused && "#fff"}
        backgroundColor={isFocused && itemBackgroundColor}
      >
        {label + "                                                   "}
      </Text>
      <Text
        flexShrink={0}
        color={isFocused && "#fff"}
        backgroundColor={isFocused && itemBackgroundColor}
      >
        {size}
      </Text>
    </Box>
  )
  // return <Text backgroundColor={isFocused && "white"}>{label}</Text>
}

module.exports = App
