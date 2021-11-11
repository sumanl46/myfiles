import React, { useState, useRef, useContext, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StatusBar,
} from "react-native";

// For Tab View,
import PagerView from "react-native-pager-view";

// Feather Icons,
import Icon from "react-native-vector-icons/Feather";

// styles,
import { styles } from "./assets/MainPageStyles";

// Templates Views,
import Templates from "./components/templates";

// for firebase,
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function TemplatePage({ navigation }) {
	const [searchValue, setSearchValue] = useState("");

	const [searchBarHeight, setSearchBarHeight] = useState(0);

	const [mainContainerHeight, setMainContainerHeight] = useState(0);

	const [tags, setTags] = useState([]);

	// const tags = [
	// 	{
	// 		key: "diwali",
	// 		title: "Diwali",
	// 	},
	// 	{
	// 		key: "holi",
	// 		title: "Holi",
	// 	},
	// 	{
	// 		key: "new_year",
	// 		title: "New Year",
	// 	},
	// 	{
	// 		key: "birthday",
	// 		title: "Birthday",
	// 	},
	// ];

	const [already, setAlready] = useState(false);
	const [pageIndex, setPageIndex] = useState(0);

	const pagerViewRef = useRef(null);

	const tagsCollectionRef = collection(db, "tags");

	useEffect(() => {
		const getTags = async () => {
			const response = await getDocs(tagsCollectionRef);
			console.log(response.docs);

			setTags(response.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		};

		getTags();
	}, []);

	return (
		<>
			<View
				style={[
					styles.container,
					{
						backgroundColor: "#FFFFFF",
					},
				]}
				onLayout={event => {
					const { height } = event.nativeEvent.layout;

					// settings main container height,
					setMainContainerHeight(height);
				}}>
				{/* StatusBar */}
				<StatusBar
					barStyle="light-content"
					showHideTransition={"fade"}
					hidden={false}
				/>

				{/* Search Field Container or Bar */}
				<View
					style={styles.searchBar.container}
					onLayout={event => {
						const { height } = event.nativeEvent.layout;

						// settings main container height,
						setSearchBarHeight(height);
					}}>
					<View
						style={{
							overflow: "hidden",
							width: "80%",
							height: "100%",
							borderRadius: 999,
							backgroundColor: "#F1F3F4",
						}}>
						{/* Search Icon */}
						<Icon
							name="search"
							size={24}
							style={[
								styles.searchBar.searchIcon,
								{
									color: searchValue.length >= 1 ? "#000000" : "#00000080",
								},
							]}
						/>

						{/* Search field */}
						<TextInput
							style={styles.searchBar.field}
							placeholder="Search Templates"
							placeholderTextColor="#00000060"
							keyboardType="ascii-capable"
							textContentType="name"
							onChangeText={value => {
								setSearchValue(value);
							}}
							value={searchValue}
						/>

						{/* Emtpy field cross icon */}
						{searchValue.length >= 1 ? (
							<>
								<TouchableOpacity
									style={styles.searchBar.crossIcon}
									activeOpacity={1}
									onPress={() => {
										// lets clear the input field,
										setSearchValue("");
									}}>
									<Icon name="x" size={18} color={"#000000"} />
								</TouchableOpacity>
							</>
						) : null}
					</View>
				</View>

				{/* Categories or Groups or Tabs */}
				<View
					style={[
						styles.grids,
						{
							height: mainContainerHeight - searchBarHeight,
						},
					]}>
					<View
						style={{
							position: "relative",
							width: "100%",
							height: "100%",
						}}>
						{/* Tabs */}
						<View style={styles.flexTabs.container}>
							{tags.map((tag, index) => (
								<TouchableOpacity
									style={[
										styles.flexTabs.tab.tab,
										{
											marginRight:
												index === 0 ? 15 : index >= tags.length - 1 ? 0 : 15,
										},
									]}
									activeOpacity={1}
									key={index}
									onPress={() => {
										setAlready(true);
										setPageIndex(index);
										pagerViewRef.current.setPage(index);

										setAlready(false);
									}}>
									<Text
										style={[
											styles.flexTabs.tab.text,
											{
												color: index === pageIndex ? "#3498DB" : "#000000",
											},
										]}>
										{tag.title}
									</Text>
								</TouchableOpacity>
							))}
						</View>

						{/* Tab View */}
						<PagerView
							style={{ flex: 1 }}
							transitionStyle="curl"
							showPageIndicator={true}
							initialPage={0}
							ref={pagerViewRef}
							onPageScroll={event => {
								if (already == false) {
									setPageIndex(event.nativeEvent.position);
								}
							}}>
							{/* Pages */}
							{tags.map((view, index) => (
								<View
									style={{
										position: "relative",
										width: "100%",
										height: "100%",
										justifyContent: "center",
										alignItems: "center",
									}}
									key={index}
									collapsable={false}>
									<Templates tag={view.key} navigation={navigation} />
								</View>
							))}
						</PagerView>
					</View>
				</View>
			</View>
		</>
	);
}
