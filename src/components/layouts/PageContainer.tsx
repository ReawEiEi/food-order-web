export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center mt-3 p-2">{children}</div>
  );
}
