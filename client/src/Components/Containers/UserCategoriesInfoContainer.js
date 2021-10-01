import {
    useState
} from 'react'

import {
    useSelector,
    useDispatch
} from 'react-redux'

import {
    DragDropContext,
    Droppable,
    Draggable
} from 'react-beautiful-dnd'

import {
    Box,
    Stack,
    Typography,
    Button,
    alpha
} from '@mui/material'

import { categoriesSet } from '../../Redux/Slices/categoriesSlice'

import UserCategoriesItem from '../Items/UserCategoriesItem'
import NewCategoryDialog from '../Dialogs/NewCategoryDialog'



function UserCategoriesInfoContainer() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.entities)
    const user = useSelector((state) => state.user.entities)

    const [isOpen, setIsOpen] = useState(false)

    let sortedCategories = JSON.parse(JSON.stringify(categories))
    sortedCategories.sort((a, b) => a.position - b.position)

    function handleOnDragEnd(result) {

        if (!result.destination) return;

        const startingPosition = result.source.index+1;
        const endingPosition = result.destination.index+1;

        sortedCategories[result.source.index].position = endingPosition;
        sortedCategories[result.destination.index].position = startingPosition;

        sortedCategories.sort((a, b) => a.position - b.position)

        sortedCategories.forEach(async (category) => {
            let response = await fetch(`/users/${user.id}/categories/${category.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    position: category.position
                })
            });
        })
        dispatch(categoriesSet(sortedCategories))
    }

    return <>
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
                marginTop: '30px',
                marginBottom: '30px',
                width: '100%'
            }}
        >
            <Typography
                sx={{
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '2.5rem',
                    marginBottom: '10px'
                }}
            >
                Categories
            </Typography>
            <Box
                borderRadius="16px"
                sx={{
                    width: '90%',
                    height: '3px',
                    bgcolor: 'primary.main',
                    marginBottom: '10px'
                }}
            />
            <DragDropContext
                onDragEnd={handleOnDragEnd}
            >
                <Droppable
                    droppableId="categories"
                    style={{
                    }}
                >
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                                width: '100%'
                            }}
                        >
                            {
                                sortedCategories.map((category, index) => (
                                    <UserCategoriesItem
                                        key={category.id}
                                        name={category.name}
                                        balance={category.balance}
                                        percentage={category.percentage}
                                        id={category.id}
                                        index={index}
                                    />
                                ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Button
                variant="contained"
                disableElevation
                onClick={() => { setIsOpen((isOpen) => !isOpen) }}
                sx={{
                    bgcolor: 'primary.light',
                    width: '90%',
                    marginTop: '5px',
                    '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2)
                    }
                }}
            >
                <Typography
                    sx={{
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: '1.8rem'
                    }}
                >
                    New Category
                </Typography>
            </Button>
        </Stack>
        <NewCategoryDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        />
    </>;
}

export default UserCategoriesInfoContainer;