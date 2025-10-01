import { Box, Button } from "@mui/material";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
      <Button
        variant="contained"
        color="primary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "contained" : "outlined"}
          color={page === currentPage ? "primary" : "inherit"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="contained"
        color="primary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </Box>
  );
}
