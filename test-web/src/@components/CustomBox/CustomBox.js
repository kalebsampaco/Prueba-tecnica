export default function CustomBox({ children, title }) {
  return (
    <div
      style={{
        borderColor: '#D1E3F5',
      }}
      className="rounded-8 p-24  text-16  border flex flex-col gap-6 "
    >
      {title && <p className="text-primary font-semibold text-base">{title}</p>}
      {children}
    </div>
  );
}
