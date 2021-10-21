import React, { useState } from 'react';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Button, TextField } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from 'yup'

// Material UI used for Dialog => Settings 
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';

// Files from my project
import CustomMap from '../customMap/customMap';
import CallAPI from '../callAPI/callAPI';
import './searchIP.scss'

const SimpleSchema = Yup.object().shape({
    optionalIP: Yup.string()
    .required("Required*")
    .matches(/(^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$)/, "Invalid IP Address."),
})

const buttonStyle = {
    backgroundColor: '#fff',
    border: 'none',
    outline: 'none !important',
    paddingTop: '0'
}

const textFieldStyle = {
    outline: 'none',
    color: '#f2f2f2',
    height: '55px',
    width: '50vw'
}

const SearchIP = () => {
    const [firstLoad, setLoad] = useState(false);
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [open, setOpen] = useState(false);
    const [method, setMethod] = useState('');
    
    const Call = (optionalIP) => {
        CallAPI(optionalIP).then(response => {
            setLat(response.location.lat);
            setLong(response.location.lng);
        })
    }   
  
    if (firstLoad === false) {
        window.onload = Call();
        setLoad(true);
    }

    const formik = useFormik({
        initialValues: {
            optionalIP: '',
        },
        validationSchema: SimpleSchema,
        onSubmit: (values) => {
            Call(values.optionalIP);

            values.optionalIP = "";
        }
    })

  
    const handleChange = (event) => {
      setMethod(event.target.value);
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    if (lat !== long) {
        return (
            <div className="size-controler">
                <div className='main-wrapper'>
                    <div className='icon-div'>
                        <a href="https://github.com/lirbre" target="_blank" rel="noreferrer">
                            <img src="https://www.atelliarte.com.br/wp-content/uploads/2021/06/854878.png"
                                alt="A map logo"
                                className="title-img"
                            />
                        </a>
                    </div>
                    <form 
                        onSubmit={formik.handleSubmit}
                        validationSchema={SimpleSchema}
                    >
                        <TextField 
                            name="optionalIP"
                            variant="standard"
                            type="text"
                            value={formik.values.optionalIP}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.optionalIP && Boolean(formik.errors.optionalIP)}    
                            label={Boolean(formik.errors.optionalIP) ? formik.errors.optionalIP : "Input an IP Address..."}
                            style={textFieldStyle}
                            autoComplete='off'
                        />
                        <div className="button-div">
                            <IconButton 
                                type="submit"
                                style={buttonStyle}
                            >
                                <SearchSharpIcon
                                    style={{
                                        fontSize: '44px',
                                        color: '#020202'
                                    }}                                    
                                />
                            </IconButton>
                            <IconButton 
                                style={buttonStyle}
                                onClick={handleClickOpen}
                            >   
                                <SettingsSharpIcon
                                    style={{
                                        fontSize: '46px',
                                        color: '#020202'
                                    }}                                    
                                />
                            </IconButton>
                        </div>
                        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                            <DialogTitle>Settings</DialogTitle>
                            <DialogContent>
                                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <FormControl sx={{ m: 1, minWidth: 240 }}>
                                    <InputLabel htmlFor="demo-dialog-native">Search Method</InputLabel>
                                    <Select
                                        native
                                        value={method}
                                        defaultValue="ip"
                                        onChange={handleChange}
                                        input={
                                            <OutlinedInput 
                                                label="Search Method" 
                                                id="demo-dialog-native" 
                                            />
                                        }
                                    >
                                        <option value={'ip'}>Ip Address</option>
                                        <option value={'zip'}>Zip Code</option>
                                        <option value={'city'}>City</option>
                                    </Select>
                                    </FormControl>
                                </Box>
                                </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleClose}>Ok</Button>
                            </DialogActions>
                        </Dialog>
                    </form>
                </div>
                <CustomMap 
                    lat={lat}
                    long={long}
                />
            </div>
        );
    } else {
        return (
            <div className='main-wrapper'>
                <div className='icon-div'>
                    <a href="https://github.com/lirbre" target="_blank" rel="noreferrer">
                        <img src="https://www.atelliarte.com.br/wp-content/uploads/2021/06/854878.png"
                            alt="A map logo"
                            className="title-img"
                            />
                    </a>
                </div>
                <form 
                    onSubmit={formik.handleSubmit}
                    validationSchema={SimpleSchema}
                >
                    <TextField 
                        name="optionalIP"
                        variant="standard"
                        type="text"
                        value={formik.values.optionalIP}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.optionalIP && Boolean(formik.errors.optionalIP)}    
                        label={Boolean(formik.errors.optionalIP) ? formik.errors.optionalIP : "Input an IP Address..."}
                        style={textFieldStyle}
                        autoComplete='off'
                    />
                    <div className="button-div">
                        <IconButton 
                            type="submit"
                            style={buttonStyle}
                        >
                            <SearchSharpIcon
                                style={{
                                    fontSize: '46px',
                                    color: '#020202'
                                }}                                    
                            />
                        </IconButton>
                        <IconButton 
                            style={buttonStyle}
                            onClick={handleClickOpen}
                        >   
                            <SettingsSharpIcon
                                style={{
                                    fontSize: '46px',
                                    color: '#020202'
                                }}                                    
                            />
                        </IconButton>
                    </div>
                </form>
            </div>
        )
    }
}
export default SearchIP;