import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarCollapsed: false
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    }
  }
});

export const { toggleSidebar } = layoutSlice.actions;
export default layoutSlice.reducer; 