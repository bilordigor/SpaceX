import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import LaunchList from '../components/LaunchList'

const Container = styled.div`
  padding: 0 0;
  min-height: 100vh;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};  
`

const Header = styled.div`
  height: 64px;
  width: 100%;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.backgroundPaper};
  z-index: 1;
  
`

const ImgWrapper = styled.div`
  margin-top: 2px;
  margin-left: 16px;
`


export default function Home() {
  
  return (
    <Container>
      <Head>
        <title>SpaceX Launches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <ImgWrapper>
          <Image
            alt="SpaceX Logo"
            src="/spacex-logo-black-and-white.png"
            width={320}
            height={48}
          />
        </ImgWrapper>
      </Header>
      <LaunchList />


    </Container>
  )
}
