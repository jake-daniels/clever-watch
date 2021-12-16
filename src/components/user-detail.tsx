import { useEffect, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { getComments, getPosts } from 'src/domain/api'
import { Colors } from 'src/domain/colors'
import { Post, User } from 'src/domain/types'
import styled from 'styled-components'
import { Col, Row } from './flexbox'
import { Loader } from './loader'
import { UserComment } from './user-comment'
import { UserInfo } from './user-info'
import { UserPost } from './user-post'

interface Props {
  user?: User
}

export function UserDetail(props: Props) {
  const { user } = props

  const [selectedPost, setSelectedPost] = useState<Post>()

  useEffect(() => {
    setSelectedPost(undefined)
  }, [user])

  const userId = user?.id || 0
  const selectedPostId = selectedPost?.id || 0

  const postsQuery = useQuery(['posts', userId], () => getPosts(userId), {
    enabled: Boolean(userId),
  })
  const commentsQuery = useQuery(['comments', selectedPostId], () => getComments(selectedPostId), {
    enabled: Boolean(selectedPostId),
  })

  const posts = postsQuery.data || []
  const comments = commentsQuery.data || []

  if (!user) {
    return (
      <Wrap>
        <Placeholder>
          <span>Select user to see details</span>
        </Placeholder>
      </Wrap>
    )
  }

  return (
    <Wrap>
      <Col $gap={'2rem'}>
        <UserInfo user={user} />
        <Row $gap={'2rem'}>
          <PostsBox>
            {postsQuery.isLoading && <Loader />}
            {posts.map((post) => (
              <UserPost
                key={post.id}
                post={post}
                onCommentsToggle={() => setSelectedPost(post)}
                isSelected={post.id === selectedPost?.id}
              />
            ))}
          </PostsBox>
          {selectedPost && (
            <CommentsBox>
              {commentsQuery.isLoading && <Loader />}
              <HideButton onClick={() => setSelectedPost(undefined)}>
                <Label>Hide</Label>
                <FaChevronRight />
              </HideButton>
              {comments.map((comment) => (
                <UserComment key={comment.id} comment={comment} />
              ))}
            </CommentsBox>
          )}
        </Row>
      </Col>
    </Wrap>
  )
}

const Wrap = styled(Col)`
  height: 100%;
  padding: 2rem;
  background: ${Colors.white_12_perc};
`
const Placeholder = styled(Row)`
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${Colors.white_50_perc};
`
const Box = styled(Col)`
  position: relative;
  min-height: 20rem;
  padding: 2rem;
  gap: 1rem;
  background: ${Colors.white_12_perc};
  border: 1px solid ${Colors.black_25_perc};
  border-radius: 0.5rem;
`
const PostsBox = styled(Box)`
  flex-grow: 1;
`
const CommentsBox = styled(Box)`
  min-width: 30rem;
  width: 30rem;
  height: min-content;
`
const HideButton = styled(Row)`
  cursor: pointer;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
`
const Label = styled.span`
  font-size: 14px;
`
