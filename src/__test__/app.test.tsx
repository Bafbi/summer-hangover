import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import GroupsPage from "~/app/app/(main)/page";

test("GroupPage", () => {
  render(<GroupsPage />);
  expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeDefined();
});
