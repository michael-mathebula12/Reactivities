import { Box, Button, Divider, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import ProfileEditForm from "./ProfileEditForm";
import { useState } from "react";

export default function ProfileAbout() {

    const { id } = useParams();
    const { isCurrentUser, profile } = useProfile(id);
    const [editForm, setEditForm] = useState(false);



    return (
        <Box>
            <Box display="flex" justifyContent='space-between'>
                <Typography variant="h5"> About {profile?.displayName}</Typography>

                {/* onclick button, load profEdFrom */}
                {isCurrentUser && (
                    <Button onClick={() => setEditForm(!editForm)}>
                        {editForm ? 'Cancel' : 'Edit Profile'}
                    </Button>
                )}
            </Box>
            <Divider sx={{ my: 2 }} />
            {editForm ? (
                <ProfileEditForm setEditForm={setEditForm}/>
            ) : (
                <Box sx={{ overflow: 'auto', maxHeight: 350 }}>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {profile?.bio || 'No bio yet'}
                    </Typography>
                </Box>
            )
            }
        </Box>
    )
}
