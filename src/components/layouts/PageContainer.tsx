export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center mt-14 p-2 font-itim">
      {children}
    </div>
  );
}
