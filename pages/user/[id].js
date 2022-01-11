import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { Meta } from '../../components/Meta'
import Layout from '../../components/Layout'

import { getDetailUserAction } from '../../redux/actions/userAction'
import { FAILED, SUCCESS } from '../../utils/cons'

function Detail() {
  const router = useRouter()
  const dispatch = useDispatch()

  const dispatchGetDetailUser = (id) => dispatch(getDetailUserAction(id))

  const detailUser = useSelector((state) => state.user.detail)

  const [fetching, setFetching] = useState(false)
  const [data, setData] = useState({})

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

  const fetchDetailUser = () => {
    setFetching(true)
    dispatchGetDetailUser(id)
  }
  
  const handleSuccessFetchDetailUser = (payload) => {
    setFetching(false)
    setData(payload?.data)
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
    <Layout title={`Detail User ${id}`}>
      <Meta
        title={`Detail User  ${id}`}
        description={`Detail User  ${id}`}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={fetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1" mb={1}>First Name</Typography>
          <TextField
            fullWidth
            label=""
            value={data?.first_name}
            disabled
            />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" mb={1}>Last Name</Typography>
          <TextField
            fullWidth
            label=""
            value={data?.last_name}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" mb={1}>Email</Typography>
          <TextField
            fullWidth
            label=""
            value={data?.email}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => router.back()}>
            Back
          </Button>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Detail