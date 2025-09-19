import React, { useMemo } from "react";
import { Box, Toolbar, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Category, Product } from "../../types/dashboard";
import CategoryChart from "./charts/CategoryChart";
import { useDarkMode } from "../../context/DarkModeContext";
import ProductChart from "./charts/ProductChart";

const Content = styled(Box)`
  flex-grow: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const LoadingWrapper = styled(Box)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
`;

interface DashboardContainerProps {
  selectedCategory: Category | null;
  loading: boolean;
  products: Product[];
  categories: Category[];
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({ selectedCategory, loading, products, categories }) => {

  const { darkMode } = useDarkMode();

  // Memoize chart component to prevent unnecessary rerenders
  const chartComponent = useMemo(() => {
    if (selectedCategory && products && products.length > 0) {
      return <ProductChart selectedCategory={selectedCategory} products={products} darkMode={darkMode} />;
    }
    return <CategoryChart categories={categories} darkMode={darkMode} />;
  }, [selectedCategory, products, darkMode, categories]);

  return (
    <Content>
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {loading ?
        <LoadingWrapper>
          <CircularProgress color="primary" size={60} />
        </LoadingWrapper>
        :
        <Box>
          {chartComponent}
        </Box>
      }
    </Content>
  );
};

export default React.memo(DashboardContainer);
