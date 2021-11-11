import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

export default function SelectResizableImage({ selectResizableImage }) {
	const __opac = useSharedValue(0);
	const __top = useSharedValue(20);

	const __animBox = useAnimatedStyle(() => {
		return {
			opacity: __opac.value,
			top: __top.value,
		};
	}, []);

	useEffect(() => {
		__opac.value = withTiming(1);
		__top.value = withTiming(0);
	}, []);

	return (
		<>
			<View
				style={{
					position: "relative",
					zIndex: 70,
					width: "100%",
					height: "100%",
					justifyContent: "flex-end",
					alignItems: "flex-end",
					backgroundColor: "#00000060",
				}}>
				<Animated.View
					style={[
						{
							width: "100%",
							height: "auto",
							borderRadius: 24,
							borderBottomLeftRadius: 0,
							borderBottomRightRadius: 0,
							backgroundColor: "#FFFFFF",
							padding: 20,
						},
						__animBox,
					]}>
					<View
						style={{
							flexDirection: "column",
							width: "100%",
							alignItems: "center",
						}}>
						<Text
							style={{
								textAlign: "center",
								color: "#000000",
								fontWeight: "bold",
								fontSize: 24,
							}}>
							Select Resizable Image
						</Text>

						{/* button */}
						<TouchableOpacity
							style={styles.button}
							activeOpacity={0.9}
							onPress={selectResizableImage}>
							<View style={{ flexDirection: "row" }}>
								<Text
									style={{
										color: "#FFFFFF",
										fontSize: 20,
										fontWeight: "700",
										top: -3,
									}}>
									Choose Image
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	button: {
		marginTop: 35,
		width: "70%",
		paddingVertical: 15,
		paddingHorizontal: 10,
		borderRadius: 24,
		textAlign: "center",
		backgroundColor: "#3498DB",
		justifyContent: "center",
		alignItems: "center",
	},
});
