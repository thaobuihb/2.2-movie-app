import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MCard from "./MCard";
import Typography from "@mui/material/Typography";
import PaginationItem from "@mui/material/PaginationItem";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import "./TrendingCardGroup.css"; // Import CSS riêng cho trending
import { API_KEY, BASE_URL } from "../api/config";

function TrendingCardGroup() {
  const [trendingList, setTrendingList] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/trending/movie/day?language=en-US&api_key=${API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          setTrendingList(data.results);
          setLoadingTrending(false);
        } else {
          setLoadingTrending(false);
          console.error("Failed to fetch trending movies");
        }
      } catch (error) {
        setLoadingTrending(false);
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrending();
  }, []);

  const getDisplayedItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return trendingList.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      prev * itemsPerPage >= trendingList.length ? 1 : prev + 1
    );
  };

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
        <PaginationItem type="next" onClick={handleNextPage} />
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
                <div className="trending-card">
                  <MCard item={item} />
                </div>
              </Grid>
            ))}
      </Grid>
    </>
  );
}

export default TrendingCardGroup;
