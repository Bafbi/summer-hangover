import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Icon } from '@mui/material';

export default function MainMenuFooter() {
    return (
        <ButtonGroup variant="contained" className='bg-surface-variant'>
            <Button>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            </Button>
            <Button>
                <Icon>delete</Icon> Two
            </Button>
            <Button>
                <Icon>edit</Icon> Three
            </Button>
        </ButtonGroup>
    );
}