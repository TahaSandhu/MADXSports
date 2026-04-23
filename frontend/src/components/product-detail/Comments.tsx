import { Box, Typography, Avatar, Rating, Paper } from "@mui/material";

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date?: string;
  avatarUrl?: string;
};

type Props = {
  reviews?: Review[];
  className?: string;
};

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString() : "";

const Comments = ({ reviews = [], className }: Props) => {
  const count = reviews.length;

  const avg =
    count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;

  return (
    <Box className={className}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          flexWrap: "nowrap",
          flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <Typography variant="h6" sx={{ m: 0, whiteSpace: "nowrap" }}>
          Customer reviews
        </Typography>

        <Typography sx={{ fontWeight: 600 }}>{avg.toFixed(1)}</Typography>

        <Rating value={avg} precision={0.1} readOnly />

        <Typography variant="body2" color="text.secondary">
          ({count} review{count !== 1 ? "s" : ""})
        </Typography>
      </Box>

      {count === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No reviews yet. Be the first to review this product.
        </Typography>
      ) : (
        reviews.map((r) => (
          <Paper key={r.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Avatar src={r.avatarUrl}>
                {!r.avatarUrl && r.name.charAt(0).toUpperCase()}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle2">{r.name}</Typography>

                  <Typography variant="caption" color="text.secondary">
                    {formatDate(r.date)}
                  </Typography>
                </Box>

                <Rating value={r.rating} readOnly size="small" />

                <Typography variant="body2" sx={{ mt: 1 }}>
                  {r.comment}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Comments;
