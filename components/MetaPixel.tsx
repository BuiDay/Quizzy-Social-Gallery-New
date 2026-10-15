
"use client";

import Script from "next/script";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";

const PIXEL_ID = "1485433610061983";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

function PageViewTracker({
  ready,
}: {
  ready: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPage = useRef<string | null>(null);
  const query = searchParams.toString();

  useEffect(() => {
    if (!ready || !window.fbq) return;

    const page = `${pathname}?${query}`;

    if (previousPage.current === page) return;

    previousPage.current = page;
    window.fbq("track", "PageView");
  }, [ready, pathname, query]);

  return null;
}

export default function MetaPixel() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      >
        {`
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;
            n=f.fbq=function(){
              n.callMethod
                ? n.callMethod.apply(n,arguments)
                : n.queue.push(arguments)
            };
            if(!f._fbq)f._fbq=n;
            n.push=n;
            n.loaded=!0;
            n.version='2.0';
            n.queue=[];
            t=b.createElement(e);
            t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          }(
            window,
            document,
            'script',
            'https://connect.facebook.net/en_US/fbevents.js'
          );

          fbq('init', '${PIXEL_ID}');
        `}
      </Script>

      <Suspense fallback={null}>
        <PageViewTracker ready={ready} />
      </Suspense>
    </>
  );
}
