import { FaChevronRight } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { getComments } from 'src/domain/api'
import { Colors } from 'src/domain/colors'
import styled from 'styled-components'
import { Col, Row } from './flexbox'
import { Loader } from './loader'

interface Props {
  postId: number
  onHide: () => void
}

export function CommentList(props: Props) {
  const { postId, onHide } = props

  const query = useQuery(['comments', postId], () => getComments(postId))

  const comments = query.data || []
  const showLoader = query.isLoading
  const showError = !query.isLoading && query.error

  return (
    <Col $gap={'1rem'} $padding={'2rem'}>
      {showLoader && <Loader />}
      {showError && <InfoBox>Failed to load comments.</InfoBox>}
      <Row $justify={'flex-end'}>
        <HideButton onClick={onHide}>
          <ButtonLabel>Hide</ButtonLabel>
          <FaChevronRight />
        </HideButton>
      </Row>
      {showError && <InfoBox>Failed to load users.</InfoBox>}
      <List>
        {comments.map((comment) => (
          <CommentBox key={comment.id}>
            <Title>{comment.name}</Title>
            <Body>{comment.body}</Body>
            <Author>{comment.email}</Author>
          </CommentBox>
        ))}
      </List>
    </Col>
  )
}

const HideButton = styled(Row)`
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`
const ButtonLabel = styled.span`
  font-size: 14px;
`
const List = styled(Col)`
  gap: 1rem;
  padding-right: 1rem;
  max-height: calc(100vh - 26.5rem);
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
const CommentBox = styled(Col)`
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
const InfoBox = styled.p`
  margin: 0;
  padding: 3rem;
  text-align: center;
  font-size: 14px;
  color: ${Colors.white_50_perc};
`
