import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { getUsers } from 'src/domain/api'
import { Colors } from 'src/domain/colors'
import { User } from 'src/domain/types'
import { matchSubstring } from 'src/domain/utils'
import styled, { css } from 'styled-components'
import { Col, Row } from './flexbox'
import { Loader } from './loader'
import { FaSearch } from 'react-icons/fa'

interface Props {
  selectedUser?: User
  onSelectedUserChange: (selectedUser?: User) => void
}

export function UserList(props: Props) {
  const { selectedUser, onSelectedUserChange } = props

  const [search, setSearch] = useState<string>('')

  const query = useQuery('users', getUsers)

  const users = useMemo(() => {
    const allUsers = query.data || []
    if (!search) {
      return allUsers
    } else {
      return allUsers.filter(
        (user) =>
          matchSubstring(user.username, search) ||
          matchSubstring(user.name, search) ||
          matchSubstring(user.email, search),
      )
    }
  }, [query.data, search])

  const isSelectedUser = (user: User) => {
    return user.id === selectedUser?.id
  }

  const toggleUser = (user: User) => {
    if (isSelectedUser(user)) {
      onSelectedUserChange(undefined)
    } else {
      onSelectedUserChange(user)
    }
  }

  const isEmpty = users.length === 0
  const showError = !query.isLoading && query.error
  const showNoResults = !query.isLoading && isEmpty

  return (
    <Wrap>
      <Loader visible={query.isLoading} />
      <Col>
        <InputWrap>
          <SearchInput
            placeholder={'Search...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon />
        </InputWrap>
        {showError && <InfoBox>Failed to load users.</InfoBox>}
        {showNoResults && <InfoBox>No results found. Try different search.</InfoBox>}
        {users.map((user) => (
          <UserBox
            key={user.id}
            onClick={() => toggleUser(user)}
            className={isSelectedUser(user) ? 'selected' : ''}
          >
            <Row $align={'center'} $gap={'1rem'}>
              <Avatar src={user.photo} />
              <Col $gap={'0.5rem'}>
                <Username>{user.username}</Username>
                <Name>{user.name}</Name>
              </Col>
            </Row>
          </UserBox>
        ))}
      </Col>
    </Wrap>
  )
}

const Wrap = styled(Col)`
  position: relative;
  height: 100%;
`
const InputWrap = styled.div`
  position: relative;
  padding: 1rem;
`
const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 1.75rem;
  right: 1.75rem;
  color: ${Colors.white_50_perc};
`
const SearchInput = styled.input`
  background: ${Colors.white_25_perc};
  height: 2.5rem;
  width: 100%;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
  outline: none;
  border: 1px solid ${Colors.white_25_perc};
  color: ${Colors.white};
  ::placeholder {
    color: ${Colors.white_50_perc};
  }
  &:focus,
  &:active {
    border-color: ${Colors.white};
  }
`
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
  padding: 1rem;
  color: ${Colors.mid_grey};
  transition: padding ease-in-out 250ms;
  &:hover,
  &.selected {
    ${UserHighlight};
  }
  &.selected {
    padding-left: 2rem;
  }
`
const Username = styled.span``
const Name = styled.span`
  font-size: 12px;
  opacity: 0.5;
`
const InfoBox = styled.p`
  margin: 0;
  padding: 3rem;
  text-align: center;
  font-size: 14px;
  color: ${Colors.white_50_perc};
`
