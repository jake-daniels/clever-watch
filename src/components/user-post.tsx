import { FaComment } from 'react-icons/fa'
import { Colors } from 'src/domain/colors'
import { Post } from 'src/domain/types'
import styled from 'styled-components'
import { Col, Row } from './flexbox'

interface Props {
  post: Post
  isSelected: boolean
  onCommentsToggle: () => void
}

export function UserPost(props: Props) {
  const { post, isSelected, onCommentsToggle } = props

  return (
    <Box className={`${isSelected ? 'selected' : ''}`}>
      <Title>{post.title}</Title>
      <Body>{post.body}</Body>
      <Row>
        <CommentsButton onClick={onCommentsToggle}>
          <FaComment />
          <span>Read comments</span>
        </CommentsButton>
      </Row>
    </Box>
  )
}

const Box = styled(Col)`
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
