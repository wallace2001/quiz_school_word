import { AuthProvider } from '../src/providers/provider'
import { ChakraProvider } from "@chakra-ui/react"
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
    )
}

export default MyApp
