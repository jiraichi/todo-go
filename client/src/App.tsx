import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Text,
} from "@chakra-ui/react"
import Todos from "./pages/Todos/Todos";
import { Header } from "./shared/components/Header";
import { useQuery } from 'react-query'



export interface ITodo {
  id: string;
  item: string;
  completed: boolean;
}

const fetchTodos = async () => {
  const res = await fetch('http://localhost:8080/todos');
  if (!res.ok) {
    return Promise.reject(res.statusText);
  }

  return res.json();
}

export default function App() {
  const { data, isLoading, isError, error } = useQuery<ITodo[], string>('todos', fetchTodos, {
    // assume we update todos externally
    staleTime: 10000,
    // no reason to retry 3 times
    retry: 1,
    cacheTime: 10
  })



  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Header>
            Golang Todo App
          </Header>
          {isLoading &&
            <Box>
              <Text>
                Loading todos...
              </Text>
            </Box>
          }

          {
            isError &&
            <Box>
              <Text>
                {error}
              </Text>
            </Box>
          }

          {data &&
            <Todos todos={data} />
          }
        </Grid>
      </Box>
    </ChakraProvider>
  )
} 