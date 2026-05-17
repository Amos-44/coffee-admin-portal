import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminPortal from "../components/AdminPortal";
import { BrowserRouter } from "react-router-dom";
import { vi, beforeEach } from "vitest";

beforeEach(() => {
  vi.restoreAllMocks();
});

vi.mock("../hooks/useFetch", () => ({
  default: () => ({
    data: [
      { id: 1, name: "Latte", description: "Nice", origin: "Kenya", price: 5 }
    ],
    refetch: vi.fn()
  })
}));

global.fetch = vi.fn();
window.confirm = vi.fn(() => true);

const renderComponent = () =>
  render(<BrowserRouter><AdminPortal /></BrowserRouter>);

test("renders products", () => {
  renderComponent();
  expect(screen.getByText("Latte")).toBeInTheDocument();
});

test("shows validation errors", async () => {
  renderComponent();

  fireEvent.click(screen.getByText("ADD"));

  expect(await screen.findByText("Coffee name is required")).toBeInTheDocument();
});

test("submits POST request", async () => {
  fetch.mockResolvedValueOnce({ ok: true });

  renderComponent();

  fireEvent.change(screen.getByLabelText("Coffee Name"), { target: { value: "Espresso" } });
  fireEvent.change(screen.getByLabelText("Description"), { target: { value: "Strong" } });
  fireEvent.change(screen.getByLabelText("Origin"), { target: { value: "Ethiopia" } });
  fireEvent.change(screen.getByLabelText("Price ($)"), { target: { value: "10" } });

  fireEvent.click(screen.getByText("ADD"));

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/coffee"),
      expect.objectContaining({ method: "POST" })
    );
  });
});

test("deletes product", async () => {
  fetch.mockResolvedValueOnce({ ok: true });

  renderComponent();

  fireEvent.click(screen.getByText("Delete"));

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/coffee/1"),
      { method: "DELETE" }
    );
  });
});