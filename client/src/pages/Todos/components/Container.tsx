import styled from '@emotion/styled';

interface IContainerProps {
    theme: string;
}

export const Container = styled.div<IContainerProps>`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        text-align: center;
        padding: 20px;
        background-color: ${(props) => props.theme === 'dark' ? 'gray' : 'white'};
        color: ${(props) => props.theme === 'dark' ? 'white' : 'black'}
    `