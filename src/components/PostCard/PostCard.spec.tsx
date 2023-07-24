import { render, screen } from '@testing-library/react';
import { PostCard } from '.';
import { postCardMock } from './postMock';

const props = postCardMock.posts[0];

export {};
describe('<PostCard />', () => {
  it('Should render PostCard correctly', () => {
    render(<PostCard post={props} />);
    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute('src', props.cover);
    expect(screen.getByRole('heading', { name: props.title + ' ' + props.id })).toBeInTheDocument();
    expect(screen.getByText(props.body)).toBeInTheDocument();
  });

  it('Should match snapshot', () => {
    const { container } = render(<PostCard post={props} />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toMatchSnapshot();
  });
});
