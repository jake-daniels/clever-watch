import { useMemo, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { getUsers } from 'src/domain/api'
import { Colors } from 'src/domain/colors'
import { User } from 'src/domain/types'
import styled from 'styled-components'
import { Col } from './flexbox'
import { Loader } from './loader'
import { UserListItem } from './user-list-item'

interface Props {
  selectedUser?: User
  onUserSelect: (selectedUser?: User) => void
}

export function UserList(props: Props) {
  const { selectedUser, onUserSelect } = props

  const [search, setSearch] = useState<string>('')

  const query = useQuery('users', getUsers)

  const users = useMemo(() => {
    const allUsers = query.data || []
    if (!search) {
      return allUsers
    } else {
      return allUsers.filter(
        (user) => matchSubstring(user.username, search) || matchSubstring(user.name, search),
      )
    }
  }, [query.data, search])

  const isSelectedUser = (user: User) => {
    return user.id === selectedUser?.id
  }

  const toggleUser = (user: User) => {
    if (isSelectedUser(user)) {
      onUserSelect(undefined)
    } else {
      onUserSelect(user)
    }
  }

  const isEmpty = users.length === 0
  const showLoader = query.isLoading
  const showError = !query.isLoading && query.error
  const showNoResults = !query.isLoading && isEmpty

  return (
    <Wrap>
      <InputWrap>
        <SearchInput
          placeholder={'Search...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon />
      </InputWrap>
      {showLoader && <Loader />}
      {showError && <InfoBox>Failed to load users.</InfoBox>}
      {showNoResults && <InfoBox>No results found. Try different search.</InfoBox>}
      <UsersContainer>
        {users.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            isSelected={isSelectedUser(user)}
            onClick={() => toggleUser(user)}
          />
        ))}
      </UsersContainer>
    </Wrap>
  )
}

function matchSubstring(target: string, substring: string) {
  return target.toLocaleLowerCase().includes(substring.toLocaleLowerCase())
}

const Wrap = styled(Col)`
  position: relative;
  height: 100%;
`
const InputWrap = styled.div`
  position: relative;
  padding: 2rem;
`
const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 2.75rem;
  right: 2.75rem;
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
const UsersContainer = styled(Col)`
  height: calc(100vh - 6.5rem);
  overflow: auto;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 6px;
    background-color: ${Colors.white_25_perc};
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: ${Colors.white_50_perc};
  }
`
const InfoBox = styled.p`
  margin: 0;
  padding: 3rem;
  text-align: center;
  font-size: 14px;
  color: ${Colors.white_50_perc};
`
