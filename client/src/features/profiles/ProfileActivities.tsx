import { Box, Tabs, Tab, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { format } from "date-fns";



export default function ProfileActivities() {

    const { id } = useParams();
    const [filter, setFilter] = useState('future');
    const { filteredActivities } = useProfile(id, filter);



    return (
        < Box>
            <Tabs value={filter} onChange={(e, newValue) => setFilter(newValue)} aria-label="basic tabs example">
                <Tab value="future" label="Future Events" />
                <Tab value="past" label="Past Events" />
                <Tab value="hosting" label="Hosting" />
            </Tabs>
            <Box sx={{ width: '100%' }}
                display='flex'
                flexWrap='wrap'
                gap={2}>

                {!filteredActivities ? <Typography>No activities found</Typography> : filteredActivities.map(act => (
                    <Card key={act.id}
                        sx={{
                            mt: 2,
                            maxWidth: 160,
                            height: 160,
                            fontSize: 12,
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',

                        }}>
                        <CardMedia component='img'
                            src={`/images/categoryImages/${act.category}.jpg`}
                            sx={{ objectFit: 'fill' }}

                            alt={act.title}
                        />
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Box gap={1} display='flex' flexDirection='column'>
                                <Typography fontWeight='bold'
                                    sx={{ fontSize: 14 }}>
                                    {act.title}

                                </Typography>
                                <Typography display='flex' flexDirection='column' color='text.secondary' sx={{ fontSize: 12 }}>
                                    <span> {format(act.date, 'do LLL yyyy')}</span>
                                    <span> {format(act.date, 'h:mm a')}</span>
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box >

        </Box >
    );
}