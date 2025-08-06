import { createSlice } from "@reduxjs/toolkit";

let id = 0

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state,action) => {
            state.push({
                id: ++id,
                task: action.payload.task,
                completed: false
            })
        },
        removeTask: (state, action) => {
            const index = state.findIndex(item => item.id === action.payload.id)
            if (index >= 0) {
                state.splice(index, 1)
            }
        },
        completeTask: (state, action) => {
            const index = state.findIndex(item => item.id === action.payload.id)
            if (index >= 0) {
                state[index].completed = true
            }
        }
    }
})

export const {addTask, removeTask, completeTask} = taskSlice.actions
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