import React from 'react'
import styled, { css } from 'styled-components'

interface Props {
  $padding?: React.CSSProperties['padding']
  $margin?: React.CSSProperties['margin']
  $gap?: React.CSSProperties['gap']
  $align?: React.CSSProperties['alignItems']
  $justify?: React.CSSProperties['justifyContent']
}

const FlexboxProps = css<Props>`
  display: flex;
  padding: ${({ $padding }) => $padding};
  margin: ${({ $margin }) => $margin};
  gap: ${({ $gap }) => $gap};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
`

export const Row = styled.div<Props>`
  ${FlexboxProps};
  flex-direction: row;
`
export const Col = styled.div<Props>`
  ${FlexboxProps};
  flex-direction: column;
`
