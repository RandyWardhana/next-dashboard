import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { Meta } from '../../../components/Meta'
import Layout from '../../../components/Layout'

import { getDetailUserAction, updateUserAction } from '../../../redux/actions/userAction'
import { FAILED, SUCCESS } from '../../../utils/cons'

function Update() {
  const router = useRouter()
  const dispatch = useDispatch()

  const dispatchGetDetailUser = (id) => dispatch(getDetailUserAction(id))
  const dispatchUpdateUser = (id, body) => dispatch(updateUserAction(id, body))

  const detailUser = useSelector((state) => state.user.detail)
  const updateUser = useSelector((state) => state.user.update)

  const [fetching, setFetching] = useState(false)
  const [fetchingUpdate, setFetchingUpdate] = useState(false)
  const [form, setForm] = useState({})

  const id = router?.query?.id

  useEffect(() => {
    if (router?.isReady) {
      fetchDetailUser()
    }
  }, [router])

  useEffect(() => {
    if (fetching) {
      const { status, payload } = detailUser

      if (status === SUCCESS) {
        handleSuccessFetchDetailUser(payload)
      } else if (status === FAILED) {
        setFetching(false)
      }
    }
  }, [detailUser])

  useEffect(() => {
    if (fetchingUpdate) {
      const { status, payload } = updateUser

      if (status === SUCCESS) {
        handleSuccessUpdateUser(payload)
      } else if (status === FAILED) {
        setFetching(false)
      }
    }
  }, [updateUser])

  const fetchDetailUser = () => {
    setFetching(true)
    dispatchGetDetailUser(id)
  }

  const handleSuccessFetchDetailUser = (payload) => {
    const { first_name, last_name } = payload?.data

    const body = {
      name: first_name + ' ' + last_name,
      job: ''
    }
    setFetching(false)
    setForm(body)
  }

  const handleSuccessUpdateUser = () => {
    setFetching(false)
    router.push('/')
  }

  const onChange = (key, value) => {
    setForm({
      ...form,
      [key]: value
    })
  }

  const onSubmit = () => {
    const body = {
      name: form.name,
      job: form.job
    }
    setFetchingUpdate(true)
    dispatchUpdateUser(id, body)
  }

  if (!router?.isReady) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return (
    <Layout title={`Update User  ${id}`}>
      <Meta
        title={`Update User  ${id}`}
        description={`Update User  ${id}`}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={fetching || fetchingUpdate}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" mb={1}>Name</Typography>
          <TextField
            fullWidth
            label=""
            value={form?.name}
            onChangeCapture={({ target }) => onChange('name', target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" mb={1}>Job</Typography>
          <TextField
            fullWidth
            label=""
            value={form?.job}
            onChangeCapture={({ target }) => onChange('job', target.value)}
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

export default Update