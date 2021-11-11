import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Slider from "@react-native-community/slider";

import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
} from "react-native-reanimated";

import { EditorContext } from "../../../context";

function PropertiesOfBox({ hideModal }) {
	const [editorData, setEditorData] = useContext(EditorContext);

	const __opac = useSharedValue(0);
	const __top = useSharedValue(20);

	const [rad, setRad] = useState(editorData.radius);
	const [borWdth, setBorWdth] = useState(editorData.borderWidth);
	const [rot, setRot] = useState(editorData.rotate);
	const [scl, setScl] = useState(editorData.scale);

	const __boxAnimTransform = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: __top.value }],
		};
	}, []);

	// only animate opacity,
	const __animOpacOnly = useAnimatedStyle(() => {
		return {
			opacity: __opac.value,
		};
	}, []);

	useEffect(() => {
		__opac.value = withTiming(1);
		__top.value = withTiming(0);
	}, []);

	return (
		<>
			<View style={styles.propModal.container}>
				{/* To hide the modal after finishing the animation */}
				<TouchableOpacity
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						left: 0,
						top: 0,
						zIndex: 20,
					}}
					onPress={() => {
						__opac.value = withTiming(0);
						__top.value = withTiming(20);

						setTimeout(() => {
							hideModal();
						}, 400);
					}}
				/>

				{/* Real Box */}
				<Animated.View
					style={[styles.propModal.box, __boxAnimTransform, __animOpacOnly]}>
					{/* Slider for border width */}
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						<View style={{ width: "40%" }}>
							<Text style={styles.propModal.text}>Border Width</Text>
						</View>

						{/* slider */}
						<View
							style={{
								width: "60%",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
							}}>
							<Slider
								style={{ width: "90%" }}
								minimumValue={0}
								maximumValue={50}
								value={editorData.borderWidth}
								thumbTintColor={"#888"}
								maximumTrackTintColor={"#eee"}
								minimumTrackTintColor={"#3498DB"}
								onValueChange={event => {
									__opac.value = withTiming(0);

									setEditorData({
										...editorData,
										borderWidth: event,
									});

									setBorWdth(event);
								}}
								onSlidingComplete={() => {
									__opac.value = withTiming(1);
								}}
							/>

							<Text
								style={{ fontWeight: "600", fontSize: 10, color: "#00000080" }}>
								{Math.floor(borWdth)}
							</Text>
						</View>
					</View>

					{/* Slider for border radius */}
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							marginTop: 20,
						}}>
						<View style={{ width: "40%" }}>
							<Text style={styles.propModal.text}>Border Radius</Text>
						</View>

						{/* slider */}
						<View
							style={{
								width: "60%",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
							}}>
							<Slider
								style={{ width: "90%" }}
								minimumValue={2}
								value={editorData.radius}
								maximumValue={999}
								thumbTintColor={"#888"}
								maximumTrackTintColor={"#eee"}
								minimumTrackTintColor={"#3498DB"}
								onValueChange={event => {
									__opac.value = withTiming(0);

									setEditorData({
										...editorData,
										radius: event,
									});

									setRad(event);
								}}
								onSlidingComplete={() => {
									__opac.value = withTiming(1);
								}}
							/>

							<Text
								style={{ fontWeight: "600", fontSize: 10, color: "#00000080" }}>
								{Math.floor(rad)}
							</Text>
						</View>
					</View>

					{/* Slider for rotation */}
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							marginTop: 20,
						}}>
						<View style={{ width: "40%" }}>
							<Text style={styles.propModal.text}>Rotate</Text>
						</View>

						{/* slider */}
						<View
							style={{
								width: "60%",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
							}}>
							<Slider
								style={{ width: "90%" }}
								minimumValue={-360}
								maximumValue={360}
								value={editorData.rotate}
								thumbTintColor={"#888"}
								maximumTrackTintColor={"#eee"}
								minimumTrackTintColor={"#3498DB"}
								onValueChange={event => {
									__opac.value = withTiming(0);

									setEditorData({
										...editorData,
										rotate: event,
									});

									setRot(event);
								}}
								onSlidingComplete={() => {
									__opac.value = withTiming(1);
								}}
							/>

							<Text
								style={{ fontWeight: "600", fontSize: 10, color: "#00000080" }}>
								{Math.floor(rot)}
							</Text>
						</View>
					</View>

					{/* Slider for scale */}
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							marginTop: 20,
						}}>
						<View style={{ width: "40%" }}>
							<Text style={styles.propModal.text}>Resize</Text>
						</View>

						{/* slider */}
						<View
							style={{
								width: "60%",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
							}}>
							<Slider
								style={{ width: "90%" }}
								minimumValue={0.3}
								maximumValue={3}
								value={editorData.scale}
								thumbTintColor={"#888"}
								maximumTrackTintColor={"#eee"}
								minimumTrackTintColor={"#3498DB"}
								onValueChange={event => {
									__opac.value = withTiming(0);

									setEditorData({
										...editorData,
										scale: event,
									});

									setScl(event);
								}}
								onSlidingComplete={() => {
									__opac.value = withTiming(1);
								}}
							/>

							<Text
								style={{ fontWeight: "600", fontSize: 10, color: "#00000080" }}>
								{Math.floor(scl)}
							</Text>
						</View>
					</View>
				</Animated.View>
			</View>
		</>
	);
}

export default PropertiesOfBox;

const styles = StyleSheet.create({
	propModal: {
		container: {
			position: "absolute",
			zIndex: 60,
			width: "100%",
			height: "100%",
			left: 0,
			top: 0,
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "flex-end",
		},
		box: {
			position: "relative",
			zIndex: 30,
			overflow: "hidden",
			backgroundColor: "#F1F3F4",
			borderTopLeftRadius: 24,
			borderTopRightRadius: 24,
			backgroundColor: "#FFFFFF",
			width: "100%",
			height: "auto",
			paddingVertical: 20,
			paddingHorizontal: 20,
		},
		text: { fontSize: 14, color: "#00000090", fontWeight: "700" },
	},
});
