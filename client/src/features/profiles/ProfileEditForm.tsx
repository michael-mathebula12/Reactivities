import { Box, Button } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import { useForm } from "react-hook-form";
import type { EditProfileSchema } from "../../lib/schemas/editProfileSchema";
import { useProfile } from "../../lib/hooks/useProfile";
import { useEffect } from "react";
import { useParams } from "react-router";


type Props = {
  setEditForm: (editForm: boolean) => void;
}

export default function ProfileEditForm({ setEditForm }: Props) {

  const { control, reset, handleSubmit, formState } = useForm<EditProfileSchema>();

  const { id } = useParams();
  const { profile, updateProfile } = useProfile(id);
  const { isDirty, isValid } = formState;

  const updateProfileInfo = (data: EditProfileSchema) => {
    updateProfile.mutate(data, {
      onSuccess: () => setEditForm(false)
    });
  }

  useEffect(() => {
    if (profile) {
      reset({
        displayName: profile.displayName,
        bio: profile.bio ?? ""
      })
    }
  }, [profile, reset])

  return (
    <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit(updateProfileInfo)}
    >
      <TextInput label='Display Name' sx={{ mt: 2 }} control={control} name='displayName' />
      <TextInput sx={{ mt: 2 }} label='Add your bio' multiline rows={3} control={control} name='bio' />


      {/* have disabled sch that on clickor updateProfile.isPending from display name enables update profile */}
      <Button sx={{ mt: 2 }}
        type="submit"
        fullWidth
        variant="contained"
        disabled={!isDirty || !isValid || updateProfile.isPending}
      >UPDATE PROFILE</Button>

    </Box>
  )
}
