import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ActorDetail from "./ActorDetail";

test("renders actor detail and handles close", () => {
	const actor = {
		name: "Luke Skywalker",
		height: "172",
		birth_year: "19BBY",
		gender: "male",
	};
	const handleClose = jest.fn();

	render(<ActorDetail actor={actor} onClose={handleClose} />);

	expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
	expect(
		screen.getByText(
			(content, element) =>
				content.startsWith("Height:") &&
				element.tagName.toLowerCase() === "font"
		)
	).toBeInTheDocument();
	expect(screen.getByText("172")).toBeInTheDocument();
	expect(
		screen.getByText(
			(content, element) =>
				content.startsWith("Birth Year:") &&
				element.tagName.toLowerCase() === "font"
		)
	).toBeInTheDocument();
	expect(screen.getByText("19BBY")).toBeInTheDocument();
	expect(
		screen.getByText(
			(content, element) =>
				content.startsWith("Gender:") &&
				element.tagName.toLowerCase() === "font"
		)
	).toBeInTheDocument();
	expect(screen.getByText("male")).toBeInTheDocument();

	fireEvent.click(screen.getByText(/close/i));
	expect(handleClose).toHaveBeenCalledTimes(1);
});
