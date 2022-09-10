import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Grid from '@mui/material/Grid';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useState } from "react";
import Addsession from "./Addsession";

import Button from '@mui/material/Button';


const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';


class SessionList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Session: []
    }
  }

  componentDidMount() {
    axios.get(`${base_url}/author/${this.props.authorId}/posts/`,
    {
      headers: {
        Authorization: "token ",
      },
    })
      .then(res => {
        console.log(res);
        const posts = res.data;
        console.log(posts);

        this.setState(posts);
        console.log(this.state.posts);

    })
  }

 

  renderSessions = () =>{
    const {sessions} = this.state;
    return sessions.length === 0
        ? <li>No sessions</li>
        : (sessions.map(item => (
          <ListItem key = {item.id}>
          </ListItem> ))
          )

        };

    render(){
      return (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >

          <List
            sx={{
              width: '100%',
              // maxWidth: 360,
              bgcolor: 'background.paper',
            }}
          >         
            {this.renderSessions()}
          </List>
        </Grid>
      )
    }
}



export default function Sessions(props) {
  const jwtToken = localStorage.getItem('jwtToken');
  const userID = localStorage.getItem('userID');
  const token = localStorage.getItem('jwtToken')

  console.log(jwtToken)
  console.log(userID)
  
    var authorId = props.author_id
    const [addPage, setAddPage] = useState(false);
    function RenderAddButton(){
      if (addPage){
        return(<Addsession onClick = {submitORCancelOnClick} authorId = {authorId}/>);
      }
      return null;
    }

    function RenderAddAddButton(){
      if (authorId == userID){
        return(
        
          <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          
        > <Button onClick = {addOnClick}> Add Post</Button><RenderAddButton/></Grid> 
        );
      }
      return null;
    }
    function addOnClick(){
      console.log("add click");
      setAddPage(true);
    }

    function submitORCancelOnClick(){
      console.log("end click");
      setAddPage(false);
    }

    return(
        <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="center"
    >
   
            {/* <RenderAddAddButton/>   */}
   <div><SessionList token = {token} authorId = {authorId} /></div>
   </Grid> 
   );
}