import styled from '@emotion/styled';

interface IButtonProps {
    completed: boolean;
}

export const Button = styled.button<IButtonProps>`
        color: white;
        background-color: ${(props) => props.completed ? 'red' : 'green'};
        padding: 10px;
        border-radius: 5px;
    `