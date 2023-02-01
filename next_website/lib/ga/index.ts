declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

export const emitEvent = (params: { to: any; callback: () => void }) => {
  const { to, callback } = params;

  window.gtag('event', 'conversion', {
    send_to: to,
    event_callback: callback,
  });
};

export const pageview = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as any, {
    page_path: url,
  });
};
