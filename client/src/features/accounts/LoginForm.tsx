import { zodResolver } from "@hookform/resolvers/zod";
import { LockOpen, Visibility, VisibilityOff } from "@mui/icons-material";
import { Paper, Box, Typography, Button, IconButton, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import TextInput from "../../app/shared/components/TextInput";
import { useAccount } from "../../lib/hooks/useAccount";
import { type LoginSchema, loginSchema } from "../../lib/schemas/loginSchema";
import { useNavigate, useLocation, Link } from "react-router";
import { useState } from "react";

export default function LoginForm(){
    const {loginUser} = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);

      const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    //explain what the oine below means
    const {control, handleSubmit, formState: {isValid, isSubmitting}} = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data,{
              onSuccess: () =>{
                navigate(location.state?.from || '/activities');
              }
        });
    }

    return (
        <Paper
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
            display:'flex',
            flexDirection:'column',
            p:3,
            gap: 3,
            maxWidth: 'md',
            mx: 'auto',
            borderRadius: 3
        }}>
        <Box
        display='flex' alignItems='center' justifyContent='center'
        gap={3} color='secondary.main'>
            <LockOpen fontSize='large' />
            <Typography variant='h4'>Sign in</Typography>

        </Box>
        <TextInput label='Email' control={control} name='email'/>
        <TextInput label='Password' type={showPassword ? 'text' : 'password'} control={control} name='password'
        slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    },
                }}
        />
           
        <Button 
        type='submit'
        disabled={!isValid || isSubmitting}
        variant="contained"
        size="large">
            Login

        </Button>
        <Typography sx={{textAlign: 'center'}}>
            Don't have an account?
            <Typography sx={{ml: 2}} component={Link} to='/register' color='primary'>
            Sign up
            </Typography>
        </Typography>


        </Paper>
    )
}