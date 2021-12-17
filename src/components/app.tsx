import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Colors } from 'src/domain/colors'
import { SCREEN_LG_BREAKPOINT, SCREEN_MIN_WIDTH } from 'src/domain/constants'
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
          <UserList selectedUser={user} onUserSelect={setUser} />
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
  min-width: ${SCREEN_MIN_WIDTH};
  min-height: 100vh;
  background: ${Colors.app_background};
  color: whitesmoke;
`
const ListPane = styled(Col)`
  position: fixed;
  min-width: 20rem;
  @media only screen and (min-width: ${SCREEN_LG_BREAKPOINT}) {
    min-width: 25rem;
  }
`
const DetailPane = styled(Col)`
  flex-grow: 1;
  margin-left: 20rem;
  @media only screen and (min-width: ${SCREEN_LG_BREAKPOINT}) {
    margin-left: 25rem;
  }
`
