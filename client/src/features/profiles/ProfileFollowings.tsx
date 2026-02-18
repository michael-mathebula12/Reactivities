import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import ProfileCard from "./ProfileCard";

type Props = {
    activeTab: number
}

export default function ProfileFollowings({ activeTab }: Props) {

    const { id } = useParams();

    const predicate = activeTab === 3 ? 'followers' : 'followings';
    const { profile, followings, loadingFollowings } = useProfile(id, predicate);

    return (
        <Box>
            <Box display='flex'>
                <Typography variant="h5">
                    {activeTab === 3 ? `People following ${profile?.displayName}` : `People ${profile?.displayName} is following`}
                </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            {loadingFollowings ? (
                <Typography>Loading...</Typography>
            ) : followings && followings.length > 0 ? (
                <Box display='flex' marginTop={3} gap={3}>
                    {followings.map(profile => (
                        <ProfileCard key={profile.id} profile={profile} />
                    ))}
                </Box>
            ) : (
                <Typography variant="h6">
                    {activeTab === 3
                        ? `${profile?.displayName} has no followers yet.`
                        : `${profile?.displayName} is not following anyone yet.`}
                </Typography>
            )}
        </Box>
    )
}