/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '.';

export {};
describe('<Input/>', () => {
  it('should have a value of searchValue', () => {
    render(<Input handleChange={() => {}} searchValue={'testing'} />);
    const input: HTMLInputElement = screen.getByPlaceholderText(/search/i);
    expect(input.value).toBe('testing');
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    const value = 'The Value';
    render(<Input handleChange={fn} searchValue={value} />);
    const input: HTMLInputElement = screen.getByPlaceholderText(/search/i);
    userEvent.type(input, value);
    expect(input.value).toBe(value);
    expect(fn).toBeCalledTimes(value.length);
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Input handleChange={fn} searchValue="" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
