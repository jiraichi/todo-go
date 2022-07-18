import { Text } from "@chakra-ui/react";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ITodo } from "../../../App";
import { ThemeContext } from "../../../shared/contexts/ThemeContext";
import { Button } from "./Button"
import { Container } from "./Container"

interface ITodoProps extends ITodo { }


const completeTodo = async (id: string) => {
    const res = await fetch(`http://localhost:8080/todo/${id}`, {
        method: "PATCH"
    });
    if (!res.ok) {
        return Promise.reject(res.statusText);
    }

    return res.json();
}


export default function Todo({ id, item, completed }: ITodoProps) {

    const theme = useContext(ThemeContext);

    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation(completeTodo);

    const onCompleteClick = async () => {
        await mutateAsync(id);
        queryClient.invalidateQueries("todos");
    }

    return (
        <Container theme={theme}>
            <Text>
                {id}.
            </Text>
            <Text>
                {item}
            </Text>
            <Button completed={completed} onClick={onCompleteClick}>
                {completed ? 'Uncomplete' : 'Complete'}
            </Button>
        </Container>
    )
}