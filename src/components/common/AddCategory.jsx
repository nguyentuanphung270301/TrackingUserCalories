import { Box, Button, colors, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import categoryApi from '../../api/modules/category.api';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';


const AddCategory = ({ onClose }) => {

  const [id, setId] = useState(0)

  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  const form = useFormik({
    initialValues: {
      name: '',
      id: 0,
    }
  })

  const onSave = async (form) => {
    form.values.name = name
    form.values.id = id
    console.log(form.values)
    console.log(image.name)
    const { response, err } = await categoryApi.createCategory(image, form.values)
    if (response) toast.success('Add category successfully')
    if (err) toast.error("Information is missing or invalid")

  }

  function handleFileUpload(e) {
    setImage(e.target.files[0])
  }

  useEffect(() => {
    const getCategory = async () => {
      const { response, err } = await categoryApi.listCategories()
      if (response) {
        console.log(response.length)
        setId(response.length + 1)
        console.log(response)
      }
      if (err) console.log(err)
    }
    getCategory()
  }, [id])


  return (

    <Box
      sx={{
        position: 'absolute',
        width: '500px',
        height: '300px',
        backgroundColor: '#f8f8f8',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)'
      }}
    ><Box display='flex'
      flexDirection='row'
      justifyContent='end'
    >
        <Button
          sx={{
            color: 'red',
            marginBottom: '20px'
          }}
          onClick={onClose}
        >
          <CloseOutlinedIcon />
        </Button>
      </Box>
      <TextField
        type='text'
        label='Name'
        color='success'
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          console.log(name)
        }}
        sx={{
          marginBottom: '20px',
          width: '400px'
        }}
        error={name.length === 0}
        helperText={name.length === 0 && 'Name cannot be empty'}
      />
      <TextField
        type='file'
        onChange={handleFileUpload}
        sx={{
          marginBottom: '20px',
          width: '400px'
        }} />
      <Box>
        <Button variant='contained' sx={{
          backgroundColor: '#2daf1b',
          width: '400px',
          ":hover": {
            backgroundColor: '#2daf1b',
            opacity: '0.8'
          }
        }}
          onClick={() => onSave(form)}
        >Save</Button>
      </Box>
    </Box>

  )
}

export default AddCategory