import React, { PropsWithChildren } from 'react'
import { Icon, IconProps } from '@item-protocol/ui'
import { Link, Flex, Text } from 'rebass'

const widgetSize = 56
const activeWidgetWidth = 168

export const DiscordWidget = (props: PropsWithChildren<DiscordWidgetProps>) => (
  <Link
    href={props.url}
    target='_blank'
    width={widgetSize}
    height={widgetSize}
    backgroundColor='grays.0'
    color='secondary'
    overflow='hidden'
    sx={{
      position: 'fixed',
      bottom: 'xl',
      right: 'xl',
      borderRadius: 28,
      transition: 'width .1s ease, background-color .1s ease',

      '&:hover': {
        width: activeWidgetWidth,
        backgroundColor: '#7289da',
        color: 'grays.0',

        '.shift': {
          left: -widgetSize,
        },
      },
    }}>
    <Flex
      alignItems='center'
      justifyContent='space-between'
      height={widgetSize}
      width={activeWidgetWidth + widgetSize}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        transition: 'left 0.1s ease',
      }}
      className='shift'>
      <WidgetIcon glyph='chat' />
      <Flex flex={1} alignItems='center' justifyContent='space-between'>
        <WidgetIcon glyph='discord' />
        <Text flex={`0 0 ${activeWidgetWidth - widgetSize}px`} lineHeight={1} fontSize={'sm'} pr={'base'}>
          {props.children}
        </Text>
      </Flex>
    </Flex>
  </Link>
)

const WidgetIcon = ({ glyph }: Pick<IconProps, 'glyph'>) => (
  <Flex alignItems='center' justifyContent='center' width={widgetSize} height={widgetSize} flex={`0 0 ${widgetSize}px`}>
    <Icon glyph={glyph} fontSize={24} />
  </Flex>
)

interface DiscordWidgetProps {
  url: string
}
