import { Task } from "../../infrastructure/graphql/types/task.gqltype";
import { TaskModel } from "../model/task.model";

export const taskMapper = (task: TaskModel): Task => {
    return {
        _id: task._id.value,
        title: task.title.value,
        description: task.description.value,
        is_finish: task.is_finish.value,
    }
};