import { Box, Container, TextField, FormHelperText, Button, Autocomplete, Stack, FormControl, Chip, Typography, MenuItem, InputLabel, Select } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

const NewRecipe = () => {



    const [title, setTitle] = useState('');
    const [description, setDesription] = useState('');
    const [guide, setGuide] = useState('');
    const [preparationTime, setPreparationTime] = useState(0);
    const [quantity, setQuantity] = useState('');
    const [authorId, setAuthorId] = useState(0);
    const [ingredientIds, setIngredientIds] = useState([]);
    const [selectedIngredientId, setSelectedIngredientId] = useState(null);

    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please enter the ";
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDesriptionError] = useState('');
    const [guideError, setGuideError] = useState('');
    const [preparationTimeError, setPreparationTimeError] = useState(0);
    const [quantityError, setQuantityError] = useState('');
    const [authorIdError, setAuthorIdError] = useState(0);
    const [ingredientIdsError, setIngredientIdsError] = useState([]);

    const loader_data = useLoaderData();
    const [ingredients, setIngredients] = useState(loader_data[0]);
    const [authors, setAuthors] = useState(loader_data[1]);

    const navigate = useNavigate();

    const save = async () => {

        if (title == '' || description == '' || guide == '' || preparationTime == 0 || quantity == '' || authorId == 0 || ingredientIds.size == 0) {
            setGlobalError('Please fill all fields in the form');
            return;
        }
        const new_recipe = {
            'title': title,
            'description': description,
            'guide': guide,
            'preparationTime': preparationTime,
            'quantity': quantity,
            'authorId': authorId,
            'ingredientIds': ingredientIds
        };
        let response = await fetch('http://localhost:8080/api/v1/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_recipe)
        });
        console.log(response);
        if (response.ok) {
            let d = await response.json();
            console.log(JSON.stringify(d));
            alert('Successfully added new recipe!');
            navigate('/recipes');
        } else {
            console.log(response);
        }
    }

    return <>
        <Container maxWidth="sm" sx={{ paddingTop: "15px" }}>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    gap: '10px',
                    flexDirection: 'column',
                    alignItems: "center",

                    "& .MuiTextField-root": { m: 1, width: "100%" },
                }}
                noValidate
                autoComplete="off">
                <Typography variant="h6">Please enter the values of the new ingredient.</Typography>

                <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    required
                    id="outlined-required"
                    label="Recipe title"
                    placeholder="Recipe title"
                    helperText={titleError}
                    error={titleError === "" ? false : true}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (e.target.value !== "") setTitleError("");
                        else setTitleError(errorMessageTemplate + " recipe title.");
                    }}
                />
                <TextField
                    multiline
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-description-input"
                    label="Description"
                    placeholder="Description"
                    error={descriptionError}
                    helperText={descriptionError ? descriptionError : "Describe recipe"}
                    // aria-aria-errormessage='ISBN is required'
                    onChange={(e) => {
                        setDesription(e.target.value);
                        if (e.target.value !== "")
                            setDesriptionError(
                                errorMessageTemplate +
                                " description."
                            );
                        else setDesriptionError("");
                    }}
                />
                <TextField
                    multiline
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-guide-input"
                    label="Guide"
                    placeholder="Guide"
                    error={guideError}
                    helperText={guideError}
                    onChange={(e) => {
                        setGuide(e.target.value);
                        if (e.target.value !== "")
                            setGuideError(
                                errorMessageTemplate +
                                " guide."
                            );
                        else setGuideError("");
                    }}
                />
                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-TimePreparation-input"
                    label="TimePreparation"
                    placeholder="TimePreparation"
                    error={preparationTimeError}
                    helperText={preparationTimeError}
                    onChange={(e) => {
                        setPreparationTime(e.target.value);
                        if (e.target.value.match(/^[0-9\b]+$/) == null)
                            setPreparationTimeError(
                                errorMessageTemplate +
                                " preparation time."
                            );
                        else setPreparationTimeError(0);
                    }}
                />

                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-quantity-input"
                    label="Quantity"
                    placeholder="Quantity"
                    error={quantityError}
                    helperText={quantityError}
                    onChange={(e) => {
                        setQuantity(e.target.value);
                        if (e.target.value !== '')
                            setQuantityError(
                                errorMessageTemplate +
                                " quantity."
                            );
                        else setQuantityError("");
                    }}
                />

                <FormControl
                    sx={{ width: "100%", marginBottom: "15px" }}
                    error={authorIdError}
                >
                    <InputLabel id="demo-select-small-label">Author</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="author-select"
                        label="Author"
                        required
                        onChange={(e) => {
                            setAuthorId(e.target.value);
                            if (e.target.value == 0) {
                                setAuthorIdError(true);
                            } else {
                                setAuthorIdError(false);
                            }
                        }}
                        value={authorId}
                    >
                        <MenuItem value={0}>
                            <em>None</em>
                        </MenuItem>
                        {authors.map((a) => (
                            <MenuItem value={a.id}> {a.username}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{authorIdError}</FormHelperText>
                </FormControl>

                <FormControl sx={{ width: "100%" }} error={ingredientIdsError}>

                    <Stack direction='column'>
                        <Typography> Ingredients</Typography>


                        <Stack direction='row'>
                            {
                                ingredientIds.map((a, ii) => <Chip
                                    label={a} onDelete={() => {
                                        const a = ingredientIds.filter((v, i) => i != ii);
                                        setIngredientIds(a);
                                    }}
                                />)
                            }
                        </Stack>

                        <Stack direction='row' sx={{ width: '100%' }}>
                            <Autocomplete options={
                                ingredients.filter(a => ingredientIds.every(vv => vv != a.name))}
                                getOptionLabel={a => a.name}
                                renderInput={(params) => <TextField {...params} />} sx={{ width: "90%" }}
                                value={selectedIngredientId} onChange={(e, v) => setSelectedIngredientId(v)} />

                            <Button disabled={selectedIngredientId === null}
                                onClick={() => {

                                    if (selectedIngredientId != null) {
                                        let a = ingredientIds;
                                        a.push(selectedIngredientId.id);
                                        setIngredientIds(a);
                                        setSelectedIngredientId(null);
                                    }
                                }}
                            > Add ingredient</Button>
                        </Stack>
                    </Stack>
                </FormControl>

                <Button onClick={save} disabled={titleError || descriptionError || guideError || preparationTimeError || quantityError
                    || authorIdError || ingredientIdsError}>
                    {" "}
                    Save{" "}
                </Button>
                <FormHelperText error={globalError}>{globalError}</FormHelperText>

            </Box>
        </Container>
    </>

}

export default NewRecipe;