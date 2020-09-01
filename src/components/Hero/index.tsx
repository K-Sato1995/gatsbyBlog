import React from 'react'
import { HeroContainer, TitleContainer, HeroSubTitle } from './styles'
import Search from '../Search'

interface Props {
  title: string
}
const Hero = ({ title }: Props) => {
  return (
    <HeroContainer>
      <TitleContainer>
        <HeroSubTitle>{title}</HeroSubTitle>
        <Search />
      </TitleContainer>
    </HeroContainer>
  )
}

export default Hero
