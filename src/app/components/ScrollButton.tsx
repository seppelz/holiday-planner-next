'use client';

interface ScrollButtonProps {
  className: string;
}

export default function ScrollButton({ className }: ScrollButtonProps) {
  const handleClick = () => {
    document.querySelector('#overview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button className={className} onClick={handleClick}>
      Feiertage erkunden
      <span className="buttonIcon">↓</span>
    </button>
  );
} 