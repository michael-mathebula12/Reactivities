import { Box, Tabs, Tab, Card, CardMedia, CardContent, Typography } from "@mui/material";
import React from "react";
import { useActivities } from "../../lib/hooks/useActivities";
import { useParams } from "react-router";
import { useStore } from "../../lib/hooks/useStore";
import { useProfile } from "../../lib/hooks/useProfile";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }
// function CustomTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }


// type Props = {
//     activity: Activity[];
// }

// function a11yProps(index: number) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

export default function ProfileActivities() {
    // Simple date formatter: '21st February 2026, 14:30'
    function formatActivityDate(dateString: Date) {
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('en-GB', { month: 'long' });
        const year = dateObj.getFullYear();
        const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // Ordinal helper
        const getOrdinal = (n: number) => {
            const s = ["th", "st", "nd", "rd"], v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        };
        return `${getOrdinal(day)} ${month} ${year} ${time}`;
    }

    const [value, setValue] = React.useState(0);

    const { id } = useParams();
    const { activityStore: { filter, setFilter } } = useStore();
    const { filteredActivities, loadingFilteredActivities } = useProfile(id, filter);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    if (!filteredActivities) return <Typography> No activities found</Typography>

    return (
        < Box>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Future Events" onClick={() => setFilter("future")} />
                <Tab label="Past Events" onClick={() => setFilter("past")} />
                <Tab label="Hosting" onClick={() => setFilter("hosting")} />
            </Tabs>
            <Box sx={{ width: '100%' }}
                display='flex'
                flexWrap='wrap'
                gap={2}>

                {filteredActivities && filteredActivities.map(act => (
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
                                <Typography color='text.secondary' sx={{ fontSize: 12 }}>
                                    {formatActivityDate(act.date)}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box >

        </Box >
    );
}