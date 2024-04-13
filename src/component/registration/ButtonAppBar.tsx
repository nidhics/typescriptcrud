import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/reducers/rootReducer';
import { Tab, Tabs } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { UserObj } from './redux/reducers/userReducer';

export default function ButtonAppBar() {
    const navigate = useNavigate()
    const select = useSelector((state: RootState) => state.userReducer)
    const [tabValue, setTabValue] = useState<number>(0)
    const [data, setData] = useState<UserObj>()

    useEffect(() => {
        setData(select.user)
    }, [select])

    const handleSignIn = () => {
        navigate('signin')
    }
    const handleSignUp = () => {
        navigate('signup')
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <AdbIcon sx={{ mr: 1 }} />

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ProjMgmt
                    </Typography>
                    <Tabs
                        // sx={{ marginLeft: 'auto' }}
                        textColor="inherit"
                        value={tabValue}
                        indicatorColor='secondary'
                        onChange={(e, value) => setTabValue(value)}>
                        <Tab onClick={() => navigate('/')} label="Home" />
                        {(data?.role == "Admin" || data?.role == "Project Manager" || data?.role == "Team Lead" || data?.role == "Software Engineer") &&
                            <Tab onClick={() => navigate('dashboard')} label="Dashboard" />}
                        {(data?.role == "Admin") &&
                            <Tab onClick={() => navigate('userinfo')} label="User Info" />}
                        {(data?.role == "Admin" || data?.role == "Project Manager") &&
                            <Tab onClick={() => navigate('projectinfo')} label="Project Info" />}
                        {(data?.role == "Admin" || data?.role == "Team Lead") &&
                            <Tab onClick={() => navigate('taskinfo')} label="Task Info" />}
                        {(data?.role == "Admin" || data?.role == "Project Manager") &&
                            <Tab label="Create Team" />}
                        {data?.role == "Software Engineer" &&
                            <Tab label="Assigned Task" />}
                    </Tabs>

                    {data?.user && <h3>Welcome, {data.user.toUpperCase()}</h3>}

                    <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}>
                        {
                            !select.user.user &&
                            <div>
                                <Button
                                    color="inherit"
                                    onClick={handleSignIn}
                                > Sign In
                                </Button>
                                <Button
                                    variant='contained'
                                    color='error'
                                    onClick={handleSignUp}
                                >Sign Up </Button>
                            </div>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}