import React, { useEffect, useState } from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

// feather icons,
import Icon from "react-native-vector-icons/Feather";

// templates,
import { __templates } from "../assets/templates";

function Templates({ tag, navigation }) {
	const [tempFound, setTempFound] = useState(false);
	const [templates, setTemplates] = useState([]);

	const storage = getStorage(app);

	// useEffect(() => {
	// 	if (tag == null) return;

	// 	// Create a reference under which you want to list
	// 	// const __mainUrl = "gs://imageeditor-c18c6.appspot.com/";
	// 	const __folderUrl = `gs://imageeditor-c18c6.appspot.com/${tag}`;
	// 	const listRef = ref(storage, __folderUrl);

	// 	// const getFiles = ref(storage, "gs://imageeditor-c18c6.appspot.com/holi");
	// 	// Find all the prefixes and items.
	// 	listAll(listRef)
	// 		.then(res => {
	// 			const results = [];

	// 			res.items.forEach((itemRef, index) => {
	// 				// All the items under listRef.
	// 				const __url = `${__folderUrl}/${itemRef.name}`;
	// 				const __urlRef = ref(storage, __url);

	// 				getDownloadURL(__urlRef).then(url => {
	// 					results.push(url);
	// 				});
	// 			});

	// 			setTemplates(results);

	// 			setTempFound(true);
	// 		})
	// 		.catch(error => {
	// 			// Uh-oh, an error occurred!
	// 			console.log(error);
	// 		});
	// }, [tag]);

	if (!tempFound) {
		return (
			<>
				<View
					style={{
						width: "100%",
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Icon name="loader" size={34} color={"#00000070"} />
				</View>
			</>
		);
	} else {
		return (
			<>
				{/* Scrollable view */}
				<ScrollView
					style={{
						position: "relative",
						marginTop: 20,
						flex: 1,
					}}>
					{/* Flex boxes */}
					<View
						style={{
							position: "relative",
							width: "100%",
							height: "100%",
							alignItems: "center",
							flexDirection: "row",
							justifyContent: "flex-start",
							flexWrap: "wrap",
						}}>
						{/* templates */}
						{templates.map((item, index) => (
							<TouchableOpacity
								key={index}
								style={styles.templateBox.wrapper.container}
								onPress={() =>
									navigation.navigate("editor", {
										image: item,
									})
								}
								activeOpacity={0.8}>
								<Image
									source={item}
									resizeMethod="auto"
									resizeMode="cover"
									style={styles.templateBox.wrapper.box}
								/>
								<View
									style={{
										position: "absolute",
										zIndex: 50,
										backgroundColor: "#FFFFFF",
										borderWidth: 4,
										borderColor: "#00000060",
										borderRadius: 999,
										width: 60,
										height: 60,
										bottom: 10,
										left: 10,
									}}></View>
							</TouchableOpacity>
						))}
					</View>
				</ScrollView>
			</>
		);
	}
}

export default Templates;

const styles = StyleSheet.create({
	templateBox: {
		wrapper: {
			container: {
				position: "relative",
				width: "50%",
				height: 200,
				justifyContent: "center",
				alignItems: "center",
				padding: 5,
			},
			box: {
				position: "relative",
				width: "100%",
				height: "100%",
				borderRadius: 12,
				overflow: "hidden",
			},
		},
	},
});
