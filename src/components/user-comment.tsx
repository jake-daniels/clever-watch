import { Colors } from 'src/domain/colors'
import { Comment } from 'src/domain/types'
import styled from 'styled-components'
import { Col } from './flexbox'

interface Props {
  comment: Comment
}

export function UserComment(props: Props) {
  const { comment } = props

  return (
    <Box>
      <Title>{comment.name}</Title>
      <Body>{comment.body}</Body>
      <Author>{comment.email}</Author>
    </Box>
  )
}

const Box = styled(Col)`
  padding: 1rem;
  gap: 1rem;
  border: 1px solid ${Colors.white_25_perc};
  border-radius: 0.5rem;
`
const Title = styled.h4`
  margin: 0;
  font-size: 18px;
`
const Body = styled.p`
  margin: 0;
  font-size: 14px;
`
const Author = styled.span`
  margin: 0;
  font-size: 14px;
  text-align: right;
  color: ${Colors.white_50_perc};
`
