import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import mockData from "./mockData.json";
// import { act } from 'react-dom/test-utils';

beforeEach(() => {
	jest.spyOn(global, "fetch").mockResolvedValue({
		json: jest.fn().mockResolvedValue(mockData),
	});
});

afterEach(() => {
	jest.restoreAllMocks();
});

test("renders list of actors", async () => {
	render(<App />);

	for (const actor of mockData.results) {
		const actorNames = await screen.findAllByText(actor.name);
		expect(actorNames.length).toBeGreaterThan(0);

		const heightLabels = await screen.findAllByText(
			(content, element) =>
				content.startsWith("Height:") &&
				element.tagName.toLowerCase() === "font"
		);
		expect(heightLabels.length).toBeGreaterThan(0);

		const heightValues = await screen.findAllByText(actor.height);
		expect(heightValues.length).toBeGreaterThan(0);

		const birthYearLabels = await screen.findAllByText(
			(content, element) =>
				content.startsWith("Birth Year:") &&
				element.tagName.toLowerCase() === "font"
		);
		expect(birthYearLabels.length).toBeGreaterThan(0);

		const birthYearValues = await screen.findAllByText(actor.birth_year);
		expect(birthYearValues.length).toBeGreaterThan(0);
	}
});

test('renders actor detail view on clicking "Detail" button', async () => {
	// Render the App component
	render(<App />);

	const detailButton = await screen.findAllByText(/detail/i);
	fireEvent.click(detailButton[0]);

	const heightElements = await screen.findAllByText(
		(content, element) =>
			content.startsWith("Height:") && element.tagName.toLowerCase() === "font"
	);
	expect(heightElements.length).toBeGreaterThan(0);

	const heightValues = await screen.findAllByText("172");
	expect(heightValues.length).toBeGreaterThan(0);

	const birthYearLabels = await screen.findAllByText(
		(content, element) =>
			content.startsWith("Birth Year:") &&
			element.tagName.toLowerCase() === "font"
	);
	expect(birthYearLabels.length).toBeGreaterThan(0);

	const birthYearValues = await screen.findAllByText("19BBY");
	expect(birthYearValues.length).toBeGreaterThan(0);

	const genderLabels = await screen.findAllByText(
		(content, element) =>
			content.startsWith("Gender:") && element.tagName.toLowerCase() === "font"
	);
	expect(genderLabels.length).toBeGreaterThan(0);

	const genderValues = await screen.findAllByText("male");
	expect(genderValues.length).toBeGreaterThan(0);
});
