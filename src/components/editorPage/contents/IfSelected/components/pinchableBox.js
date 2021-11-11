import React from "react";
import { Animated, StyleSheet, View } from "react-native";

import {
	PanGestureHandler,
	PinchGestureHandler,
	RotationGestureHandler,
	State,
} from "react-native-gesture-handler";
import { InnerView } from ".";

import { EditorContext } from "../../../context";

// const stateLabel = {
// 	0: "UNDETERMINED",
// 	1: "FAILED",
// 	2: "BEGAN",
// 	3: "CANCELLED",
// 	4: "ACTIVE",
// 	5: "END",
// };

export class PinchableBox extends React.Component {
	panRef = React.createRef();
	rotationRef = React.createRef();
	pinchRef = React.createRef();
	constructor(props) {
		super(props);

		this.image = props.image;

		/* Pinching */
		this._baseScale = new Animated.Value(1);
		this._pinchScale = new Animated.Value(1);
		this._scale = Animated.multiply(this._baseScale, this._pinchScale);
		this._lastScale = 1;
		this._onPinchGestureEvent = Animated.event(
			[{ nativeEvent: { scale: this._pinchScale } }],
			{ useNativeDriver: true },
		);

		/* Rotation */
		this._rotate = new Animated.Value(0);
		this._rotateStr = this._rotate.interpolate({
			inputRange: [-100, 100],
			outputRange: ["-100rad", "100rad"],
		});
		this._lastRotate = 0;
		this._onRotateGestureEvent = Animated.event(
			[{ nativeEvent: { rotation: this._rotate } }],
			{ useNativeDriver: true },
		);

		/* Pan */
		this._translateX = new Animated.Value(0);
		this._translateY = new Animated.Value(0);
		this._lastOffset = { x: 0, y: 0 };
		this._onPanGestureEvent = Animated.event(
			[
				{
					nativeEvent: {
						translationX: this._translateX,
						translationY: this._translateY,
					},
				},
			],
			{ useNativeDriver: true },
		);
	}

	_onRotateHandlerStateChange = event => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			this._lastRotate += event.nativeEvent.rotation;
			this._rotate.setOffset(this._lastRotate);
			this._rotate.setValue(0);
		}
	};
	_onPinchHandlerStateChange = event => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			this._lastScale *= event.nativeEvent.scale;
			this._baseScale.setValue(this._lastScale);
			this._pinchScale.setValue(1);
		}
	};
	_onPanGestureStateChange = event => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			this._lastOffset.x += event.nativeEvent.translationX;
			this._lastOffset.y += event.nativeEvent.translationY;
			this._translateX.setOffset(this._lastOffset.x);
			this._translateX.setValue(0);
			this._translateY.setOffset(this._lastOffset.y);
			this._translateY.setValue(0);
		}
	};

	render() {
		return (
			<View style={{ width: "100%", height: 400 }}>
				<PanGestureHandler
					ref={this.panRef}
					onGestureEvent={this._onPanGestureEvent}
					onHandlerStateChange={this._onPanGestureStateChange}>
					<Animated.View
						style={[
							styles.wrapper,
							{
								transform: [
									{ translateX: this._translateX },
									{ translateY: this._translateY },
								],
							},
						]}>
						<RotationGestureHandler
							ref={this.rotationRef}
							simultaneousHandlers={this.pinchRef}
							onGestureEvent={this._onRotateGestureEvent}
							onHandlerStateChange={this._onRotateHandlerStateChange}>
							<Animated.View
								style={[
									styles.wrapper,
									{
										transform: [{ rotate: this._rotateStr }],
									},
								]}>
								<PinchGestureHandler
									ref={this.pinchRef}
									simultaneousHandlers={this.rotationRef}
									onGestureEvent={this._onPinchGestureEvent}
									onHandlerStateChange={this._onPinchHandlerStateChange}>
									<Animated.View
										style={[
											styles.container,
											{
												transform: [{ scale: this._scale }],
											},
										]}
										collapsable={false}>
										<InnerView
											onLongPress={this.props.onLongPress}
											image={this.image}
										/>
									</Animated.View>
								</PinchGestureHandler>
							</Animated.View>
						</RotationGestureHandler>
					</Animated.View>
				</PanGestureHandler>
			</View>
		);
	}
}

PinchableBox.contextType = EditorContext;

export default PinchableBox;

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		// backgroundColor: "rgba(0,0,0,0.3)",
		overflow: "hidden",
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	wrapper: {
		flex: 1,
	},
});
