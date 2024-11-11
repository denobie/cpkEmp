import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

function CardJustImage({image, alt, height}) {
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardMedia
                component="img"
                alt={alt}
                height={height ? height : "215"}
                image={image}
            />
        </Card>
    );
}

export default CardJustImage;