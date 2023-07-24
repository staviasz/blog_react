/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Post } from '.';
import { postCardMock } from '../PostCard/postMock';

const props = postCardMock.posts;

export {};
describe('<Post/>', () => {
  it('should render posts', () => {
    render(<Post posts={props} />);
    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);
    expect(screen.getByRole('img', { name: /title 3/i })).toHaveAttribute('src', 'img/img3.png');
  });

  it('should not render posts', () => {
    render(<Post posts={[]} />);
    expect(screen.queryByRole('heading', { name: /title/i })).not.toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<Post posts={props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
