import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from './BugForm';

test('submits form when title provided', async () => {
  const onCreate = jest.fn().mockResolvedValue({});
  render(<BugForm onCreate={onCreate} />);
  fireEvent.change(screen.getByPlaceholderText(/title/i), { target: { value: 'Bug 1' }});
  fireEvent.click(screen.getByText(/report bug/i));
  expect(onCreate).toHaveBeenCalled();
});
