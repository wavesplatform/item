import React from 'react'
import { IDapp } from '@item-protocol/types'
import { Flex, Box, Text, FlexProps } from 'rebass'
import { Avatar } from '@item-protocol/ui'

export const GameHeading = ({ dapp, ...wrapperProps }: GameHeadingProps) => {
  return (
    <Flex alignItems='center' {...wrapperProps}>
      <Avatar mr='lg' size='xl' src={dapp.image && dapp.image.icon} />
      <Box>
        <Text as='h1' fontSize='1.5rem'>
          {dapp.name || dapp.address}
        </Text>
        {dapp.meta && dapp.meta.description && (
          <Text opacity={0.7} mt='sm'>
            {dapp.meta.description}
          </Text>
        )}
      </Box>
    </Flex>
  )
}

interface GameHeadingProps extends FlexProps {
  dapp: IDapp
}
