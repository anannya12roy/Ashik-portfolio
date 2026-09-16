import './globals.css';

export const metadata = {
  title: 'Md. Ashikur Rahman — Digital Marketing & E-Commerce Expert',
  description:
    'Team Lead with 6+ years driving e-commerce growth, digital marketing campaigns, social media, CRM and retail operations for leading brands in Bangladesh.',
  openGraph: {
    title: 'Md. Ashikur Rahman — Digital Marketing & E-Commerce Expert',
    description: '6+ years driving e-commerce growth & digital marketing for leading brands.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function purgeNetlifyBadge() {
                  var frames = document.querySelectorAll('iframe[id*="nl-"], #nl-badge-frame, iframe[src*="about:srcdoc"]');
                  frames.forEach(function(f) {
                    if (f && f.parentNode) {
                      f.parentNode.removeChild(f);
                    }
                  });
                }
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', purgeNetlifyBadge);
                } else {
                  purgeNetlifyBadge();
                }
                var interval = setInterval(purgeNetlifyBadge, 150);
                setTimeout(function() { clearInterval(interval); }, 15000);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#0a0c10] text-[#f0f2f5] antialiased selection:bg-[#d4af37] selection:text-[#0a0c10]">
        {children}
      </body>
    </html>
  );
}
