import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  it("Input renders", () => {
    render(<Input placeholder="What needs to be done?" />);
    expect(
      screen.getByPlaceholderText(/What needs to be done?/)
    ).toBeInTheDocument();
  });
});
