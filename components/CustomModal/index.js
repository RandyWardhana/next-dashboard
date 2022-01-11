import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: 4,
  p: 4,
}

function CustomModal(props) {
  const { showModal, title, description, onSubmit, onCancel } = props

  return (
    <Modal
      open={showModal}
      onClose={onCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          sx={{
            mt: 3
          }}
        >
          <Button onClick={onSubmit} variant="outlined">Submit</Button>
          <Button onClick={onCancel} variant="outlined" color="error">Cancel</Button>
        </Stack>
      </Box>
    </Modal>
  )
}

CustomModal.propTypes = {
  showModal: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
}

CustomModal.defaultProps = {
  showModal: false,
  title: '',
  description: '',
  submitText: '',
  cancelText: '',
  onSubmit: () => { },
  onCancel: () => { },
}

export default CustomModal
