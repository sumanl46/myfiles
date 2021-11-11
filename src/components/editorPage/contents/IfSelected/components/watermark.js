import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function Watermark() {
	return (
		<>
			<View
				style={{
					position: "absolute",
					zIndex: 60,
					bottom: "1%",
					right: "2%",
					opacity: 0.5,
					flexDirection: "row",
					alignItems: "center",
					borderRadius: 12,
					backgroundColor: "#00000040",
					width: "auto",
					height: 50,
					paddingHorizontal: 10,
				}}>
				<Icon name="box" size={24} style={{ marginRight: 10 }} />

				<Text style={{ fontSize: 14, color: "#00000070", fontWeight: "bold" }}>
					Merge Photo Editor
				</Text>
			</View>
		</>
	);
}
