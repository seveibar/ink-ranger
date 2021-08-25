"use strict";
const React = require("react");
const {
	Text,
	Box,
	useFocus,
	useApp,
	useInput,
	useFocusManager,
} = require("ink");

const App = () => {
	const { exit } = useApp();
	const { focusNext, focusPrevious } = useFocusManager();

	useInput((input, key) => {
		if (input === "q") {
			exit();
		}

		if (key.downArrow) {
			focusNext();
		}

		if (key.upArrow) {
			focusPrevious();
		}
	});

	return (
		<Box flexDirection="column">
			<Box paddingTop={1} marginBottom={1}>
				<Text>
					Press Tab to focus next element, Shift+Tab to focus previous element,
					Esc to reset focus or up and down arrows to navigate and 'q' to exit.
				</Text>
			</Box>
			<Item label="First" />
			<Item label="Second" />
			<Item label="Third" />
		</Box>
	);
};

const Item = ({ label }) => {
	const { isFocused } = useFocus();
	return <Text backgroundColor={isFocused && "white"}>{label}</Text>;
};

module.exports = App;
