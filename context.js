import React, { createContext, useState } from "react";
import { Dimensions } from "react-native";

export const MainContext = createContext();

// total width && height of the window,
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const themes = {
	bg: "#FFFFFF",
	color: "#000000",
	width: WIDTH,
	height: HEIGHT,
};

export function MainContextProvider({ children }) {
	const [contextData, setContextData] = useState({
		selected: false,
		image: null,
		resizableImage: null,
		hideStatusBar: false,
		themes: { ...themes },
	});

	return (
		<>
			<MainContext.Provider value={[contextData, setContextData]}>
				{children}
			</MainContext.Provider>
		</>
	);
}
