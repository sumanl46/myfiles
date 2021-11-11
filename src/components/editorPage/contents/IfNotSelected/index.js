import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { MainContext } from "../../../../../context";

// package for choosing image from gallery or lauching camera to choose image,
import { launchImageLibrary } from "react-native-image-picker";

export default function IfNotSelected({ navigation }) {
	const [contextData, setContextData] = useContext(MainContext);

	const selectImage = () => {
		// options for launching image gallery,
		const options = {
			storageOptions: {
				path: "images",
				mediaType: "photo",
			},
			includeBase64: true,
		};

		launchImageLibrary(options, response => {
			let __source = "data:image/jpeg;base64,";

			if (response.assets) {
				__source += response.assets[0].base64;

				const imageUri = { uri: __source };

				setContextData({
					...contextData,
					selected: true,
					image: imageUri,
				});
			}
		});
	};

	return (
		<>
			<View style={styles.container}>
				<View style={styles.centeredContent}>
					{/* top section icon and app name */}
					<View
						style={{
							flexDirection: "column",
							alignSelf: "center",
						}}>
						<Icon name="documents" size={130} color="#3498DB" />

						<View style={{ marginTop: 12 }}>
							<Text
								style={{
									textAlign: "center",
									fontWeight: "600",
									color: "#888",
									fontSize: 14,
								}}>
								Merge Photo Editor
							</Text>
						</View>
					</View>

					{/* image select button */}
					<View
						style={{
							flexDirection: "column",
							justifyContent: "center",
							marginTop: 50,
						}}>
						<View>
							<Text style={styles.text}>Select Image and</Text>
						</View>

						{/* Finally Button to select iamge */}
						<TouchableOpacity
							style={styles.button}
							activeOpacity={0.9}
							onPress={selectImage}>
							<View style={{ flexDirection: "row" }}>
								<Text
									style={{
										color: "#FFFFFF",
										fontSize: 20,
										fontWeight: "700",
										top: -3,
									}}>
									Get Started
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	centeredContent: {
		width: "auto",
		height: "auto",
		flexDirection: "column",
		alignContent: "center",
	},
	text: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 30,
		color: "#000",
	},
	button: {
		marginTop: 26,
		width: "auto",
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 24,
		textAlign: "center",
		backgroundColor: "#3498DB",
		justifyContent: "center",
		alignItems: "center",
	},
});
