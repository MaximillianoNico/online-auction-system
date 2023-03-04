import type { ReactElement, ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import './styles.css';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)


  return (
    <ChakraProvider>
      {getLayout(
        <>
          <Head>
            <title>Welcome to client!</title>
          </Head>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </>
      )}
    </ChakraProvider>
  )
}

export default CustomApp;
