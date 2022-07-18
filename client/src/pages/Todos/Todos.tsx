import { Box } from "@chakra-ui/react";
import { ITodo } from "../../App";
import Todo from "./components/Todo";

interface ITodosProps {
    todos: ITodo[];
}


export default function Todos({ todos }: ITodosProps) {
    return (
        <Box>
            {todos.map((todo) => (
                <Todo key={todo.id} id={todo.id} item={todo.item} completed={todo.completed} />
            ))}
        </Box>
    )
}