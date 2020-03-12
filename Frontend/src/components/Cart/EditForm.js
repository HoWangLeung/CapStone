import React from 'react'
import {   Form, FormGroup, Label, Input,  } from 'reactstrap'

const EditForm = props => {
  //   const handleChange = input => e => {
  //   console.log('handling editform');
  //     console.log(props);

  //     let value = e.target.value
  //     props.handleChange(input)

  //   }
  return (
    <Form>
      <FormGroup>
        <Label for='exampleSelect'>Temperature</Label>
        <Input
          type='select'
          name='Temperature'
          id='exampleSelect'
          onChange={props.handleChange('Temperature')}
          defaultValue={'Hot'}
        >
          <option>Hot</option>
          <option>Cold</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for='exampleSelect'>Size</Label>
        <Input
        
          type='select'
          name='Size'
          id='exampleSelect'
          onChange={props.handleChange('Size')}
          defaultValue={'Large'}
        >
          <option>Large</option>
          <option>Medium</option>
          <option>Small</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for='exampleSelect'>Milk</Label>
        <Input
          type='select'
          name='Milk'
          id='exampleSelect'
          onChange={props.handleChange('Milk')}
          defaultValue={'Whole Milk'}
        >
          <option>Whole Milk</option>
          <option>Skimmed Milk</option>
          <option>Soy Milk</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for='exampleText'>Special Instruction</Label>
        <Input
          placeholder='e.g. More Sugar'
          type='textarea'
          name='special_instruction'
          id='exampleText'
          onChange={props.handleChange('special_instruction')}
        />
      </FormGroup>
    </Form>
  )
}

export default EditForm
