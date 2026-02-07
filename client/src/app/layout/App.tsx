// import './App.css'

import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  // const [activities, setActivities] = useState<Activity[]>([]);

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  const { activities, isPending } = useActivities();



  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find((x) => x.id === id));
  };

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectedActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };



  return (
    <>
      <Box sx={{ backgroundColor: "#eeeeee", minHeight: "100vh" }}>
        <CssBaseline />
        <NavBar openForm={handleOpenForm} />

        <Container maxWidth="xl" sx={{ mt: 3 }}>
          {!activities || isPending ? (
            <Typography>Loading...</Typography>
          ) : (
            <ActivityDashboard
              activities={activities}
              selectActivity={handleSelectActivity}
              cancelSelectedActivity={handleCancelSelectedActivity}
              selectedActivity={selectedActivity}
              editMode={editMode}
              openForm={handleOpenForm}
              closeForm={handleFormClose}
            />
          )}
        </Container>
      </Box>
    </>
  );
}

export default App;
