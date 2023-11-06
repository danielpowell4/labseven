"use server";

import { del } from "@vercel/blob";
import { sql } from "@vercel/postgres";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createProject(prevState, formData) {
  // parse + validate
  const data = parseData(formData);
  const errors = validateData(data);
  if (Object.keys(errors).length > 0) {
    return { ...prevState, data, errors };
  }

  // insert
  const { name, description, primary_blob_url, secondary_blob_url } = data;
  const { rows } = await sql`
    INSERT INTO projects
      (updated_at, name, description, primary_blob_url, secondary_blob_url)
    VALUES
      (${new Date()}, ${name}, ${description}, ${primary_blob_url}, ${secondary_blob_url})
    RETURNING *
  `;

  return handleSuccess("Added", rows[0]);
}

export async function updateProject(projectId, prevState, formData) {
  // parse + validate
  const data = parseData(formData);
  const errors = validateData(data);
  if (Object.keys(errors).length > 0) {
    return { ...prevState, data, errors };
  }

  // update
  const { name, description, primary_blob_url, secondary_blob_url } = data;
  const { rows } = await sql`
    UPDATE projects
    SET
      updated_at = ${new Date()},
      name = ${name},
      description = ${description},
      primary_blob_url = ${primary_blob_url},
      secondary_blob_url = ${secondary_blob_url}
    WHERE id = ${projectId}
    RETURNING *
  `;

  return handleSuccess("Updated", rows[0]);
}

export async function deleteProject(_prevState, formData) {
  const projectId = formData.get("id");

  try {
    // delete project
    const { rows } =
      await sql`DELETE FROM projects WHERE id = ${projectId} RETURNING *`;
    // clear blob storage
    const deletedProject = rows[0];
    await del(deletedProject.primary_blob_url);
    await del(deletedProject.secondary_blob_url);

    return handleSuccess("Deleted", rows[0]);
  } catch (error) {
    console.error(error);
    return { message: `Something went wrong: ${error.message}` };
  }
}

// START - utils
const parseData = (formData) => ({
  name: formData.get("name"),
  description: formData.get("description") ?? null,
  primary_blob_url: formData.get("primary_blob_url"),
  secondary_blob_url: formData.get("secondary_blob_url"),
});

const validateData = (data) => {
  const missingFields = [];

  if (!data.name) missingFields.push("name");
  if (!data.primary_blob_url) missingFields.push("primary_blob_url");
  if (!data.secondary_blob_url) missingFields.push("secondary_blob_url");

  return missingFields.reduce(
    (acc, field) => ({
      ...acc,
      [field]: "required",
    }),
    {}
  );
};

const handleSuccess = (verb, project) => {
  const goodVibes = ["Rad", "Awesome", "Cool", "Sweet", "Nice"];
  const sampleVibe = goodVibes[Math.floor(Math.random() * goodVibes.length)];
  const message = `${sampleVibe}! ${verb} '${project.name}' (Project ID: ${project.id})`;

  // add flash
  const cookieStore = cookies();
  cookieStore.set("flash:success", message, { maxAge: 0 });

  revalidatePath("/admin/projects", "layout");

  return redirect("/admin/projects");
};
// END - utils
