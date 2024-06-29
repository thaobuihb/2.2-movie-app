import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MCard from "./MCard";
import Typography from "@mui/material/Typography";
import PaginationItem from "@mui/material/PaginationItem";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import "./TrendingCardGroup.css"; // Import CSS riêng cho trending

function TrendingCardGroup({ trendingList, loadingTrending }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const getDisplayedItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return trendingList.slice(startIndex, startIndex + itemsPerPage);
  };

  useEffect(() => {
    // Reset page to 1 whenever trendingList changes
    setCurrentPage(1);
  }, [trendingList]);

  const placeholder = [0, 1];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={450} />
    </Stack>
  );

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" my={3}>
          TRENDING
        </Typography>
        <PaginationItem
          type="next"
          onClick={() =>
            setCurrentPage((prev) =>
              prev * itemsPerPage >= trendingList.length ? 1 : prev + 1
            )
          }
        />
      </Stack>
      <Divider />
      <Grid container justifyContent="center" spacing={3} mt={2}>
        {loadingTrending
          ? placeholder.map((_, index) => (
              <Grid key={index} item xs={12} md={6}>
                {detailSkeleton}
              </Grid>
            ))
          : getDisplayedItems().map((item) => (
              <Grid key={item.id} item xs={12} md={6}>
                <div className="trending-card"> {/* Div bọc thẻ trending */}
                  <MCard item={item} />
                </div>
              </Grid>
            ))}
      </Grid>
    </>
  );
}

export default TrendingCardGroup;
