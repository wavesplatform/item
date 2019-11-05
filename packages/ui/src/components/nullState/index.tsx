import React, { PropsWithChildren } from 'react'
import { Icon } from '../icon'
import { Flex, FlexProps, Heading, Text } from 'rebass'

export interface NullStateProps extends FlexProps {
  heading?: string
  message?: string
  icon?: string
}

export const NullState = ({ icon, heading, message, children, ...rest }: PropsWithChildren<NullStateProps>) => (
  <Flex
    width={1}
    {...rest}
    sx={{
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      p: 'md',
    }}
  >
    {icon && <Icon glyph={icon} fontSize={'2.4rem'} color={'grays.2'} mb={'sm'}/>}
    {heading && <Heading as={'h2'}
                         width={1}
                         sx={{ color: 'grays.1', fontSize: 'h2', textAlign: 'center' }}
                         mb={'sm'}>
      {heading}
    </Heading>}
    {message && <Text color={'grays.4'} width={1} textAlign={'center'}>{message}</Text>}
    {children}
  </Flex>
)
