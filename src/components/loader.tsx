import { Colors } from 'src/domain/colors'
import styled, { keyframes } from 'styled-components'

export function Loader() {
  return (
    <Wrap>
      <Spinner />
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const spin = keyframes`
	to { -webkit-transform: rotate(360deg); }
`

const Spinner = styled.div`
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 4px solid ${Colors.white_25_perc};
  border-top-color: ${Colors.white};
  animation: ${spin} 2s linear infinite;
  -webkit-animation: ${spin} 2s linear infinite;
`
