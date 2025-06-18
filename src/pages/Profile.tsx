
import { useAuth } from '../context/AuthContext';
import { ChevronLeftIcon, ChevronRightIcon, InboxIcon } from "@heroicons/react/24/solid";
import { useState } from 'react';
import { Link } from 'react-router';
import axiosInstance from '../api/axiosInstance';
import { ChangePasswordDialog } from '../components/profile/ChangePasswordDialog';
import { useTranslation } from 'react-i18next';
import { Button, Container, Box, Stack, IconButton, Typography, Grid, TextField, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';

function Profile() {
    const { user, loading, error, update, logout } = useAuth();
    const { t } = useTranslation(undefined, { keyPrefix: "profile" });


    const [name, setName] = useState(user!.name);
    const [phone, setPhone] = useState(user!.phone || "");

    const [openChangePassword, setOpenChangePassword] = useState(false);

    const onSaveChanges = async () => {
        update(name, phone);
    };

    return (
        <Container>
            <Box sx={{ my: 4, px: 2 }}>
                <Link to={"/account"}>
                    <IconButton>
                        <ChevronLeftIcon className="size-8" />
                    </IconButton>
                </Link>
            </Box>
            <Box sx={{ p: 4 }}>
                <Typography variant='h5' component="h1" sx={{ mb: 4 }}>
                    {t("title")}
                </Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            required
                            disabled
                            fullWidth
                            value={user!.email}
                            type='email'
                            id="profile-email"
                            label={t("form.email")}
                            variant="filled"
                            placeholder={t("form.email_placeholder")}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            value={name}
                            type='text'
                            id="profile-name"
                            label={t("form.name")}
                            variant="filled"
                            onChange={ev => setName(ev.target.value)}
                            placeholder={t("form.name_placeholder")}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            value={phone}
                            type='text'
                            id="profile-phone"
                            label={t("form.phone")}
                            variant="filled"
                            onChange={ev => setPhone(ev.target.value)}
                            placeholder={t("form.phone_placeholder")}
                        />
                    </Grid>

                    <Grid size={12}
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: "column", sm: "row" },
                            justifyContent: "end",
                            alignItems: "center",
                            gap: 2
                        }}
                    >
                        {
                            error &&
                            <Box sx={{ color: "error.main", textAlign: "center" }}>{error}</Box>
                        }
                        <Button
                            disabled={loading || !name}
                            onClick={() => onSaveChanges()}
                            size="large"
                            variant="contained"
                            color="secondary"
                            loading={loading}
                            sx={{ width: { xs: 1, sm: 'auto' } }}
                        >
                            {t("form.save_changes")}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Stack sx={{ mt: 4, px: 4 }}>
                <List>
                    <ListItem
                        disablePadding
                        secondaryAction={
                            <ChevronRightIcon className='size-5' />
                        }
                    >
                        <ListItemButton onClick={() => setOpenChangePassword(true)}>
                            <ListItemText primary={t("change_password")} />
                        </ListItemButton>
                    </ListItem>
                    <Divider/>
                    <ListItem 
                        disablePadding
                        secondaryAction={
                            <ChevronRightIcon className='size-5' />
                        }
                    >
                        <ListItemButton onClick={() => logout()}>
                            <ListItemText slotProps={{primary: {color: "error.main"}}} primary={t("log_out")}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Stack>

            <ChangePasswordDialog
                open={openChangePassword}
                setOpen={setOpenChangePassword}
            />
        </Container>
    );
}

export default Profile;