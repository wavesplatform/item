import React from 'react'
import { Box, Flex, Image } from 'rebass'
import { IItem } from '@item/types'
import emptyImage from '../image/empty.svg'
import { ImageWrapper, Overview, StyledItemCard, Title } from './style'
import Quantity from '../globals/quantity'
import { DappHeading } from '../heading'

export type ItemCardStyle = 'base' | 'short'

interface IProps {
  item: IItem
  style?: ItemCardStyle
}

export const ItemCard = ({ item, style, ...rest }: IProps) => {
  const isShort = style === 'short'
  const { imageUrl, storageImageUrl, name } = item.params
  const image = storageImageUrl || imageUrl || emptyImage

  return (
    <StyledItemCard
      bg={'grays.8'}
      borderRadius={'lg'}
      sx={{
        '&:hover': {
          bg: 'grays.7',
        },
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
              src={image}
              alt={`Item #${item.id}`}/>
          </ImageWrapper>
        </Overview>
      </Box>
      <Box px={'lg'} pb={'lg'}>
        {!isShort && <Flex justifyContent={'space-between'}>
          <DappHeading dapp={item.dapp} size={'sm'}/>
        </Flex>}
        {isShort && item.quantity && <Box fontSize={'sm'}>
          <Quantity value={item.quantity}/>
        </Box>}
      </Box>
    </StyledItemCard>
  )
}
