import { createSelector } from "reselect";

export const todoListSelector = (state) => state.todoList;
export const filterStatusSelector = (state) => state.filters.status;
export const searchTextSelector = (state) => state.filters.search;
export const filterPrioritySelector = (state) => state.filters.priority;

export const todoRemainingSelector = createSelector(
    todoListSelector,
    filterStatusSelector,
    searchTextSelector,
    filterPrioritySelector,
    (todoList, status, searchText, priorities) => {
        return todoList.filter((todo) => {
            if (status === "All") {
                return priorities.length ? todo.name.includes(searchText) && priorities.includes(todo.priority)
                    : todo.name.includes(searchText);
            }

            return (
                priorities.length ?
                    todo.name.includes(searchText) &&
                    (status !== "All" && status === "Completed"
                        ? todo.completed
                        : !todo.completed) && priorities.includes(todo.priority)
                    : todo.name.includes(searchText) &&
                    (status !== "All" && status === "Completed"
                        ? todo.completed
                        : !todo.completed)
            );
        })
    })