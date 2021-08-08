import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';

function CustomApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>TODO LIST</title>
      </Head>
      <div className="app">
        <main>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </main>
      </div>
    </>
  );
}

export default CustomApp;
