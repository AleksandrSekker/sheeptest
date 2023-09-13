interface Props {
  title: string;
  className?: string;
}
const MainTitle = ({ title, className }: Props) => {
  return (
    <h1
      data-testid="main-title"
      className={`text-xl uppercase tracking-widest text-blue-700 dark:text-blue-400 ${className}`}
    >
      {title}
    </h1>
  );
};

export default MainTitle;
