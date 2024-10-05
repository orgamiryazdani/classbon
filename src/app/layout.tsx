import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      dir='rtl'>
      <body>
        <header className='w-full bg-slate-500'>header</header>
        <div className='flex-1 flex'>{children}</div>
        <footer className='w-full bg-slate-500'>footer</footer>
      </body>
    </html>
  );
}
