import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Keystatic Dashboard',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="beforeInteractive" />
      <div className="keystatic-wrapper">
        {children}
      </div>
    </>
  );
}
