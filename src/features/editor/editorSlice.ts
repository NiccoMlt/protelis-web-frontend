import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProtelisFile, ProtelisSourceFile } from '../../model/File';
import { editFileAtPath } from '../../utils/fileUtils';

/** This partial state is related to the TreeView of the editor block. */
interface FileTreeState {
  files: ProtelisFile[];
}

/** This partial state is related to the TextArea of the editor block. */
interface EditorState {
  open: string | null;
}

/** State type of the Protelis editor block. */
type EditorBlockState = FileTreeState & EditorState;

export const initialState: EditorBlockState = {
  files: [
    {
      name: 'main.pt',
      content: 'def aFunction() = 1\naFunction() * self.nextRandomDouble()',
    },
  ],
  open: 'main.pt',
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    addFile(state, action: PayloadAction<ProtelisSourceFile>): void {
      const { files } = state;
      files.push(action.payload);
      state.files = files;
    },
    openFile(state, action: PayloadAction<string>): void {
      state.open = action.payload;
    },
    closeFile(state, action: PayloadAction<string | null>): void {
      if (state.open === action.payload) state.open = null;
    },
    editFile(state, action: PayloadAction<{path: string; content: string}>) {
      state.files = editFileAtPath(state.files, action.payload.path, action.payload.content);
    },
  },
});

/**
 * @param addFile - action dispatched when a file is added
 * @param closeFile - action dispatched when a file is closed
 * @param editFile - action dispatched when a file open in editor is saved
 * @param openFile - action dispatched when a file is selected to be opened
 */
export const {
  addFile, closeFile, editFile, openFile,
} = editorSlice.actions;

/** Reducer from the Redux slice of the editor. */
export default editorSlice.reducer;
