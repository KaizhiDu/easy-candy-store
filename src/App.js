//https://6o0tlfjnq6.execute-api.us-west-2.amazonaws.com/dev/candy
import React, { useEffect, useState } from 'react';
import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";

const App = () => {

  const [candies, setCandies] = useState([]);
  const [newCandy, setNewCandy] = useState({
    name: '',
    price: '',
    number: ''
  });

  useEffect(() => {
    fetch('https://6o0tlfjnq6.execute-api.us-west-2.amazonaws.com/dev/candy')
      .then(res => res.json())
      .then(data => {
        setCandies(data);
      });
  }, [candies]);

  const handleChange = e => {
    setNewCandy({
      ...newCandy,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(newCandy);
    fetch('https://6o0tlfjnq6.execute-api.us-west-2.amazonaws.com/dev/candy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCandy)
    }).then(r => r.json()).then(data => {
      console.log(data);
    });
    e.target.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="candy name"
          name="name"
          onChange={handleChange}
        />
        <br/>
        <TextField
          label="price"
          name="price"
          onChange={handleChange}
        />
        <br/>
        <TextField
          label="number"
          name="number"
          onChange={handleChange}
        />
        <br/><br/>
        <Button type='submit' variant="contained" color="primary">Add</Button>
      </form>
      <br/>

      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Candy Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candies.map(candy => {
            return <TableRow key={candy.id}>
              <TableCell>{candy.name}</TableCell>
              <TableCell>{candy.price}</TableCell>
              <TableCell>{candy.number}</TableCell>
            </TableRow>;
          })}
        </TableBody>

      </Table>


    </>
  );
};

export default App;
