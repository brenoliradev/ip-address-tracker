import React, { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from 'yup'

import CustomMap from '../customMap/customMap';
import CallAPI from '../callAPI/callAPI';

import './searchIP.scss'

const SimpleSchema = Yup.object().shape({
  optionalIP: Yup.string()
  .required("Required*")
  .matches(/(^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$)/, "Invalid IP Address."),
})

const SearchIP = () => {
    const [firstLoad, setLoad] = useState(false);
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');

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
                            style={{
                                outline: 'none',
                                color: '#f2f2f2',
                                height: '55px',
                                width: '50vw'
                            }}
                            autoComplete='off'
                        />
                        <Button 
                            variant="outlined"
                            type="submit"
                            style={{
                                backgroundColor: '#f2f2f2',
                                outline: 'none',
                                height: '48px',
                                width: '3vw',
                                borderRadius: '0',
                                border: 'none'
                            }}
                        >
                            <SearchIcon
                                fontSize='large'
                                style={{
                                    color: '#020202'
                                }}                                    
                            />
                        </Button>
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
                        style={{
                            outline: 'none',
                            color: '#f2f2f2',
                            height: '55px',
                            width: '50vw'
                        }}
                        autoComplete='off'
                    />
                    <Button 
                        variant="outlined"
                        type="submit"
                        style={{
                            backgroundColor: '#f2f2f2',
                            outline: 'none',
                            height: '48px',
                            width: '3vw',
                            borderRadius: '0',
                            border: 'none'
                        }}
                    >
                        <SearchIcon
                            fontSize='large'
                            style={{
                                color: '#020202'
                            }}                                    
                        />
                    </Button>
                </form>
            </div>
        )
    }
}

export default SearchIP;