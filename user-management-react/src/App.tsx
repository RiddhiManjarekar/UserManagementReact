import { ChakraProvider } from '@chakra-ui/react';
import AppRoutes from './routes';
import { ThemeProvider } from './context/ThemeContext';

const App = () => (
  <ChakraProvider>
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  </ChakraProvider>
);

export default App;
