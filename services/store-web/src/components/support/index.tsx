import { Box, Card, Flex, Heading, Image, ImageProps, Link, LinkProps, Text } from 'rebass'
import config from '../../config'
import manualImage from './manual.svg'
import docsImage from './docs.svg'
import { Button, themeGet } from '@item-protocol/ui'
import React, { PropsWithChildren } from 'react'
import styled from '@emotion/styled/macro'

type TProps = {}

export const Support = (props: TProps) => (
  <Flex flexDirection={['column', 'row']}>
    <Box mr={['inherit', 'xl']}>
      <Heading sx={{ fontSize: 'h1', mb: 'lg' }}>Development</Heading>
      <Text mb={'xl'} color={'grays.3'}>
        If you have any questions, check out the documentation
        <br />
        or feel free to ask them in the developer chat.
      </Text>
      <Flex mb={'xl'}>
        <DocsItem mr={'lg'} href={`${config.docsUrl}/guides/how-to-use.html`} target='_blank'>
          Check out this manual
          <DocsImage src={manualImage} />
        </DocsItem>
        <DocsItem href={`${config.docsUrl}/guides/tokenizing-a-game.html`} target='_blank'>
          Read the documentation
          <DocsImage src={docsImage} />
        </DocsItem>
      </Flex>
      <Flex>
        <ExternalLink minWidth={1 / 2} href='https://t.me/waves_ride_dapps_dev' target='_blank'>
          <Button size={'lg'} variant={'secondary'} width={1}>
            Ask in developer chat
          </Button>
        </ExternalLink>
      </Flex>
    </Box>

    <Box mt={['xl', 0]}>
      <Heading sx={{ fontSize: 'h1', mb: 'lg' }}>Partnership</Heading>
      <Text mb={'xl'} color={'grays.3'}>
        Fill in the form and we will connect with you shortly.
      </Text>

      <ExternalLink href='https://airtable.com/shr8Z21VbnmoS8Q4c' target='_blank'>
        <Button variant={'primary'} size={'lg'} width={1}>
          Fill in the form
        </Button>
      </ExternalLink>
    </Box>
  </Flex>
)

export default Support

const DocsItem = (props: PropsWithChildren<LinkProps>) => (
  <ExternalLink color={'default'} {...props}>
    <DocsCard
      p={'xl'}
      pr={'100px'}
      sx={{
        borderRadius: 'md',
      }}>
      {props.children}
    </DocsCard>
  </ExternalLink>
)

const ExternalLink = styled(Link)`
  max-width: 256px;
`

const DocsCard = styled(Card)`
  background: ${themeGet('colors.grays.8')};
  position: relative;
  min-height: 100px;
  height: 100%;

  ${ExternalLink}:hover & {
    background: ${themeGet('colors.primary')};
  }
`

const DocsImage = (props: ImageProps) => (
  <Image
    sx={{
      bottom: 'xl',
      right: 'xl',
      position: 'absolute',
      opacity: 0.3,
    }}
    {...props}
  />
)
