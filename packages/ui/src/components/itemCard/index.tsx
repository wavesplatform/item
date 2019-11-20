import React from 'react'
import { Box, BoxProps, Flex, Image } from 'rebass'
import { IItem } from '@item-protocol/types'
import { ImageWrapper, Overview, StyledItemCard, Title } from './style'
import Quantity from '../globals/quantity'
import { DappHeading } from '../heading'
import { getImageSrc } from '../../helpers'

export type ItemCardStyle = 'base' | 'short'

export interface ItemCardProps extends Omit<BoxProps, 'style'> {
  item: IItem
  style?: ItemCardStyle
}

export const ItemCard = ({ item, style, sx, ...rest }: ItemCardProps) => {
  const isShort = style === 'short'
  const { name } = item.params

  return (
    <StyledItemCard
      sx={{
        bg: 'grays.8',
        borderRadius: 'lg',
        '&:hover': {
          bg: 'grays.7',
        },
        ...sx,
      }}
      {...rest}
    >
      {!isShort && <Flex px={'lg'} pt={'lg'} alignItems={'center'}>
        <Title
          as={'h3'}
          flex={'1'}
          fontSize={'body'}
          m={0}
        >
          {name}
        </Title>
        {item.quantity && <Quantity value={item.quantity} ml={'md'}/>}
      </Flex>}
      <Box p={'lg'}>
        <Overview>
          <ImageWrapper>
            <Image
              src={getImageSrc(item)}
              alt={`Item #${item.id}`}/>
          </ImageWrapper>
        </Overview>
      </Box>
      <Box px={'lg'} pb={'lg'}>
        {!isShort && <Flex justifyContent={'space-between'}>
          <DappHeading dapp={item.dapp} size={'sm'}/>
          {/*Price*/}
        </Flex>}
        {isShort && item.quantity && <Box fontSize={'sm'}>
          {/*Balance*/}
          <Quantity value={item.quantity}/>
        </Box>}
      </Box>
    </StyledItemCard>
  )
}
