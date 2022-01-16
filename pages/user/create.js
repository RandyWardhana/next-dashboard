import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

import { Meta } from '../../components/Meta'
import Layout from '../../components/Layout'

import { createUserAction } from '../../redux/actions/userAction'
import { FAILED, SUCCESS } from '../../utils/cons'

function Create() {
  const router = useRouter()
  const dispatch = useDispatch()

  const dispatchCreateUser = (body) => dispatch(createUserAction(body))

  const createdUser = useSelector((state) => state.user.create)

  const [fetching, setFetching] = useState(false)
  const [form, setForm] = useState({
    name: '',
    job: ''
  })

  useEffect(() => {
    if (fetching) {
      const { status } = createdUser

      if (status === SUCCESS) {
        setFetching(false)
        router.push('/')
      } else if (status === FAILED) {
        setFetching(false)
      }
    }
  }, [createdUser])

  const onChange = (key, value) => {
    setForm({
      ...form,
      [key]: value
    })
  }

  const onSubmit = () => {
    setFetching(true)
    dispatchCreateUser(form)
  }

  return (
    <Layout title="Create User">
      <Meta
        title="Create User"
        description="Create User"
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={fetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={form.name}
            onChange={({ target }) => onChange('name', target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Job"
            variant="outlined"
            value={form.job}
            onChange={({ target }) => onChange('job', target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={onSubmit}>
              Submit
            </Button>
            <Button variant="outlined" onClick={() => router.back()}>
              Back
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Create