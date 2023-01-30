import React, { useState } from 'react'
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'



const useConfirm = () => {
  const [ open, setOpen ] = useState(false);
  const [ resolver, setResolver ] = useState({ resolver: null })
  const [ label, setLabel ] = useState('')
  
  const createPromise = () => {
    let resolver;
    return [ new Promise(( resolve, reject ) => {

        resolver = resolve
    }), resolver]
}
  const getConfirmation = async (text) => {
        setLabel(text);
        setOpen(true);
        const [ promise, resolve ] = await createPromise()
        setResolver({ resolve })
        return promise;
  }

  const onClick = async(status) => {
        setOpen(false);
        resolver.resolve(status)
  }

  const Confirmation = () => (
      <Dialog open={open}>
          <DialogContent>
              {label}
          </DialogContent>
          <DialogActions>
              <Button onClick={ () => onClick(false)}> Cancel </Button>
              <Button onClick={ () => onClick(true)}> OK </Button>
          </DialogActions>
      </Dialog>
  )

    return [ getConfirmation, Confirmation ]
    
}

export default useConfirm;