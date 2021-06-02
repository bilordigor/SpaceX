import Image from 'next/image'
import styled from 'styled-components'

const Card = styled.div`
  height: calc(100% - 4px);
  margin: 0 0;
  position: relative;
  background-color: ${({ theme }) => theme.colors.backgroundPaper};
  border: 2px solid ${({ theme, success }) => success ? theme.colors.successText : theme.colors.failureText};
  border-radius: 32px;
  
`

const ImgOffset = styled.div`
position: absolute;
top: -40px;
left: -40px;
height: 128px;
width: 128px;
border-radius: 50%;
background-color: ${({ theme }) => theme.colors.text};
`

const ImgWrapper = styled.div`
  margin-top: 16px;
  margin-left: 16px;
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
  
`

const Typography = styled.p`
  font-family: 'Roboto', sans-serif;  
  text-align: justify;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
`

const ShipLabel = styled.div`
  font-family: 'Roboto', sans-serif;
  margin: 16px 16px 8px 82px;
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const DateLabel = styled.div`
  font-family: 'Roboto', sans-serif;  
  margin: 0 4px 4px 82px;
  font-size: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const Divider = styled.div`
  margin: 4px 0;
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.divider};
`

export default function LaunchCard({ name, details, date, success, patch }) {

  return (
    <Card success={success}>
      <ImgOffset>
        <ImgWrapper >
          <Image
            src={patch != undefined ? patch : "/defaultShip.png"}
            width={96}
            height={96}
          />
        </ImgWrapper>
      </ImgOffset>

      <Content>
        <ShipLabel>
          {name}
        </ShipLabel>
        <DateLabel>
          {date[8] + date[9] + "." + date[5] + date[6] + "." + date[0] + date[1] + date[2] + date[3] + " " + date[11] + date[12] + ":" + date[14] + date[15]}
        </DateLabel>
        <Divider />
        <Typography>
          {details != undefined ? details : "No description :("}
        </Typography>
      </Content>
    </Card>
  )
}