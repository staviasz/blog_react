import { ChangeEvent } from 'react';
import './style.css';

interface Props {
  searchValue: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ searchValue, handleChange }: Props) => {
  return <input className="input" onChange={handleChange} type="search" value={searchValue} placeholder="search" />;
};
