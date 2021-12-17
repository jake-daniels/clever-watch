import { FaComment } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { getPosts } from 'src/domain/api'
import { Colors } from 'src/domain/colors'
import { Post } from 'src/domain/types'
import styled from 'styled-components'
import { Col, Row } from './flexbox'
import { Loader } from './loader'

interface Props {
  userId: number
  selectedPost?: Post
  onPostSelect: (post: Post) => void
}

export function PostList(props: Props) {
  const { userId, selectedPost, onPostSelect } = props

  const query = useQuery(['posts', userId], () => getPosts(userId))

  const posts = query.data || []
  const showLoader = query.isLoading
  const showError = !query.isLoading && query.error

  const isPostSelected = (post: Post) => {
    return post.id === selectedPost?.id
  }

  return (
    <Col $gap={'1rem'} $padding={'2rem'}>
      {showLoader && <Loader />}
      {showError && <InfoBox>Failed to load posts.</InfoBox>}
      {posts.map((post) => (
        <PostBox key={post.id} className={`${isPostSelected(post) ? 'selected' : ''}`}>
          <Title>{post.title}</Title>
          <Body>{post.body}</Body>
          <Row>
            <CommentsButton onClick={() => onPostSelect(post)}>
              <FaComment />
              <span>Read comments</span>
            </CommentsButton>
          </Row>
        </PostBox>
      ))}
    </Col>
  )
}

const PostBox = styled(Col)`
  padding: 1rem;
  gap: 1rem;
  border: 1px solid ${Colors.white_25_perc};
  border-radius: 0.5rem;
  &.selected {
    border-color: ${Colors.white};
    background: ${Colors.white_12_perc};
  }
`
const Title = styled.h4`
  margin: 0;
  font-size: 18px;
`
const Body = styled.p`
  margin: 0;
  font-size: 14px;
`
const CommentsButton = styled(Row)`
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  span {
    font-size: 14px;
  }
`
const InfoBox = styled.p`
  margin: 0;
  padding: 3rem;
  text-align: center;
  font-size: 14px;
  color: ${Colors.white_50_perc};
`
