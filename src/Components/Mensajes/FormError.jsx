import { FormControl, FormHelperText } from '@mui/material'
import React from 'react'

const FormError = ({error}) => {
  return (
    <FormControl error={error} >
        {error && 
          <FormHelperText sx={{ fontSize:'14px'}}>
            <span >Oops!</span> {error.message}</FormHelperText>
          }
    </FormControl>
  )
}

export default FormError