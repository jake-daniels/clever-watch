import { Colors } from 'src/domain/colors'
import styled, { keyframes } from 'styled-components'

type Props = {
  visible: boolean
}

export function Loader(props: Props) {
  const { visible } = props

  return (
    <Wrap $visible={visible}>
      <Slider />
    </Wrap>
  )
}

const SLIDER_WIDTH = 0.5 // 30%

const Wrap = styled.div<{ $visible: boolean }>`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.5rem;
  background: ${Colors.dark_blue};
  overflow: hidden;
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
`

const slide = keyframes`
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(calc(100% * (${1 / SLIDER_WIDTH})));
	}
`

const Slider = styled.div`
  width: calc(100% * ${SLIDER_WIDTH});
  height: 8px;
  background: linear-gradient(90deg, transparent 0%, ${Colors.mid_blue} 50%, transparent 100%);
  animation: ${slide} linear 2000ms infinite;
`
