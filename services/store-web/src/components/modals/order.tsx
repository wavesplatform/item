import React, { FormEvent, useContext, useState } from 'react'
import { Button, Icon, Modal, ModalProps, TextInput, TextInputWithUnit, Toast, toSatoshi } from '@item/ui'
import { IItem } from '@item/types'
import { KeeperContext } from '../../contexts/keeper'
import { BigNumber } from '@waves/bignumber'
import { generateExchangeLink } from '../../helpers/order'
import { Box, Flex, Heading, Link } from 'rebass'
import { buy, sell } from '@item/contracts-store'
import config from '../../config'

export type OrderType = 'buy' | 'sell'

export interface OrderModalProps extends ModalProps {
  item: IItem
  type: OrderType
  defaultPrice?: string
  lotId?: string
}

const modalRoot = document.getElementById('root')
export const OrderModal = ({ item, type, defaultPrice, lotId, ...rest }: OrderModalProps) => {
  const [amount, setAmount] = useState('1')
  const [price, setPrice] = useState(defaultPrice || '0.001')

  const { publicState, api: keeperApi } = useContext(KeeperContext)
  const account = publicState.account
  const isBuy = type === 'buy'

  const haveBalanceGtZero = account && (new BigNumber(account.balance.available)).gt(0)
  const exchangeLink = account && generateExchangeLink(account.address, '10')
  const isNft = !!item.quantity && (new BigNumber(item.quantity)).eq(1)

  const confirm = async () => {
    const { network } = publicState
    if (!keeperApi || !network) return
    const amountBn = new BigNumber(amount).toNumber()
    const priceInSatoshiBn = toSatoshi(price).toNumber()

    if (isBuy) {
      // Buying
      if (!lotId) return
      const request = buy(lotId, amountBn)
      await request.broadcast()
    } else {
      // Selling
      const request = sell(item.txId, amountBn, config.wavesAssetId, priceInSatoshiBn)
      await request.broadcast()
    }
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    const { onClose } = rest

    confirm()
    onClose && onClose()
  }

  return (
    <Modal
      container={modalRoot}
      {...rest}
    >
      {!haveBalanceGtZero ? (
        <>
          <Toast mb={'lg'}>
            Incorrect balance.<br/>
            You can get Waves via external service.
          </Toast>
          <Button
            as={Link}
            href={exchangeLink}
            target={'_blank'}
            variant='primary'
            size={'lg'}
            width={1}
          >
            Get Waves
            <Icon variant={'baseline'} glyph={'open_in_new'} ml={'xs'} color={'whites.4'}/>
          </Button>
        </>
      ) : (
        <>
          <Heading as={'h2'} sx={{ fontSize: 'h2' }} mb={'md'}>{item.name}</Heading>
          <Box as={'form'} onSubmit={ev => handleSubmit(ev)}>
            <Flex>
              <Box width={1 / 3}>
                <TextInput value={amount}
                           onChange={ev => setAmount(ev.target.value)}
                           disabled={isNft}
                >Amount</TextInput>
              </Box>
              <Box width={2 / 3} ml={'md'}>
                <TextInputWithUnit value={price}
                                   onChange={ev => setPrice(ev.target.value)}
                                   disabled={isBuy}
                >Price per item</TextInputWithUnit>
              </Box>
            </Flex>
            <Box sx={{
              borderWidth: '1px 0 0',
              borderStyle: 'solid',
              borderColor: 'grays.7',
              pt: 'lg',
              mt: 'lg',
            }}>
              <Button type='submit'
                      variant={'primary'}
                      size={'lg'}
                      width={1}>
                {isBuy ? 'Buy' : 'Sell'}
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Modal>
  )
}