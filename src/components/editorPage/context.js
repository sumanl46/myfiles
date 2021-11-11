import React, { createContext, useState } from "react";

export const EditorContext = createContext();

export function EditorContextProvider({ children }) {
	const [editorData, setEditorData] = useState({
		radius: 14,
		rotate: 0,
		borderWidth: 4,
		scale: 1,
	});

	return (
		<>
			<EditorContext.Provider value={[editorData, setEditorData]}>
				{children}
			</EditorContext.Provider>
		</>
	);
}
