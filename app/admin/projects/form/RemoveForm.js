"use client";

import { useFormState, useFormStatus } from "react-dom";
import { deleteProject } from "../actions";

import { Button } from "components";

const initialState = { message: "" };

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="ButtonDanger" type="submit" isSubmitting={pending}>
      Delete
    </Button>
  );
}

export function RemoveProjectForm({ projectId }) {
  const [state, formAction] = useFormState(deleteProject, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="projectId" value={projectId} />
      <DeleteButton />
      {state?.message && (
        <p aria-live="polite" role="status" style={{ color: "var(--danger)" }}>
          {state?.message}
        </p>
      )}
    </form>
  );
}

export default RemoveProjectForm;
