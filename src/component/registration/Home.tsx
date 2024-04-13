import { Box, Grid, createTheme, ThemeProvider } from '@mui/material'
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

const theme = createTheme({
    //what we want to coustmize
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "body2"
                    },
                    style: {
                        fontSize: 12,
                        color: "grey"
                    }
                },
                {
                    props: {
                        variant: "body1"
                    },
                    style: {
                        fontSize: 9,
                        color: "red"
                    }
                }
            ]
        }
    }
})

const Home = () => {
    return (
        <Box padding={2}>
            <ThemeProvider theme={theme}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={6}>
                                <img
                                    src="images/banner.png"
                                    alt="image"
                                    className='img' />
                                <Box padding={1} sx={{ display: "flex", justifyContent: "center" }}>
                                    <Typography variant="h3" component="h1" color="primary">
                                        Home
                                    </Typography>
                                    <Rating name="read-only" value={4.5} precision={0.5} readOnly size='small' />
                                </Box>
                                <Typography padding={1} variant='body2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </Box>

    )
}

export default Home