import React, { useContext, useEffect, useState } from "react";
import {
	Dimensions,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	Easing,
} from "react-native-reanimated";

import { launchImageLibrary } from "react-native-image-picker";

// editor context data,
import { EditorContext } from "../../context";

// import { PinchGestureHandler } from "react-native-gesture-handler";

import { MainContext } from "../../../../../context";
// import Draggable from "react-native-draggable";
import SelectResizableImage from "./selectResizableImage";
import Icon from "react-native-vector-icons/Feather";
import {
	PropertiesOfBox,
	Watermark,
	OptionsModalView,
	PinchableBox,
} from "./components";

// function PinchableBox({ imageUri, radius }) {
// 	const [editorData, setEditorData] = useContext(EditorContext);

// 	return (
// 		<PinchGestureHandler
// 			onGestureEvent={event => {
// 				// onPinchEvent();

// 				const newScale = event.nativeEvent.scale;

// 				setEditorData({
// 					...editorData,
// 					scale: newScale <= -1 ? editorData.scale : newScale,
// 				});
// 			}}>
// 			<Animated.View
// 				style={{
// 					width: "100%",
// 					height: "100%",
// 					borderRadius: radius,
// 					transform: [{ scale: 1 }],
// 				}}>
// 				<ImageBackground
// 					source={imageUri}
// 					resizeMode="cover"
// 					resizeMethod="auto"
// 					style={{
// 						borderRadius: radius,
// 						width: "100%",
// 						height: "100%",
// 					}}
// 				/>
// 			</Animated.View>
// 		</PinchGestureHandler>
// 	);
// }

export default function IfSelected({ navigation, image }) {
	const [contextData, setContextData] = useContext(MainContext);

	const [editorData, setEditorData] = useContext(EditorContext);

	const [dotClicked, setDotClicked] = useState(false);

	// show and hide the properties modal,
	const [showPropModal, setShowPropModal] = useState(false);

	// animate radius, rotate and borderWidth,
	const __borderWidth = useSharedValue(editorData.borderWidth);
	const __borderRadius = useSharedValue(editorData.radius);
	const __rotate = useSharedValue(editorData.rotate);
	const __scale = useSharedValue(editorData.scale);

	const __animBorderWidth = useAnimatedStyle(() => {
		return {
			borderWidth: __borderWidth.value,
		};
	}, []);

	useEffect(() => {
		__borderWidth.value = withTiming(editorData.borderWidth);
	}, [editorData.borderWidth]);

	const __animBorderRadius = useAnimatedStyle(() => {
		return {
			borderRadius: __borderRadius.value,
		};
	}, []);

	useEffect(() => {
		__borderRadius.value = withTiming(editorData.radius);
	}, [editorData.radius]);

	const __animRotate = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${__rotate.value}deg` }],
		};
	}, []);

	useEffect(() => {
		__rotate.value = withTiming(editorData.rotate);
	}, [editorData.rotate]);

	const __animScale = useAnimatedStyle(() => {
		return {
			transform: [{ scale: __scale.value }],
		};
	}, []);

	useEffect(() => {
		__scale.value = withTiming(editorData.scale, {
			duration: 100,
			easing: Easing.ease,
		});
	}, [editorData.scale]);

	const WIDTH = 130;
	const HEIGHT = 130;
	const SPACING = 30;

	const selectResizableImage = () => {
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
					resizableImage: imageUri,
				});

				setDotClicked(false);
			}
		});
	};

	return (
		<>
			<View
				style={{
					width: contextData.themes.width,
					height: contextData.themes.height,
					overflow: "hidden",
				}}>
				<ImageBackground
					source={image}
					style={{ width: "100%", height: "100%" }}
					resizeMode="cover"
					resizeMethod="auto">
					{contextData.resizableImage ? (
						<>
							<PinchableBox
								image={contextData.resizableImage}
								onLongPress={() => {
									setShowPropModal(true);
								}}
							/>
							{/* <Draggable
								x={SPACING}
								y={Dimensions.get("window").height - (HEIGHT + SPACING)}
								minX={0}
								minY={0}
								onLongPress={() => {
									setShowPropModal(true);
								}}
								touchableOpacityProps={{ activeOpacity: 1 }}>
								<Animated.View
									style={[
										{
											position: "relative",
											borderColor: "#000000",
											overflow: "hidden",
											width: WIDTH,
											height: HEIGHT,
										},
										__animBorderWidth,
										__animBorderRadius,
										__animRotate,
										__animScale,
									]}>
									<View
										style={{
											position: "relative",
											width: "100%",
											height: "100%",
										}}>
										<PinchableBox
											width={575}
											height={575}
											radius={999}
											imageUri={contextData.resizableImage}
										/>
									</View>
								</Animated.View>
							</Draggable> */}
						</>
					) : (
						<SelectResizableImage selectResizableImage={selectResizableImage} />
					)}
				</ImageBackground>

				{/* Go back to template page */}
				<View style={{ position: "absolute", top: 14, left: 10 }}>
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={() => navigation.goBack()}>
						<Icon name="arrow-left" size={30} color="#FFFFFF" />
					</TouchableOpacity>
				</View>

				{/* reselect or change image */}
				<View style={{ position: "absolute", top: 5, right: 5 }}>
					<TouchableOpacity
						style={{
							width: 30,
							height: 30,
							borderRadius: 999,
							backgroundColor: "#F1F3F4",
							justifyContent: "center",
							alignItems: "center",
						}}
						activeOpacity={0.9}
						onPress={() => {
							setDotClicked(true);
						}}>
						<Icon name="more-vertical" size={20} color="#00000090" />
					</TouchableOpacity>
				</View>

				{/* watermark */}
				<Watermark />

				{/* draggabble box properties modal */}
				{showPropModal ? (
					<PropertiesOfBox hideModal={() => setShowPropModal(false)} />
				) : null}

				{/* change image */}
				{dotClicked ? (
					<OptionsModalView
						setImage={selectResizableImage}
						changeTemplate={() => navigation.navigate("template")}
						hideModal={() => setDotClicked(false)}
					/>
				) : null}
			</View>
		</>
	);
}

const styles = StyleSheet.create({});
