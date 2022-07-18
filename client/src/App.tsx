import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Text,
  Button
} from "@chakra-ui/react"
import Todos from "./pages/Todos/Todos";
import { Header } from "./shared/components/Header";
import { useQuery } from 'react-query'
import { useContext, useState } from "react";
import { ThemeContext } from "./shared/contexts/ThemeContext";



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


  const [customTheme, setCustomTheme] = useState<string>('dark');

  const onThemeChangeClick = () => {
    setCustomTheme(customTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <ChakraProvider theme={theme}>
      <ThemeContext.Provider value={customTheme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <Header>
              Golang Todo App
              <Button onClick={onThemeChangeClick}>
                {customTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Button>
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
      </ThemeContext.Provider>
    </ChakraProvider>
  )
} 