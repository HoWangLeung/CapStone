import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import EditForm from './EditForm'
import axios from 'axios'
const EditModal = props => {
  const { className } = props

  const [modal, setModal] = useState(false)
  const [state, setState] = useState({
    Temperature: 'Hot',
    Size: 'Large',
    Milk: 'Whole Milk',
    special_instruction: ''
  })

  const toggle = () => setModal(!modal)

  const handleSubmit = e => {
    e.preventDefault()


    console.log(state)
    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    return axios
      .get(
        `${process.env.REACT_APP_API_SERVER}/api/orderedItem`,

        config
      )
      .then(data => {
        let index = props.index
        console.log(data.data)
        let orderedItemID = data.data[index].orderItemID
        console.log(orderedItemID)
console.log(state);

        return axios.put(
          `${process.env.REACT_APP_API_SERVER}/api/orderedItem/${orderedItemID}`,
          {
            product_temperature: state.Temperature,
            product_size: state.Size,
            product_milk: state.Milk,
            special_instruction:state.special_instruction
          },
          config
        )
        .then((data)=>{
            toggle()
            window.location.reload(true);
        })
      })
  }

  const handleChange = name => e => {
    console.log(e.target.id)

    console.log('recived')
    let value = e.target.value.toString()
    console.log([name], value)
    setState(state => ({
      ...state,
      [name]: value
    }))
  }

  return (
    <div>
      <EditOutlinedIcon onClick={toggle} className='icon' align='left' />{' '}
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Want to change?</ModalHeader>
        <ModalBody>
          <EditForm handleChange={handleChange} />
        </ModalBody>
        <ModalFooter>
          <Button type='submit' color='primary' onClick={handleSubmit}>
            Confirm
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default EditModal
