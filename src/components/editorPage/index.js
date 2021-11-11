import React, { useContext } from "react";
import { View, StatusBar } from "react-native";
import { MainContext } from "../../../context";
import { IfSelected } from "./contents";
import { EditorContextProvider } from "./context";

export default function EditorPage({ navigation, route }) {
	const [contextData, setContextData] = useContext(MainContext);

	const { image } = route.params;

	return (
		<>
			<View>
				<StatusBar
					barStyle="light-content"
					showHideTransition={"fade"}
					hidden={true}
				/>

				<EditorContextProvider>
					<IfSelected navigation={navigation} image={image} />
				</EditorContextProvider>
				{/* {contextData.image ? (
					<IfSelected navigation={navigation} image={image} />
				) : (
					<IfNotSelected navigation={navigation} />
				)} */}
			</View>
		</>
	);
}
