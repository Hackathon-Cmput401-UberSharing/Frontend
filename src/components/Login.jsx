import React,{useState} from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import axios from "axios";

function App() {
    const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    function changeHandler(){
        axios
      .post(`${base_url}/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data)
        console.log(res.data.token)
        localStorage.setItem("jwtToken", res.data.token);
        localStorage.setItem("userID",res.data.id);
      })
      .catch((e) => {
        console.log(e)
      });

    }

    const ModeToggle = () => {
        const { mode, setMode } = useColorScheme();
        const [mounted, setMounted] = React.useState(false);
      
        // necessary for server-side rendering
        // because mode is undefined on the server
        React.useEffect(() => {
          setMounted(true);
        }, []);
        if (!mounted) {
          return null;
        }
      
        return (
          <Button
            variant="outlined"
            onClick={() => {
              if (mode === 'light') {
                setMode('dark');
              } else {
                setMode('light');
              }
            }}
          >
            {mode === 'light' ? 'Turn dark' : 'Turn light'}
          </Button>
        );
      };
  return (
    <CssVarsProvider>
        {/* <ModeToggle /> */}
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
      <b>Welcome!</b>
    </Typography>
    <Typography level="body2">Sign in to continue</Typography>
  </div>
  <TextField
    // html input attribute
    name="email"
    type="email"
    placeholder="johndoe@email.com"
    // pass down to FormLabel as children
    label="Email"
    onChange={(e) => {
        setUsername(e.target.value);
      }}
    onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  changeHandler();
                }}}
  />
  <TextField
    name="password"
    type="password"
    placeholder="password"
    label="Password"
    onChange={(e) => {
        setPassword(e.target.value);
      }}
      onKeyPress={(ev) => {
        if (ev.key === "Enter") {
          ev.preventDefault();
          changeHandler();
        }
      }}
  />
  <Button
    sx={{
      mt: 1, // margin top
    }}
    onClick={changeHandler}
  >
    Log in
  </Button>
  <Typography
    endDecorator={<Link href="/sign-up">Sign up</Link>}
    fontSize="sm"
    sx={{ alignSelf: 'center' }}
  >
    Don't have an account?
  </Typography>
</Sheet>

    </CssVarsProvider>
  );
}

export default App;
