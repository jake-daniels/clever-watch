import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Colors } from 'src/domain/colors'
import { User } from 'src/domain/types'
import styled from 'styled-components'
import { Col, Row } from './flexbox'
import { UserDetail } from './user-detail'
import { UserList } from './user-list'

const client = new QueryClient()

export function App() {
  const [user, setUser] = useState<User>()

  return (
    <QueryClientProvider client={client}>
      <AppContainer>
        <ListPane>
          <UserList selectedUser={user} onSelectedUserChange={setUser} />
        </ListPane>
        <DetailPane>
          <UserDetail user={user} />
        </DetailPane>
      </AppContainer>
    </QueryClientProvider>
  )
}

const AppContainer = styled(Row)`
  width: 100%;
  min-height: 100vh;
  background: ${Colors.app_background};
  color: whitesmoke;
`
const ListPane = styled(Col)`
  min-width: 25rem;
`
const DetailPane = styled(Col)`
  flex-grow: 1;
`
