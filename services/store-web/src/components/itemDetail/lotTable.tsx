import React from 'react'
import { ILot } from '@item/types'
import { Price, Table, TBody, Td, THead, toWaves, Tr, UserHeading } from '@item/ui'
import config from '../../config'
import { BoxProps, Link } from 'rebass'

type TProps = {
  lots: ILot[]
}

export const LotTable = ({ lots, ...rest }: TProps & BoxProps) => {
  return (
    <Table width={1} {...rest}>
      <THead>
        <Tr>
          <Td width={1 / 3}>Stock</Td>
          <Td width={1 / 3}>Price</Td>
          <Td width={1 / 3}>Seller</Td>
        </Tr>
      </THead>
      <TBody>
        {lots.map(({ left, price, priceAsset, seller }: ILot, index) => (
          <Tr key={index}>
            <Td width={1 / 3}>{left}</Td>
            <Td width={1 / 3}>
              <Price value={toWaves(price).toFixed(8)}/>
            </Td>
            <Td width={1 / 3}>
              {seller && <Link
                href={`${config.explorerUrl}address/${seller.address}`}
                target='_blank'
                sx={{
                  display: 'block',
                  opacity: .7,
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              >
                <UserHeading user={seller} size={'sm'} width={'160px'}/>
              </Link>}
            </Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  )
}

export default LotTable