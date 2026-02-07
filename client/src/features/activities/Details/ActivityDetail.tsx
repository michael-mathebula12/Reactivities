import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities";

interface Props {
  selectedActivity: Activity
  cancelSelectedActivity: () => void;
  openForm: (id: string) => void;
}

export default function ActivityDetail({ selectedActivity, cancelSelectedActivity, openForm }: Props) {

  const { activities } = useActivities();
  const activity = activities?.find(x => x.id === selectedActivity.id)

  if (!activity) {
    return <Typography>Loading...</Typography>

  }
  return (
    <>
      <Card sx={{ borderRadius: 3 }}>
        <CardMedia
          component='img'
          src={`/images/categoryImages/${activity.category}.jpg`}
        />

        <CardContent>
          <Typography variant="h5">{activity.title}</Typography>
          <Typography variant="subtitle1" fontWeight="light">{activity.date}</Typography>
          <Typography variant="body1">{activity.description}</Typography>
        </CardContent>

        <CardActions>
          <Button onClick={() => openForm(activity.id)} color="primary">Edit</Button>
          <Button onClick={cancelSelectedActivity} color="inherit">Cancel</Button>
        </CardActions>
      </Card>
    </>

  )
}
