import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import * as React from 'react';
import Grid from '@mui/material/Grid';

import axios from "axios";

import FormControl from '@mui/material/FormControl';

import Stack from '@mui/material/Stack';


class UploadImage extends React.Component {
    state = {
      file: null,
      base64URL: ""
    };
  
    getBase64 = file => {
      return new Promise(resolve => {
        let fileInfo;
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();
  
        // Convert the file to base64 text
        reader.readAsDataURL(file);
  
        // on reader load somthing...
        reader.onload = () => {
          // Make a fileInfo Object
          console.log("Called", reader);
          baseURL = reader.result;
          console.log(baseURL);
          resolve(baseURL);
        };
        console.log(fileInfo);
      });
    };
  
    handleFileInputChange = async e => {
      console.log(e.target.files[0]);
      let { file } = this.state;
  
      file = e.target.files[0];
  
      this.getBase64(file)
        .then(result => {
          file["base64"] = result;
          console.log("File Is", file);
          this.setState({
            base64URL: result,
            file
          });
          console.log(this.state)
          this.props.handleUpload(this.state.base64URL);
        })
        .catch(err => {
          console.log(err);
        });
  
      this.setState({
        file: e.target.files[0]
      });

    };
  
    render() {
      return (
        <div>
          <input type="file" name="file" onChange={this.handleFileInputChange} />
        </div>
      );
    }
  }


class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            password:"",
            content:"",
        }
        console.log(this.props)

    }

    handleForm = e => {
        const target = e.target;

        const value = target.type === "checkbox"
        ? target.checked
        : target.value;

        const name = target.name;
        console.log(name)
        console.log(value)
        this.setState({
            [name]:value
        })
    }

    handlePost = () => {
        console.log(this.state);
 
        axios
          .post(`1`, this.state,    
          {
            headers: {
              Authorization: "token ",
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch(e => {
              console.log(e);
          }); 
          
        this.props.onClickClose();

        } 

        handleUpload = (value) =>{
            this.setState((prevState, props) => {
                prevState.content = value;
                console.log(this.state.content)
                return prevState;
            });
        }
    
        renderUpload = () => {
                return(
                    <Grid item xs={12}>
    
                    <UploadImage handleUpload ={this.handleUpload}/>    
                    </Grid>
    
                )
            
    
        }

    render(){
        const {name,password} = this.state;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
    <CssVarsProvider>
    <Sheet
    sx={{
        maxWidth: 400,
        mx: 'auto', // margin left & right
        my: 4, // margin top & botom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
    }}
    >
  <div>
    <Typography level="h4" component="h1">
      <b>Sign up!</b>
    </Typography>
    <Typography level="body2">please fill out Information below</Typography>
  </div>
  
  <TextField
        name="name"
        type="name"
        placeholder="your name"
        label="name"
        onChange = {this.handleForm}
    />
    <TextField
        name="password"
        type="password"
        placeholder="password"
        label="Password"
        onChange = {this.handleForm}
    />
<Stack direction="row" spacing={2}>
        Upload Avatar:<tab></tab>
        {this.renderUpload()}
    </Stack>


        <Button
        sx={{
        mt: 1, // margin top
        }}
    >
        Sign up
    </Button>

  <Typography
    endDecorator={<Link href="/login">Log in</Link>}
    fontSize="sm"
    sx={{ alignSelf: 'center' }}
  >
    Already have an account?
  </Typography>
</Sheet>  </CssVarsProvider></div>
  );
}
}

export default Signup;