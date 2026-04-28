import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
  Chip,
  TablePagination,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { useOrdersApi } from "@/hooks/checkout";
import { DELIVERY_OPTIONS, Order } from "./types";

const OrderRow = ({
  order,
  onStatusChange,
}: {
  order: Order;
  onStatusChange: (id: string, status: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        <TableCell>{order.firstName} {order.lastName}</TableCell>
        <TableCell>{order.email}</TableCell>
        <TableCell>${order.total}</TableCell>

        <TableCell>
          <Chip
            label={order.paymentStatus}
            color={order.paymentStatus === "succeeded" ? "success" : "warning"}
            size="small"
          />
        </TableCell>

        <TableCell>
          <Select
            size="small"
            value={order.deliveryStatus}
            onChange={(e) =>
              onStatusChange(order._id, e.target.value)
            }
          >
            {DELIVERY_OPTIONS.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </TableCell>
      </TableRow>

      {/* Expand Row */}
      <TableRow>
        <TableCell colSpan={6} sx={{ p: 0 }}>
          <Collapse in={open}>
            <Box sx={{ m: 2 }}>
              <Typography variant="h6">Order Details</Typography>

              <Typography variant="subtitle2">Phone</Typography>
              <Typography>{order.phone}</Typography>

              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                Address
              </Typography>
              <Typography>
                {order.address}, {order.city}, {order.state},{" "}
                {order.country}
              </Typography>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Pricing
              </Typography>
              <Typography>Subtotal: ${order.subtotal}</Typography>
              <Typography>Tax: ${order.tax}</Typography>
              <Typography>Total: ${order.total}</Typography>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Items
              </Typography>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {order.items.map((item: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{item.name || "N/A"}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Typography variant="caption" sx={{ mt: 2 }}>
                Created:{" "}
                {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const OrderTable = () => {
  const { getAllOrders, updateDeliveryStatus, loading, error } =
    useOrdersApi();

  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateDeliveryStatus(id, status);

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, deliveryStatus: status } : o
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Delivery</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  onStatusChange={handleStatusChange}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
};

export default OrderTable;