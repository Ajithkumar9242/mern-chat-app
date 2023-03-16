import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const ProfileModel = ({user, children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
        <span onClick={onOpen}>
        {children}

        </span>
    
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={user.pic} boxSize="150px" borderRadius="full"/>
            <Text textAlign={"center"}>Email: {user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ProfileModel