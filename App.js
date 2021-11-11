import React from "react";
import { SafeAreaView } from "react-native";
import MainPage from "./src";

// Main context for the overall App,
import { MainContextProvider } from "./context";

const App = () => {
	return (
		<MainContextProvider>
			<MainPage />
		</MainContextProvider>
	);
};

export default App;
