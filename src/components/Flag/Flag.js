import React from 'react'
import styled from 'styled-components'
import jpFlag from './jpFlag.png'
import usFlag from './usFlag.png'

const FlagImage = styled.img`
  padding-right: 0.5rem;
  padding-bottom: 0.2rem;
`

class Flag extends React.Component {
  render() {
    const { language } = this.props
    const img = language === 'japanese' ? jpFlag : usFlag
    const alt = language === 'en' ? 'English post' : '日本語の投稿'

    return <FlagImage src={img} alt={alt} className="flag" />
  }
}

export default Flag
