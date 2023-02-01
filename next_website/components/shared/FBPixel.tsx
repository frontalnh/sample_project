import Image from "next/image";
import Script from "next/script";

export default function FBPixel(props: { pixelId: string; domainVerificationContent: string }) {
  const { pixelId, domainVerificationContent } = props

  return <>
    <Script id='facebook-pixel' strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `}
    </Script>
    <meta name="facebook-domain-verification" content={domainVerificationContent} />
  </>
}