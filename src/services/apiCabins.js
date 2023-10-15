import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    console.log("newCabin", newCabin);
    console.log("id", id);

    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
        "/",
        ""
    );
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. create/edit cabin
    let query = supabase.from("cabins");
    if (!id) {
        query = query.insert([{ ...newCabin, image: imagePath }]);
    } else {
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
    }
    console.log("query:", query);

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }

    // 2. upload image
    if (hasImagePath) {
        return data;
    }

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // 3. Delete cabin if there was an error uploading image
    if (storageError) {
        await deleteCabin(data.id);
        console.error(storageError);
        throw new Error(
            "Cabin image could not be uploaded and the cabin was not created"
        );
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }

    return data;
}