
import { createGlobalStyle } from 'styled-components'
import { StateContext } from '@/context/StateContext'

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    
  }
`

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <StateContext>
         <Component {...pageProps} /> 
      </StateContext>
    </>
  );
}
