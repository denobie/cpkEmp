import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

function CardJustImage({image, alt}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt={alt}
                height="140"
                image={image}
            />
        </Card>
    );
}

export default CardJustImage;