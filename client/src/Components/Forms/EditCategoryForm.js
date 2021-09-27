import { useState } from 'react'

import {
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    Typography
} from "@mui/material"

function EditCategoryForm({ setIsOpen, category, setCategory }) {
    const [formData, setFormData] = useState({
        name: category.name,
        percentage: category.percentage
    })

    function handleChange(e) {
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        setIsOpen(false);
    }

    return (
        <form>
            <DialogContent>
                <Stack
                    spacing={6}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        marginBottom: '20px'
                    }}
                >
                    <TextField
                        sx={{
                            width: 'calc(85% + 12px)'
                        }}
                        label="Category Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{
                            width: 'calc(85% + 12px)'
                        }}
                        label="Percentage of Income"
                        name="percentage"
                        value={formData.percentage}
                        onChange={handleChange}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    color="secondary"
                    variant="outlined"
                    sx={{
                        bgcolor: 'primary.light',
                        width: '100px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginBottom: '10px'
                    }}
                >
                    <Typography
                        sx={{
                            color: 'text.primary'
                        }}
                    >
                        Save
                    </Typography>
                </Button>
            </DialogActions>
        </form>
    )
}

export default EditCategoryForm;