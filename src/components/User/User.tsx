import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../../utils/LocalStorageUtils';


const User: React.FC = () => {
  const [userData, setUserData] = useState<{ email: string; password: string }[]>([]);

  // useEffect(() => {
  //   const storedData = localStorage.getItem('loginData');
  //   const existingData = storedData ? JSON.parse(storedData) : [];
  //   setUserData(existingData);
  // }, []);

  useEffect(() => {
    const existingData = getDataFromLocalStorage('loginData');
    setUserData(existingData);
  }, []);

  // const handleDeleteUser = (index: number) => {
  //   const updatedData = [...userData];
  //   updatedData.splice(index, 1); 
  //   setUserData(updatedData); 
  //   localStorage.setItem('loginData', JSON.stringify(updatedData)); 
  // };
  
  
  const handleDeleteUser = (index: number) => {
    const updatedData = [...userData];
    updatedData.splice(index, 1);
    setUserData(updatedData);
    setDataToLocalStorage('loginData', updatedData);
  };

  
  
  
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" mt={30} style={{marginBottom:"35px", color:" darkcyan",textShadow:"2px 7px 3px black",fontSize:"40px", fontFamily:"fantasy"}}>
        Users
      </Typography>
      {userData.length > 0 ? (
        <TableContainer component={Paper} style={{ border: "1px solid black", boxShadow:"0px 6px 10px #0f636f",textAlign:"center"}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{fontSize:"21px", color:"blue", fontFamily:"monospace"}}>Email</TableCell>
                <TableCell style={{fontSize:"21px", color:"blue", fontFamily:"monospace"}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((user, index) => (
                <TableRow key={index}>
                  <TableCell style={{color:"red"}}>{user.email}</TableCell>
                  <TableCell>
                  <DeleteIcon
                      onClick={() => handleDeleteUser(index)}
                      style={{ color: 'red' }}
                    />

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">User data not found.</Typography>
      )}
      
    </Container>
  );
};

export default User;
