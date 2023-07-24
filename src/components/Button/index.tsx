import { MouseEvent } from 'react';
import './style.css';

interface Props {
  text: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

export const Button = ({ text, onClick, disabled = false }: Props) => {
  return (
    <button disabled={disabled} className="btn" onClick={onClick}>
      {text}
    </button>
  );
};
