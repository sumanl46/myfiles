import React, { useContext } from "react";

// for navigation and routes,
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Main context for the overall App,
import TemplatePage from "./components/templatePage";
import EditorPage from "./components/editorPage";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const MainPage = () => {
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="template"
					screenOptions={{
						headerShown: false,
					}}>
					{/* this will return the template page */}
					<Stack.Screen name="template" component={TemplatePage} />

					{/* this will return the editor page */}
					<Stack.Screen name="editor" component={EditorPage} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};

export default MainPage;
