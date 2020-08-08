import React from 'react'
import Particles from '../Particles/index'
import {
  HeroContainer,
  TitleContainer,
  HeroTitle,
  HeroSubTitle,
} from './styles'

interface Props {
  title: string
  subTitle: string
}
const Hero = ({ title, subTitle }: Props) => {
  return (
    <HeroContainer>
      <Particles />
      <TitleContainer>
        <HeroTitle>{title}</HeroTitle>
        {subTitle && <HeroSubTitle>{subTitle}</HeroSubTitle>}
      </TitleContainer>
    </HeroContainer>
  )
}

export default Hero
