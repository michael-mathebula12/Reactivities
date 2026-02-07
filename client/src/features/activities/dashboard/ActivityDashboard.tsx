import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../Details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  selectedActivity: Activity | undefined;
  openForm: (id: string) => void;
  closeForm: () => void;
  editMode: boolean;
}



export default function ActivityDashboard({ activities, cancelSelectedActivity,
  selectActivity,
  selectedActivity,
  openForm,
  closeForm,
  editMode,

}: Props) {

  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList activities={activities}
          selectActivity={selectActivity}
        />
      </Grid>

      <Grid size={5}>
        {selectedActivity && !editMode &&
          <ActivityDetail selectedActivity={selectedActivity}
            cancelSelectedActivity={cancelSelectedActivity}
            openForm={openForm}
          />
        }

        {editMode &&
          <ActivityForm closeForm={closeForm} activity={selectedActivity}
          />}
      </Grid>
    </Grid>
  );
}
