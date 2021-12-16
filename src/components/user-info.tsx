import { Colors } from 'src/domain/colors'
import { User } from 'src/domain/types'
import styled from 'styled-components'
import { Col, Row } from './flexbox'
import { FaBriefcase, FaGlobe, FaEnvelope, FaAddressCard, FaPhone } from 'react-icons/fa'

interface Props {
  user: User
}

export function UserInfo(props: Props) {
  const { user } = props

  const { geo, ...address } = user.address

  return (
    <Wrap>
      <Row $width={'50%'} $gap={'2rem'}>
        <Avatar src={user.photo} alt={`photo of ${user.name}`} />
        <Col $justify={'space-between'} $padding={'1rem 0'}>
          <Col $gap={'0.5rem'}>
            <Username>{user.username}</Username>
            <Name>{user.name}</Name>
          </Col>
          <Row $gap={'1rem'}>
            <FaBriefcase />
            <span>{user.company.name}</span>
          </Row>
        </Col>
      </Row>
      <Col $width={'50%'} $gap={'0.5rem'} $padding={'1rem 0'}>
        <ContactTitle>Contact</ContactTitle>
        <Row $gap={'1rem'}>
          <FaGlobe />
          <span>{user.website}</span>
        </Row>
        <Row $gap={'1rem'}>
          <FaEnvelope />
          <span>{user.email}</span>
        </Row>
        <Row $gap={'1rem'}>
          <FaAddressCard />
          <span>{Object.values(address).join('\n')}</span>
        </Row>
        <Row $gap={'1rem'}>
          <FaPhone />
          <span>{user.phone}</span>
        </Row>
      </Col>
    </Wrap>
  )
}

const Wrap = styled(Row)`
  padding: 2rem;
  background: ${Colors.white_12_perc};
  border: 1px solid ${Colors.black_25_perc};
  border-radius: 0.5rem;
`
const Avatar = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: cover;
`
const Username = styled.span`
  font-size: 2rem;
`
const Name = styled.span`
  font-size: 1.5rem;
  color: ${Colors.white_50_perc};
`
const ContactTitle = styled.span`
  font-size: 1.5rem;
`
