import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
	},
	searchBar: {
		container: {
			position: "relative",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			height: 55,
			paddingVertical: 4,
			minHeight: 55,
		},
		searchIcon: {
			position: "absolute",
			top: 10,
			left: 25,
		},
		crossIcon: {
			position: "absolute",
			width: 25,
			height: 25,
			borderRadius: 999,
			backgroundColor: "#FFFFFF",
			top: 10,
			right: 10,
			justifyContent: "center",
			alignItems: "center",
		},
		field: {
			position: "relative",
			width: "100%",
			height: "100%",
			paddingHorizontal: 55,
			fontWeight: "600",
			fontSize: 15,
			color: "#000000",
		},
	},
	grids: {
		position: "relative",
		width: "100%",
		overflow: "hidden",
		padding: 15,
	},
	flexTabs: {
		container: {
			position: "relative",
			width: "100%",
			justifyContent: "flex-start",
			alignItems: "center",
			flexDirection: "row",
		},
		tab: {
			tab: {
				width: "auto",
			},
			text: {
				fontWeight: "bold",
				fontSize: 15,
			},
		},
	},
});
