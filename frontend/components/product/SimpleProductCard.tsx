import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

interface SimpleProductCardProps {
  product: any;
  isDiscription: boolean;
}

const SimpleProductCard = ({ product , isDiscription }: SimpleProductCardProps) => {

  return (
    <Card
      sx={{
        height: { xs: 300, sm: 320, md: 340 },
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s ease",
        position: "relative",
        "&:hover": {
          transform: "translateY(-6px) scale(1.02)",
          boxShadow: 6,
          "& .hoverView": {
            opacity: 1,
          },
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={product?.image}
          alt={product?.name}
          sx={{
            height: !isDiscription
              ? { xs: 320, md: 400 }
              : { xs: 200, md: 250 },
            width: "100%",
            objectFit: "contain",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        />
        <Box
          className="hoverView"
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 18,
            opacity: 0,
            transition: '0.3s ease',
          }}
        >
          View
        </Box>
      </Box>

      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} noWrap>
          {product?.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} noWrap>
          {product?.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SimpleProductCard;