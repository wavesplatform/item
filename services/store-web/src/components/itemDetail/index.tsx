import React, { useState } from 'react'
import { ImageWrapper, Overview, StyledParamKey, ParamValue } from './style'
import { Box, BoxProps, Flex, FlexProps, Heading, HeadingProps, Image, Link, Text } from 'rebass'
import { recordToArray } from '@item/utils'
import { Button, DappHeading, IconButton, Quantity, IconButtonProps, defaultImage } from '@item/ui'
import useCurrentUser from '../../hooks/currentUser'
import { useHistory, useLocation } from 'react-router'
import { ItemQuery_item } from '../../graphql/queries/__generated__/ItemQuery'
import { IDapp, IItem } from '@item/types'
import { OrderModal } from '../modals/order'

type TProps = {
  item: ItemQuery_item
  onClose?: () => void
  isPage?: boolean
}

type TState = {
  buyModalShow?: boolean
  sellModalShow?: boolean
}

export const ItemDetail = ({ item, isPage, onClose }: TProps) => {
  const [buyModalActive, setBuyModalActive] = useState(false)
  const [sellModalActive, setSellModalActive] = useState(false)
  const { me } = useCurrentUser()
  const history = useHistory()
  const location = useLocation()
  const { params, dapp } = item

  // Copy of misc
  const misc = { ...params.misc }
  // Description
  const description = misc['description'] || misc['Description']
  delete misc['description']
  delete misc['Description']

  const imageUrl = params.storageImageUrl || defaultImage

  const authGuard = (next: () => void) => {
    // Redirect if not auth
    if (!me) {
      history.push('/signin', { from: location.pathname })
    } else {
      next()
    }
  }

  return (
    <Flex sx={{ position: 'relative', flexDirection: isPage ? 'row-reverse' : 'row' }}>
      {/*Left Side*/}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Flex alignItems={'start'} mb={'lg'} justifyContent={'space-between'}>
          <Heading
            mb={0}
            flex={1}
            as={isPage ? 'h1' : 'h2'}
          >
            {item.name}
          </Heading>
          {!isPage && <Flex ml={'base'} mt={'2px'}>
            <Link href={`/item/${item.txId}`} target='_blank'>
              <DisplayButton glyph={'tab_unselected'}/>
            </Link>
            {onClose && <DisplayButton glyph={'call_received'} ml={'xs'} onClick={onClose}/>}
          </Flex>}
        </Flex>
        <Box mb={'lg'}>
          <DappHeading dapp={dapp as IDapp} size={'sm'}/>
        </Box>
        {description && <Text color={'grays.2'} mb={'lg'}>{description}</Text>}
        <ParamList width={1} mb={'lg'}>
          {item.quantity && <Param>
            <ParamKey>Quantity</ParamKey>
            <ParamValue>
              <Quantity value={item.quantity}/>
            </ParamValue>
          </Param>}
          {miscParams(misc)}
        </ParamList>
        <Flex justifyContent={'space-between'} flexDirection={'column'}>
          <Button
            onClick={() => authGuard(() => setBuyModalActive(true))}
            variant='primary'
            mb={'md'}
          >
            Buy
          </Button>
          <Button
            variant={'secondary'}
            onClick={() => authGuard(() => setSellModalActive(true))}
          >
            Sell
          </Button>
          <OrderModal
            item={item as IItem}
            type={'buy'}
            lotId={'LOTID'}
            isOpen={buyModalActive}
            onClose={() => setBuyModalActive(false)}
          />
          <OrderModal
            item={item as IItem}
            type={'sell'}
            isOpen={sellModalActive}
            onClose={() => setSellModalActive(false)}
          />
        </Flex>
        <Box mt={'base'}>
        </Box>
      </Box>
      {/*Right Side*/}
      <Box sx={{ flexBasis: '50%', mr: isPage ? 'lg' : 0, ml: isPage ? 0 : 'lg' }}>
        <Overview>
          <ImageWrapper>
            <Image
              src={imageUrl}
              alt={`Item #${item.id}`}/>
          </ImageWrapper>
        </Overview>
      </Box>
    </Flex>
  )
}

const miscParams = (miscRecord: Record<string, any>) => {
  const misc = recordToArray(miscRecord)

  const list = misc.map((miscPair, index) => (
    <Param key={index}>
      <ParamKey>{miscPair.key}</ParamKey>
      <ParamValue>{miscPair.value}</ParamValue>
    </Param>
  ))

  return list
}

const DisplayButton = (props: IconButtonProps) =>
  <IconButton
    {...props}
    sx={{
      width: '24px',
      height: '24px',
      opacity: .4,
      bg: 'transparent',
      fontSize: 'lg',
      '&:hover, &:focus': {
        bg: 'transparent',
        opacity: 1,
      },
    }}
  />

const ParamList = (props: BoxProps) =>
  <Box
    as={'ul'}
    {...props}
    sx={{
      p: 0,
    }}
  />

const Param = (props: FlexProps) =>
  <Flex
    as={'li'}
    {...props}
    sx={{
      py: 'sm',
      px: 0,
      borderColor: 'grays.7',
      borderStyle: 'solid',
      borderWidth: '1px 0',
      alignItems: 'flex-start',
      mt: '-1px',
      justifyContent: 'space-between',
      '&:first-of-type': {
        mt: 0,
      },
    }}
  />

const ParamKey = (props: HeadingProps) =>
  <StyledParamKey
    {...props}
    sx={{
      mr: 'sm',
      fontSize: 'body',
      fontWeight: 'body',
      color: 'grays.4',
    }}
  />

export default ItemDetail
