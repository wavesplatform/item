import React, { FormEvent, useState, ChangeEvent, Dispatch } from 'react'
import { IDapp } from '@item-protocol/types'
import { Modal, ModalProps, TextInput, Button, TextArea } from '@item-protocol/ui'
import { Box, Flex } from 'rebass'
import { useMutation } from '@apollo/react-hooks'
import { updateDappInfoMutation } from '../../../graphql/mutations/updateDappInfo'
import { UpdateDappInfo, UpdateDappInfoVariables } from '../../../graphql/mutations/__generated__/UpdateDappInfo'
import { EditableCover } from './EditableCover'

const modalRoot = document.getElementById('root')

export const EditDappModal = ({ dapp, ...modalProps }: EditDappModalProps) => {
  const [updateDapp, { loading }] = useMutation<UpdateDappInfo, UpdateDappInfoVariables>(updateDappInfoMutation)

  const [iconFile, setIconFile] = useState<File>()
  const [pageFile, setPageFile] = useState<File>()

  const [pageUrl, setPageUrl] = useState(dapp.image && dapp.image.page)
  const [iconUrl, setIconUrl] = useState(dapp.image && dapp.image.icon)

  const [draftName, setDraftName] = useState(dapp.name)
  const [draftUrl, setDraftUrl] = useState(dapp.meta && dapp.meta.url)
  const [draftDescription, setDraftDescription] = useState(dapp.meta && dapp.meta.description)

  const handleTextChange = (updater: Dispatch<string>) => (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value
    updater(inputValue)
  }

  const handleImageChange = (fileUpdater: Dispatch<File>, urlUpdater: Dispatch<string>) => (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.currentTarget.files && e.currentTarget.files[0]
    if (!file) return

    fileUpdater(file)

    const fr = new FileReader()

    fr.readAsDataURL(file)
    fr.onloadend = () => urlUpdater(fr.result as string)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await updateDapp({
      variables: {
        input: {
          name: draftName,
          url: draftUrl,
          description: draftDescription,
          iconFile,
          pageFile,
        },
      },
    })
  }

  return (
    <Modal container={modalRoot} {...modalProps}>
      <Box as='form' name='edit-dapp' onSubmit={handleSubmit}>
        <EditableCover
          pageSRC={pageUrl}
          onPageChange={handleImageChange(setPageFile, setPageUrl)}
          iconSRC={iconUrl}
          onIconChange={handleImageChange(setIconFile, setIconUrl)}
        />
        <TextInput mb='sm' value={draftName} onChange={handleTextChange(setDraftName)} placeholder={'The game name'}>
          Name
        </TextInput>
        <TextInput
          mb='sm'
          value={draftUrl}
          onChange={handleTextChange(setDraftUrl)}
          placeholder={'External URL of your game'}>
          Game URL
        </TextInput>
        <TextArea
          sx={{
            resize: 'vertical',
          }}
          value={draftDescription}
          onChange={handleTextChange(setDraftDescription)}
          placeholder={'The description of your game'}
          rows={3}>
          Description
        </TextArea>
        <Flex
          pt='lg'
          mt='lg'
          sx={{
            borderTop: '1px solid',
            borderColor: 'grays.7',
          }}>
          <Button
            htmlFor='edit-dapp'
            type='submit'
            variant={'primary'}
            width={1}
            size={'lg'}
            isLoading={loading}
            disabled={loading}>
            {loading ? 'Loading...' : 'Save'}
          </Button>
        </Flex>
      </Box>
    </Modal>
  )
}

interface EditDappModalProps extends ModalProps {
  dapp: IDapp
}
