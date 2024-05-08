import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

import { makeCorrectIdForRedux, validator } from '../services/utility';

import { api } from '../services/dataService';