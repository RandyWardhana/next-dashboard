import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import { DataGrid } from '@mui/x-data-grid';

import { Meta } from '../components/Meta';
import CustomModal from '../components/CustomModal';
import Layout from '../components/Layout';

import { deleteUserAction, getUserAction } from '../redux/actions/userAction';

import { DRAWER_WIDTH, FAILED, SUCCESS } from '../utils/cons';

function ListUser() {
  const router = useRouter()
  const dispatch = useDispatch()

  const dispatchGetUser = (params) => dispatch(getUserAction(params))
  const dispatchDeleteUser = (id) => dispatch(deleteUserAction(id))

  const listUser = useSelector((state) => state.user.list)
  const removeUser = useSelector((state) => state.user.removed)

  const [showModal, setShowModal] = useState(false)
  const [userId, setUserId] = useState(null)

  const [fetching, setFetching] = useState(false)
  const [fetchingDelete, setFetchingDelete] = useState(false)

  const [pages, setPages] = useState(1)
  const [data, setData] = useState([])

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    if (fetching) {
      const { status, payload } = listUser

      if (status === SUCCESS) {
        handleSuccessFetchUser(payload)
      } else if (status === FAILED) {
        handleFailedFetchUser()
      }
    }
  }, [listUser])

  useEffect(() => {
    if (fetchingDelete) {
      const { status, payload } = removeUser

      if (status === SUCCESS) {
        setFetchingDelete(false)
        setShowModal(false)
        fetchUser(pages)
      } else if (status === FAILED) {
        setFetchingDelete(false)
        setShowModal(false)
      }
    }
  }, [removeUser])

  const fetchUser = (page = 1) => {
    const params = {
      page
    }

    setFetching(true)
    setPages(page)
    dispatchGetUser(params)
  }

  const onDeleteUser = () => {
    setFetchingDelete(true)
    dispatchDeleteUser(userId)
  }

  const handleSuccessFetchUser = (payload) => {
    setFetching(false)
    setData(pages > 1 ? [...data, ...payload?.data] : payload?.data)
  }

  const handleFailedFetchUser = () => {
    setFetching(false)
    setData([])
  }

  const handlePageChange = (page) => {
    fetchUser(page + 1)
  }

  const onDelete = (params) => {
    setUserId(params.id)
    toggleModal()
  }

  const toggleModal = () => setShowModal(!showModal)

  const goToDetailUser = (id) => {
    router.push(`/user/${id}`)
  }

  const goToUpdateUser = (id) => {
    router.push(`/user/update/${id}`)
  }

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'email', headerName: 'Email', width: 240 },
    { field: 'first_name', headerName: 'First name', width: 200 },
    { field: 'last_name', headerName: 'Last name', width: 200 },
    {
      field: 'fullName',
      headerName: 'Full name',
      sortable: false,
      width: 200,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'first_name') || ''} ${params.getValue(params.id, 'last_name') || ''
        }`,
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 320,
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <Button onClick={() => goToDetailUser(params.id)} variant="outlined">Detail</Button>
          <Button onClick={() => goToUpdateUser(params.id)} variant="outlined" color='success'>Update</Button>
          <Button onClick={() => onDelete(params)} variant="outlined" color="error">Delete</Button>
        </Stack>
      )
    },
  ];

  return (
    <Layout title="List User">
      <Meta
        title="List User"
        description="List User"
      />
      <CustomModal
        showModal={showModal}
        title={"Delete User"}
        description={"Are you sure want to delete this user?"}
        onSubmit={onDeleteUser}
        onCancel={() => {
          setUserId(null)
          toggleModal()
        }}
      />
      <div style={{ margin: '16px 0' }}>
        <Button variant="contained" onClick={() => router.push('/user/create')}>
          Create User
        </Button>
      </div>
      <div style={{ height: 450, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
          onPageChange={handlePageChange}
          rowCount={listUser?.payload?.total || 0}
          disableSelectionOnClick
        />
      </div>
    </Layout>
  );
}

export default ListUser;
