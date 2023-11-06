import { ProjectForm } from "../form/ProjectForm";

const initialState = {
  data: {
    name: "",
    description: "",
    primary_blob_url: "",
    secondary_blob_url: "",
  },
  errors: {},
};

export default function NewProjectPage() {
  return (
    <>
      <h2>Add Project</h2>
      <ProjectForm initialState={initialState} submitText="Add" />
    </>
  );
}
