import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Category, Product } from "../../types/dashboard";
import { Box, Button, MenuItem, Select, Toolbar, Typography, FormControl, InputLabel, Divider, Checkbox, OutlinedInput, SelectChangeEvent } from "@mui/material";

const FilterWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    height: "100%",
}));

const FilterContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
}));

interface FilterBarProps {
    categories: Category[];
    selectedCategory: Category | null;
    onChangeCategory: (category: Category | null) => void;
    products: Product[];
    selectedProducts: Product[];
    onSelectSelectedProducts: (products: Product[], runReport: boolean) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
    categories,
    selectedCategory,
    onChangeCategory,
    products,
    selectedProducts,
    onSelectSelectedProducts
}) => {
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
    const handleClickClear = () => {
        onChangeCategory(null)
        onSelectSelectedProducts([], false)
    }

    const handleRunReport = () => {
        if (selectedProductIds.length > 0) {
            const selected = products.filter(pr =>
                selectedProductIds.includes(pr.id.toString())
            );
            onSelectSelectedProducts(selected, true);
        }
    }
    return (
        <div>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Filters</Typography>
                <Button color="secondary" size="small" onClick={handleClickClear}>Clear</Button>
            </Toolbar>

            <Divider />

            <FilterWrapper>

                <FilterContainer>
                    <FormControl fullWidth size="small">
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={selectedCategory?.slug || ""}
                            label="Category"
                            onChange={(e) => {
                                const selected = categories.find((c) => c.slug === e.target.value);
                                if (selected) {
                                    onChangeCategory(selected);
                                    setSelectedProductIds([])
                                    onSelectSelectedProducts(products, false);
                                }
                            }}
                        >
                            {categories.map((c) => (
                                <MenuItem key={c.slug} value={c.slug}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth size="small">
                        <InputLabel id="product-select-label">Products</InputLabel>
                        <Select
                            labelId="product-select-label"
                            id="product-select"
                            multiple
                            value={selectedProductIds}
                            onChange={(event: SelectChangeEvent<string | string[]>) => {
                                const {
                                    target: { value },
                                } = event;
                                setSelectedProductIds(typeof value === 'string' ? value.split(',') : value)
                            }}
                            input={<OutlinedInput label="Products" />}
                            renderValue={(selected) => {
                                const selectedIds = selected as string[];
                                const selectedProductIds = products
                                    .filter(p => selectedIds.includes(p.id.toString()))
                                    .map(p => p.title);
                                return selectedProductIds.join(", ");
                            }}
                            disabled={!selectedCategory}
                        >
                            {products.map((p) => (
                                <MenuItem key={p.id} value={p.id.toString()}>
                                    <Checkbox
                                        checked={selectedProductIds.some(sp => sp === p.id.toString())}
                                    />
                                    {p.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </FilterContainer>

                <Box sx={{ display: "flex" }}>
                    <Button variant="contained" color="primary" size="large" sx={{ width: "100%" }} onClick={handleRunReport} disabled={selectedProductIds.length < 1 || (selectedProducts.length === selectedProductIds.length)}>
                        Run Report
                    </Button>
                </Box>

            </FilterWrapper>

        </div>
    );
};

export default FilterBar;
