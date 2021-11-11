import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import { EditorContext } from "../../../context";

export default function InnerView({ onLongPress, image }) {
	const [editorData, setEditorData] = useContext(EditorContext);

	return (
		<>
			<TouchableOpacity activeOpacity={1} onLongPress={onLongPress}>
				<Animated.Image
					style={[
						styles.pinchableImage,
						{
							borderWidth: editorData.borderWidth,
							borderColor: "#000000",
							borderRadius: editorData.radius,
						},
					]}
					source={image}
				/>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	pinchableImage: {
		width: 250,
		height: 250,
	},
});
