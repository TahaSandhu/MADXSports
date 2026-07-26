import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Pagination,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Stack,
  Breadcrumbs,
  List,
  ListItemButton,
  ListItemText,
  Link as MuiLink,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ProductCard from "./ProductCard";
import { Product } from "@/hooks/types";
import { useProductsApi } from "@/hooks/useProduct";
import Loader from "@/components/common/Loader";
import { CATEGORIES_DATA } from "@/core/constants";
import { useRouter } from "next/router";

const PRODUCTS_PER_PAGE = 9;

interface ProductListProps {
  slug?: string[];
  filter?: string;
  search?: string;
  isShopPage?: boolean;
}

// Category matcher helper function
function getCategoryMatchFn(slug: string[], queryFilter?: string) {
  if (!slug || slug.length === 0 || (slug.length === 1 && slug[0].toLowerCase() === "shop")) {
    return () => true;
  }

  const [parentSlug, childSlug] = slug;
  const parentUrl = `/${parentSlug}`;
  const fullSlugUrl = childSlug ? `/${parentSlug}/${childSlug}` : parentUrl;

  const parentCategory = CATEGORIES_DATA.find(
    (cat) => cat.url?.toLowerCase() === parentUrl.toLowerCase() || cat.name.toLowerCase() === parentSlug.toLowerCase()
  );

  if (!parentCategory) {
    return (product: any) => {
      const pCat = product.category?.toLowerCase() || "";
      return pCat === parentSlug.toLowerCase();
    };
  }

  const targetCategories = new Set<string>();

  if (queryFilter) {
    targetCategories.add(queryFilter.toLowerCase());
  } else if (childSlug) {
    if (parentCategory.sections) {
      const section = parentCategory.sections.find(
        (sec) => sec.url?.toLowerCase() === fullSlugUrl.toLowerCase() || sec.title.toLowerCase() === childSlug.replace(/-/g, " ").toLowerCase()
      );
      if (section) {
        targetCategories.add(section.title.toLowerCase());
        section.items.forEach((item) => {
          if (item.toLowerCase() !== "view all") {
            targetCategories.add(item.toLowerCase());
          }
        });
      }
    }
  } else {
    targetCategories.add(parentCategory.name.toLowerCase());
    if (parentCategory.sections) {
      parentCategory.sections.forEach((sec) => {
        targetCategories.add(sec.title.toLowerCase());
        sec.items.forEach((item) => {
          if (item.toLowerCase() !== "view all") {
            targetCategories.add(item.toLowerCase());
          }
        });
      });
    }
    if (parentCategory.items) {
      parentCategory.items.forEach((item) => {
        targetCategories.add(item.toLowerCase());
      });
    }
  }

  return (product: any) => {
    const pCat = product.category?.toLowerCase() || "";
    return targetCategories.has(pCat) || pCat === parentCategory.name.toLowerCase();
  };
}

const ProductList: React.FC<ProductListProps> = ({ slug = [], filter = "", search = "", isShopPage = false }) => {
  const { getProducts } = useProductsApi();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filters State
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Fetch products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Sync page when slug/filters change
  useEffect(() => {
    setPage(1);
  }, [slug, filter, search, priceRange, sortBy]);

  // Determine active accordion expansion state
  const activeParentName = useMemo(() => {
    if (!slug || slug.length === 0) return "";
    const parentSlug = slug[0];
    const match = CATEGORIES_DATA.find(
      (c) => c.name.toLowerCase() === parentSlug.toLowerCase() || c.url === `/${parentSlug}`
    );
    return match ? match.name : "";
  }, [slug]);

  // Category matching
  const categoryMatch = useMemo(() => getCategoryMatchFn(slug, filter), [slug, filter]);

  // Apply all filters and sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    result = result.filter(categoryMatch);

    // 2. Price Filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 3. Search Filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // 4. Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }

    return result;
  }, [products, categoryMatch, priceRange, search, sortBy]);

  // Pagination Logic
  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Filter handlers
  const handlePriceChange = (_: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPriceRange([val, priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPriceRange([priceRange[0], val]);
  };

  const handleClearFilters = () => {
    setPriceRange([0, 500]);
    setSortBy("featured");
    router.push("/shop");
  };

  const handleClearCategoryFilter = () => {
    router.push("/shop");
  };

  const handleClearSearchFilter = () => {
    const { search: _, ...newQuery } = router.query;
    router.push({ pathname: router.pathname, query: newQuery });
  };

  // Breadcrumbs title helper
  const breadcrumbItems = useMemo(() => {
    const items = [{ name: "Home", url: "/" }];
    if (isShopPage || (slug.length === 1 && slug[0].toLowerCase() === "shop")) {
      items.push({ name: "Shop", url: "/shop" });
    } else if (slug.length > 0) {
      items.push({ name: "Shop", url: "/shop" });
      const parentName = activeParentName || slug[0];
      items.push({ name: parentName, url: `/${slug[0]}` });
      if (slug[1]) {
        const childName = slug[1].replace(/-/g, " ");
        items.push({ name: childName, url: `/${slug[0]}/${slug[1]}` });
      }
    }
    return items;
  }, [slug, isShopPage, activeParentName]);

  return (
    <Box sx={{ py: isShopPage ? 4 : 8, bgcolor: "background.default", color: "text.primary" }}>
      <Container maxWidth="xl">
        {/* Render Breadcrumbs only if we are on a listing sub-page */}
        {slug.length > 0 && (
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" sx={{ color: "rgba(255,255,255,0.3)" }} />}
            sx={{ mb: 4, color: "text.secondary" }}
          >
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              return isLast ? (
                <Typography key={item.name} color="primary" sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
                  {item.name}
                </Typography>
              ) : (
                <MuiLink
                  key={item.name}
                  onClick={() => router.push(item.url)}
                  sx={{
                    color: "text.secondary",
                    cursor: "pointer",
                    textDecoration: "none",
                    textTransform: "capitalize",
                    "&:hover": { color: "#ff1744" },
                  }}
                >
                  {item.name}
                </MuiLink>
              );
            })}
          </Breadcrumbs>
        )}

        <Typography variant="h3" sx={{ fontWeight: "black", mb: 6, textAlign: slug.length > 0 ? "left" : "center" }}>
          {slug.length > 0 ? (activeParentName || slug[0]) : "Featured Products"}
        </Typography>

        {loading ? (
          <Loader />
        ) : (
          <Grid container spacing={4}>
            {/* Left Sidebar Filter Section */}
            {slug.length > 0 && (
              <Grid size={{ xs: 12, md: 3 }}>
                <Box
                  sx={{
                    bgcolor: "#0a0a0a",
                    border: "1px solid rgba(255, 23, 68, 0.15)",
                    borderRadius: 4,
                    p: 3,
                    position: "sticky",
                    top: 100,
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
                      Filters
                    </Typography>
                    <Button
                      startIcon={<ClearAllIcon />}
                      size="small"
                      onClick={handleClearFilters}
                      sx={{
                        color: "#ff1744",
                        fontWeight: "bold",
                        "&:hover": { bgcolor: "rgba(255, 23, 68, 0.08)" },
                      }}
                    >
                      Clear
                    </Button>
                  </Box>

                  {/* Categories Accordions */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary", fontWeight: "bold" }}>
                      Categories
                    </Typography>
                    {CATEGORIES_DATA.filter((cat) => cat.name !== "Dashboard" && cat.name !== "Contact").map((category) => {
                      const isExpanded = activeParentName === category.name;
                      return (
                        <Accordion
                          key={category.name}
                          expanded={isExpanded}
                          onChange={() => {
                            if (category.url) router.push(category.url);
                          }}
                          sx={{
                            bgcolor: "transparent",
                            backgroundImage: "none",
                            boxShadow: "none",
                            "&::before": { display: "none" },
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: isExpanded ? "#ff1744" : "text.secondary" }} />}
                            sx={{
                              p: 0,
                              minHeight: 48,
                              "& .MuiAccordionSummary-content": { my: 0 },
                              "&:hover .MuiTypography-root": { color: "#ff1744" },
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: isExpanded ? "bold" : "normal",
                                color: isExpanded ? "#ff1744" : "#fff",
                                fontSize: "0.95rem",
                                transition: "color 0.2s",
                              }}
                            >
                              {category.name}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails sx={{ p: 0, pb: 2, pl: 1 }}>
                            <List disablePadding>
                              {category.sections ? (
                                category.sections.map((section) => {
                                  const isSecActive = slug[1] === section.url?.split("/")[2];
                                  return (
                                    <Box key={section.title} sx={{ mb: 1.5 }}>
                                      <ListItemButton
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (section.url) router.push(section.url);
                                        }}
                                        sx={{
                                          p: 0,
                                          py: 0.5,
                                          "&:hover": { bgcolor: "transparent" },
                                          "&:hover .MuiTypography-root": { color: "#ff1744" },
                                        }}
                                      >
                                        <ListItemText
                                          primary={
                                            <Typography
                                              sx={{
                                                fontSize: "0.85rem",
                                                fontWeight: isSecActive ? "bold" : "medium",
                                                color: isSecActive ? "#ff1744" : "text.secondary",
                                              }}
                                            >
                                              {section.title}
                                            </Typography>
                                          }
                                        />
                                      </ListItemButton>
                                      <Box sx={{ pl: 1.5 }}>
                                        {section.items.map((item) => {
                                          const isItemActive = filter === item;
                                          return (
                                            <ListItemButton
                                              key={item}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                if (section.url) {
                                                  router.push(`${section.url}?filter=${encodeURIComponent(item)}`);
                                                }
                                              }}
                                              sx={{
                                                p: 0,
                                                py: 0.2,
                                                "&:hover": { bgcolor: "transparent" },
                                                "&:hover .MuiTypography-root": { color: "#ff1744" },
                                              }}
                                            >
                                              <ListItemText
                                                primary={
                                                  <Typography
                                                    sx={{
                                                      fontSize: "0.78rem",
                                                      color: isItemActive ? "#ff1744" : "text.secondary",
                                                      fontWeight: isItemActive ? "bold" : "normal",
                                                    }}
                                                  >
                                                    {item}
                                                  </Typography>
                                                }
                                              />
                                            </ListItemButton>
                                          );
                                        })}
                                      </Box>
                                    </Box>
                                  );
                                })
                              ) : category.items ? (
                                category.items.map((item) => {
                                  const isItemActive = filter === item;
                                  return (
                                    <ListItemButton
                                      key={item}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (category.url) {
                                          router.push(`${category.url}?filter=${encodeURIComponent(item)}`);
                                        }
                                      }}
                                      sx={{
                                        p: 0,
                                        py: 0.5,
                                        "&:hover": { bgcolor: "transparent" },
                                        "&:hover .MuiTypography-root": { color: "#ff1744" },
                                      }}
                                    >
                                      <ListItemText
                                        primary={
                                          <Typography
                                            sx={{
                                              fontSize: "0.82rem",
                                              color: isItemActive ? "#ff1744" : "text.secondary",
                                              fontWeight: isItemActive ? "bold" : "normal",
                                            }}
                                          >
                                            {item}
                                          </Typography>
                                        }
                                      />
                                    </ListItemButton>
                                  );
                                })
                              ) : null}
                            </List>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </Box>

                  {/* Price Filter Slider & Inputs */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary", fontWeight: "bold" }}>
                      Price Range
                    </Typography>
                    <Slider
                      value={priceRange}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={500}
                      sx={{
                        color: "#ff1744",
                        "& .MuiSlider-thumb": {
                          bgcolor: "#fff",
                          border: "2px solid #ff1744",
                        },
                      }}
                    />
                    <Box sx={{ display: "flex", gap: 1.5, mt: 1 }}>
                      <TextField
                        label="Min"
                        type="number"
                        size="small"
                        value={priceRange[0]}
                        onChange={handleMinPriceChange}
                        slotProps={{
                          inputLabel: { shrink: true },
                          input: { sx: { color: "#fff", fontSize: "0.85rem" } },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                            "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                          },
                        }}
                      />
                      <TextField
                        label="Max"
                        type="number"
                        size="small"
                        value={priceRange[1]}
                        onChange={handleMaxPriceChange}
                        slotProps={{
                          inputLabel: { shrink: true },
                          input: { sx: { color: "#fff", fontSize: "0.85rem" } },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                            "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )}

            {/* Products Layout List */}
            <Grid size={{ xs: 12, md: slug.length > 0 ? 9 : 12 }}>
              {slug.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 4,
                  }}
                >
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Showing <strong>{filteredProducts.length}</strong> products
                  </Typography>

                  <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel id="sort-label" sx={{ color: "text.secondary" }}>
                      Sort by
                    </InputLabel>
                    <Select
                      labelId="sort-label"
                      value={sortBy}
                      label="Sort by"
                      onChange={(e) => setSortBy(e.target.value)}
                      sx={{
                        color: "#fff",
                        bgcolor: "#0a0a0a",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255,255,255,0.1)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ff1744",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ff1744",
                        },
                      }}
                    >
                      <MenuItem value="featured">Featured</MenuItem>
                      <MenuItem value="price-low">Price: Low to High</MenuItem>
                      <MenuItem value="price-high">Price: High to Low</MenuItem>
                      <MenuItem value="rating">Top Rated</MenuItem>
                      <MenuItem value="newest">New Arrivals</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}

              {/* Active Filter Chips */}
              {slug.length > 0 && (filter || search || priceRange[0] > 0 || priceRange[1] < 500) && (
                <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: "wrap", gap: 1 }}>
                  {filter && (
                    <Chip
                      label={`Subcategory: ${filter}`}
                      onDelete={handleClearCategoryFilter}
                      color="primary"
                      sx={{ bgcolor: "#ff1744" }}
                    />
                  )}
                  {search && (
                    <Chip
                      label={`Search: "${search}"`}
                      onDelete={handleClearSearchFilter}
                      color="primary"
                      sx={{ bgcolor: "#ff1744" }}
                    />
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 500) && (
                    <Chip
                      label={`Price: $${priceRange[0]} - $${priceRange[1]}`}
                      onDelete={() => setPriceRange([0, 500])}
                      color="primary"
                      sx={{ bgcolor: "#ff1744" }}
                    />
                  )}
                </Stack>
              )}

              {paginatedProducts.length === 0 ? (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 12,
                    border: "1px dashed rgba(255,255,255,0.1)",
                    borderRadius: 4,
                  }}
                >
                  <Typography variant="h5" color="text.secondary" sx={{ mb: 1, fontWeight: "bold" }}>
                    No Products Found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your filters or search criteria.
                  </Typography>
                </Box>
              ) : (
                <>
                  <Grid container spacing={4}>
                    {paginatedProducts.map((product) => (
                      <Grid key={product._id} size={{ xs: 12, sm: 6, md: slug.length > 0 ? 4 : 4 }} sx={{ display: "flex" }}>
                        <ProductCard product={product} />
                      </Grid>
                    ))}
                  </Grid>

                  {totalPages > 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                        sx={{
                          "& .MuiPaginationItem-root": {
                            color: "#fff",
                            "&.Mui-selected": { bgcolor: "#ff1744" },
                            "&.Mui-selected:hover": { bgcolor: "#d32f2f" },
                          },
                        }}
                      />
                    </Box>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ProductList;
