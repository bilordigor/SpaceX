import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #6b6b6b;
    min-height: 24px;
    border: 3px solid #2b2b2b;
  }

  ::-webkit-scrollbar {
      background-color: #2b2b2b;
  }

  ::backdrop {
      background-color: #121212;
  }

`

const theme = {
  colors: {
    primary: '#0070f3',
    backgroundPaper: '#424242',
    background: '#303030',
    text: '#fff',
    successText: '#4caf50',
    failureText: '#f44336',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    divider: 'rgba(255, 255, 255, 0.12)',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}