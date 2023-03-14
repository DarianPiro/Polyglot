import { screen, fireEvent } from '@testing-library/react';
import ChatroomsHeader from '../ChatroomsHeader';
import { renderWithProviders } from '../../../test/testUtils';

describe('ChatroomsHeader', () => {
  test('renders component with correct title', () => {
    renderWithProviders(<ChatroomsHeader />);
    expect(screen.getByText(/Chats/i)).toBeInTheDocument();
  });

  test('clicking create new chat button adds a new chat', () => {
    renderWithProviders(<ChatroomsHeader />);
    const createChatButton = screen.getByText(/Create new chat/i);
    fireEvent.click(createChatButton);
    expect(screen.getByText(/Create new chat/i)).toBeInTheDocument();
  });
});
