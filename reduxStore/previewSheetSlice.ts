import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreviewSheetState {
    isOpen: boolean;
    previewContent: string | null;
}

const initialState: PreviewSheetState = {
    isOpen: false,
    previewContent: null,
};

const previewSheetSlice = createSlice({
    name: "previewSheet",
    initialState,
    reducers: {
        openPreview(state, action: PayloadAction<{content: string}>) {
            state.previewContent = action.payload.content;
            state.isOpen = true;
        },
        closePreview(state) {
            state.previewContent = null;
            state.isOpen = false;
        },
        setPreviewContent(state, action: PayloadAction<string | null>) {
            state.previewContent = action.payload;
        },
    },
});

export const { openPreview, closePreview, setPreviewContent } =
    previewSheetSlice.actions;

export default previewSheetSlice.reducer;
