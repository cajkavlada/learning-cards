export default function ProtectedLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div className="container mx-auto flex h-full flex-col md:py-8">
        {children}
      </div>
      {modal}
    </>
  );
}
