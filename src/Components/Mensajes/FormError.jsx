import { FormControl, FormHelperText } from '@mui/material'
import React from 'react'

const FormError = ({error}) => {
  return (
    <FormControl error={error} >
        {error && 
          <FormHelperText sx={{ fontSize:'14px'}}>
           {error.message}</FormHelperText>
          }
    </FormControl>
  )
}

export default FormError