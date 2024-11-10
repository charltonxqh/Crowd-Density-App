/**
 * @fileoverview Unit test for the main App component using React Testing Library.
 * Tests if the "learn react" link is rendered correctly in the App component.
 * @author Choo Yi Ken
 */

import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Unit test to check if the "learn react" link is rendered in the App component.
 * This test ensures that the text "learn react" is present in the document when the App component is rendered.
 */
test('renders learn react link', () => {
  // Render the App component
  render(<App />);
  
  // Find the element containing the text "learn react"
  const linkElement = screen.getByText(/learn react/i);
  
  // Assert that the element is in the document
  expect(linkElement).toBeInTheDocument();
});
