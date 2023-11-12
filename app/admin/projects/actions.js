"use server";

import { del } from "@vercel/blob";
import { sql } from "@vercel/postgres";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const slugify = (str) => {
  return (str || "")
    .toLowerCase()
    .replace(/\/|-/, " ")
    .replace(/'/, "")
    .replace(/\s+/g, "-");
};

export async function createProject(prevState, formData) {
  // parse + validate
  const data = parseData(formData);
  const errors = await validateData(data);
  if (Object.keys(errors).length > 0) {
    return { ...prevState, data, errors };
  }

  // insert
  const { name, description, primary_blob_url, secondary_blob_url } = data;
  const { rows } = await sql`
    INSERT INTO projects
      (updated_at, name, slug, description, primary_blob_url, secondary_blob_url)
    VALUES
      (${new Date()}, ${name}, ${slug}, ${description}, ${primary_blob_url}, ${secondary_blob_url})
    RETURNING *
  `;

  return handleSuccess("Added", rows[0]);
}

export async function updateProject(projectId, prevState, formData) {
  // parse + validate
  const data = parseData(formData);
  const errors = await validateData(data, projectId);
  if (Object.keys(errors).length > 0) {
    return { ...prevState, data, errors };
  }

  // update
  const { rows } = await sql`
    UPDATE projects
    SET
      updated_at = ${new Date()},
      name = ${data.name},
      slug = ${data.slug},
      description = ${data.description},
      primary_blob_url = ${data.primary_blob_url},
      secondary_blob_url = ${data.secondary_blob_url}
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

    return handleSuccess("Removed", rows[0]);
  } catch (error) {
    console.error(error);
    return { message: `Something went wrong: ${error.message}` };
  }
}

// START - utils
const parseData = (formData) => ({
  name: formData.get("name"),
  slug: slugify(formData.get("name")),
  description: formData.get("description") ?? null,
  primary_blob_url: formData.get("primary_blob_url"),
  secondary_blob_url: formData.get("secondary_blob_url"),
});

const validateData = async (data, projectId) => {
  const missingFields = [];

  if (!data.name) missingFields.push("name");
  if (!data.primary_blob_url) missingFields.push("primary_blob_url");
  if (!data.secondary_blob_url) missingFields.push("secondary_blob_url");

  const errors = missingFields.reduce(
    (acc, field) => ({
      ...acc,
      [field]: "required",
    }),
    {}
  );

  if (data.slug) {
    let sameSlug;
    if (projectId) {
      sameSlug = await sql`
        SELECT * FROM projects WHERE slug = ${data.slug} AND id != ${projectId}
      `;
    } else {
      sameSlug = await sql`
        SELECT * FROM projects WHERE slug = ${data.slug}
      `;
    }

    if (sameSlug.rows.length > 0) {
      errors.name = "slug already taken (name must be unique)";
    }
  }

  return errors;
};

const handleSuccess = (verb, project) => {
  const goodVibes = ["Rad", "Awesome", "Cool", "Sweet", "Nice"];
  const sampleVibe = goodVibes[Math.floor(Math.random() * goodVibes.length)];
  const message = `${sampleVibe}! ${verb} '${project.name}' (Project ID: ${project.id})`;

  // add flash
  const cookieStore = cookies();
  cookieStore.set("flash:success", message, { maxAge: 0 });

  revalidatePath("/admin/projects", "layout");
  revalidatePath("/gallery", "layout");
  revalidateTag("projects");

  return redirect("/admin/projects");
};
// END - utils
