import React from 'react'
import { ILot } from '@item/types'
import { Button, getImageSrc, Price, Table, TBody, Td as BaseTd, THead, toWaves, Tr, Badge, Truncate } from '@item/ui'
import { Box, BoxProps, Flex, Heading, Link, Image, FlexProps } from 'rebass'
import config from '../../../config'
import { cancel } from '@item/contracts-store'

type LotTableProps = {
  lots: ILot[]
}

const imageSize = '24px'
const colWidths = [1, 1 / 6]

export const LotTable = ({ lots, ...rest }: LotTableProps & BoxProps) => {
  return (
    <Table width={1} {...rest}>
      <THead>
        <Tr>
          <Td>Item</Td>
          <Td>LotId</Td>
          <Td>Total</Td>
          <Td>Left</Td>
          <Td>Price</Td>
        </Tr>
      </THead>
      <TBody>
        {lots.map((lot: ILot, index) => <LotRow lot={lot} key={index}/>)}
      </TBody>
    </Table>
  )
}

type LotRowProps = {
  lot: ILot
}

export const LotRow = ({ lot }: LotRowProps) => {
  const { item, txId, total, left, price, cancelled } = lot

  const onCancel = async () => {
    // TODO: need a more informative process
    const request = cancel(txId)
    await request.broadcast()
  }

  return (
    <Tr>
      <Td>
        {item && <Flex alignItems={'center'}>
          <Box sx={{ width: imageSize }} mr={'sm'}>
            <Image
              src={getImageSrc(item)}
              sx={{
                display: 'block',
                maxWidth: imageSize,
                maxHeight: imageSize,
                mx: 'auto',
              }}
            />
          </Box>
          <Heading as={'h3'} sx={{
            fontSize: 'h3',
            fontWeight: 'body',
          }}>{item.params.name}</Heading>
        </Flex>}
      </Td>
      <Td>
        <Truncate as={Link} href={`${config.explorerUrl}tx/${txId}`} target='_blank'>
          {txId}
        </Truncate>
      </Td>
      <Td>{total}</Td>
      <Td>{left}</Td>
      <Td>
        <Price value={toWaves(price).toFixed(8)}/>
      </Td>
      <Td>
        {cancelled
          ? <Badge fontSize={'xs'} sx={{ textTransform: 'uppercase' }}>Cancelled</Badge>
          : <Button variant={'secondary'} size={'sm'} onClick={onCancel}>Cancel</Button>}
      </Td>
    </Tr>
  )
}

const Td = (props: FlexProps) =>
  <BaseTd
    {...props}
    width={colWidths}
    sx={{
      p: 'md',
    }}
  />

export default LotTable