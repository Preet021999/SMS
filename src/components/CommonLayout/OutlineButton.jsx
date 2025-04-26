import Button from 'react-bootstrap/Button';

function OutlineButton({ variant, onClick,ButtonName }) {
  return (
    <Button variant={`outline-${variant}`} onClick={() => onClick(variant)}>
      {ButtonName}
    </Button>
  );
}

export default OutlineButton;