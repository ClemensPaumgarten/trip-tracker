'use strict';

import {
  default as React,
  Component
} from 'react';

import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap';

// Field group for forms. Copied from React-Bootstrap
export default function FieldGroup({id, label, help, ...props}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props}/>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
