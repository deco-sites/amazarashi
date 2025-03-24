interface BackButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function BackButton({ children, className }: BackButtonProps) {
  const goBack = () => {
    history.back();
  };

  return (
    <>
      <a class={className} onClick={goBack}>
        {children}
      </a>
    </>
  );
}
