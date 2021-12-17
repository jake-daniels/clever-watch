import { useEffect, useState } from 'react'
import { Colors } from 'src/domain/colors'
import { SCREEN_LG_BREAKPOINT } from 'src/domain/constants'
import { Post, User } from 'src/domain/types'
import { useFixedInViewport } from 'src/domain/use-fixed-position'
import styled, { css } from 'styled-components'
import { CommentList } from './comment-list'
import { Col, Row } from './flexbox'
import { PostList } from './post-list'
import { UserInfo } from './user-info'

interface Props {
  user?: User
}

export function UserDetail(props: Props) {
  const { user } = props

  const { ref: commentsPanelRef, isFixed: areCommentsFixed } = useFixedInViewport(2)

  const [selectedPost, setSelectedPost] = useState<Post>()

  useEffect(() => {
    setSelectedPost(undefined)
  }, [user])

  if (!user) {
    return (
      <Wrap>
        <Placeholder>
          <span>Select user to see details.</span>
        </Placeholder>
      </Wrap>
    )
  }

  return (
    <Wrap>
      <Panel>
        <UserInfo user={user} />
      </Panel>
      <Row $gap={'2rem'}>
        <PostsPanel $areCommentsFixed={Boolean(selectedPost && areCommentsFixed)}>
          <PostList userId={user.id} selectedPost={selectedPost} onPostSelect={setSelectedPost} />
        </PostsPanel>
        {selectedPost && (
          <CommentsPanel ref={commentsPanelRef} $areCommentsFixed={areCommentsFixed}>
            <CommentList postId={selectedPost.id} onHide={() => setSelectedPost(undefined)} />
          </CommentsPanel>
        )}
      </Row>
    </Wrap>
  )
}

const Wrap = styled(Col)`
  height: 100%;
  padding: 2rem;
  gap: 2rem;
  background: ${Colors.white_12_perc};
`
const Placeholder = styled(Row)`
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${Colors.white_50_perc};
`
const Panel = styled.div`
  position: relative;
  background: ${Colors.white_12_perc};
  border: 1px solid ${Colors.black_25_perc};
  border-radius: 0.5rem;
`
const PostsPanel = styled(Panel)<{ $areCommentsFixed: boolean }>`
  min-height: 20rem;
  width: ${({ $areCommentsFixed }) => ($areCommentsFixed ? 'calc(100% - 22rem)' : '100%')};

  @media only screen and (min-width: ${SCREEN_LG_BREAKPOINT}) {
    width: ${({ $areCommentsFixed }) => ($areCommentsFixed ? 'calc(100% - 32rem)' : '100%')};
  }
`
const CommentsPanel = styled(Panel)<{ $areCommentsFixed: boolean }>`
  min-height: 20rem;
  height: min-content;
  min-width: 20rem;
  width: 20rem;

  @media only screen and (min-width: ${SCREEN_LG_BREAKPOINT}) {
    min-width: 30rem;
    width: 30rem;
  }

  ${({ $areCommentsFixed }) =>
    $areCommentsFixed &&
    css`
      position: fixed;
      top: 2rem;
      right: 2rem;
    `}
`
