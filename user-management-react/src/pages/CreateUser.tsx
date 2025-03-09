import { useForm } from "react-hook-form";
import { createUser } from "../api/users";
import { useNavigate } from "react-router-dom";
import { Button, Input, Stack, FormLabel, FormControl, useToast } from "@chakra-ui/react";

const CreateUser = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (data: any) => {
    try {
      await createUser({ name: data.name, job: data.job });
      toast({ title: "User created!", status: "success" });
      navigate("/dashboard");
    } catch {
      toast({ title: "Failed to create user!", status: "error" });
    }
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input {...register("name")} required />
      </FormControl>
      <FormControl>
        <FormLabel>Job</FormLabel>
        <Input {...register("job")} required />
      </FormControl>
      <Button type="submit">Create</Button>
    </Stack>
  );
};

export default CreateUser;
