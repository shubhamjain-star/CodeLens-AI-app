import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: "",
  language: "javascript",
  review: null,
  loading: false,
  error: null,
};

const codeSlice = createSlice({
  name: "code",

  initialState,

  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },

    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    setReview: (state, action) => {
      state.review = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearReview: (state) => {
      state.review = null;
      state.error = null;
    },
  },
});

export const {
  setCode,
  setLanguage,
  setReview,
  setLoading,
  setError,
  clearReview,
} = codeSlice.actions;

export default codeSlice.reducer;