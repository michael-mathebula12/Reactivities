import { useForm } from "react-hook-form";
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerSchema";
import { useAccount } from "../../lib/hooks/useAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography, InputAdornment, IconButton } from "@mui/material";
import { LockOpen, Visibility, VisibilityOff } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link } from "react-router";
import { useState } from "react";



export default function RegisterForm() {
    const { registerUser } = useAccount();

    const [showPassword, setShowPassword] = useState(false);

    //explain what the one below means
    const { control, handleSubmit, setError, formState: { isValid, isSubmitting } } = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach(err => {
                        if (err.includes('Email'))
                            setError('email', { message: err });
                        else if (err.includes('Password')) setError('password', { message: err })
                    })
                }
            }
        });
    }

    return (
        <Paper
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                gap: 3,
                maxWidth: 'md',
                mx: 'auto',
                borderRadius: 3
            }}>
            <Box
                display='flex' alignItems='center' justifyContent='center'
                gap={3} color='secondary.main'>
                <LockOpen fontSize='large' />
                <Typography variant='h4'>Register</Typography>

            </Box>
            <TextInput label='Email' control={control} name='email' />
            <TextInput label='Display Name' control={control} name='displayName' />
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
                Register

            </Button>
            <Typography sx={{ textAlign: 'center' }}>
                Already have an account?
                <Typography sx={{ ml: 2 }} component={Link} to='/login' color="primary">
                    Sign in
                </Typography>
            </Typography>
        </Paper>
    )
}