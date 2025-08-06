import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let id = 0
const initialState = {
    tasks: [],
    loading: false,
    error: null
}

export const fetchTasks = createAsyncThunk('fetchTasks', async (_, {rejectWithValue})=>{
    try {
        const response = await axios.get('http://localhost:5000/api/taskss')
        return {tasks: response.data}
    } catch (error) {
        return rejectWithValue({error: error.message})
    }
})

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        getTasks: (state, action) => {
            state.tasks = action.payload.tasks
        },
        addTask: (state,action) => {
            state.tasks.push({
                id: ++id,
                task: action.payload.task,
                completed: false
            })
        },
        removeTask: (state, action) => {
            const index = state.tasks.findIndex(item => item.id === action.payload.id)
            if (index >= 0) {
                state.tasks.splice(index, 1)
            }
        },
        completeTask: (state, action) => {
            const index = state.tasks.findIndex(item => item.id === action.payload.id)
            if (index >= 0) {
                state.tasks[index].completed = true
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(
            fetchTasks.pending, (state, action) => {
                state.loading = true
            })
        .addCase(
            fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks
                state.loading = false
            })
        .addCase(
            fetchTasks.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error
            })
    }
})

export const { getTasks, addTask, removeTask, completeTask} = taskSlice.actions
export default taskSlice.reducer


// export const addTask = createAction("ADD_TASK")
// export const removeTask = createAction("REMOVE_TASK")
// export const completeTask = createAction("COMPLETE_TASK")


// export default createReducer([], (builder)=>{
//     builder
//     .addCase(addTask, (state, action) => {
//         state.push({
//             id: ++id,
//             task: action.payload.task,
//             completed: false
//         })
//     })
//     .addCase(removeTask, (state, action) => {
//         const index = state.findIndex(item => item.id === action.payload.id)
//         if (index >= 0) {
//             state.splice(index, 1)
//         }
//     })
//     .addCase(completeTask, (state, action) => {
//         const index = state.findIndex(item => item.id === action.payload.id)
//         if (index >= 0) {
//             state[index].completed = true
//         }
//     })
// })