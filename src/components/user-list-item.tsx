import { Colors } from 'src/domain/colors'
import { User } from 'src/domain/types'
import styled, { css } from 'styled-components'
import { Col, Row } from './flexbox'

interface Props {
  user: User
  isSelected: boolean
  onClick: () => void
}

export function UserListItem(props: Props) {
  const { user, isSelected, onClick } = props

  return (
    <UserBox key={user.id} onClick={onClick} className={isSelected ? 'selected' : ''}>
      <Row $align={'center'} $gap={'1rem'}>
        <Avatar src={user.photo} />
        <Col $gap={'0.5rem'}>
          <Username>{user.username}</Username>
          <Name>{user.name}</Name>
        </Col>
      </Row>
    </UserBox>
  )
}

const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`
const UserHighlight = css`
  background: ${Colors.white_12_perc};
  color: ${Colors.white};
  ${Avatar} {
    border: 2px solid white;
  }
`
const UserBox = styled(Col)`
  cursor: pointer;
  padding: 1rem 2rem;
  color: ${Colors.white_75_perc};
  transition: padding ease-in-out 250ms;
  &:hover,
  &.selected {
    ${UserHighlight};
  }
  &.selected {
    padding-left: 4rem;
  }
`
const Username = styled.span``
const Name = styled.span`
  font-size: 12px;
  opacity: 0.5;
`
