import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>{process.env.NEXT_PUBLIC_TITLE}</title>
      <meta name='description' content='Delivery' />
      <meta property='og:title' content='Delivery' />
      <meta property='og:description' content='Delivery' />
      <link rel="icon" href="/logo.png" type='image/png' />
    </Head>
    <Component {...pageProps} />
  </>;
}
