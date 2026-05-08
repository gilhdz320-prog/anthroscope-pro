import { useEffect, useRef } from 'react';

// Config: URL where the functional app lives
// When you buy anthroscope.pro, change this to "https://app.anthroscope.pro"
const APP_URL = "https://funny-meerkat-b4fe6a.netlify.app";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('./landing.html')
      .then(r => r.text())
      .then(html => {
        if (!containerRef.current) return;
        
        // Replace Netlify URL with current app URL in the HTML before injecting
        const processedHtml = html.replace(
          /https:\/\/funny-meerkat-b4fe6a\.netlify\.app/g,
          APP_URL
        );
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(processedHtml, 'text/html');
        
        // Move styles
        const styles = doc.querySelectorAll('style');
        styles.forEach(s => containerRef.current!.appendChild(s.cloneNode(true)));
        
        // Inject body content
        const wrapper = document.createElement('div');
        wrapper.innerHTML = doc.body.innerHTML;
        containerRef.current.appendChild(wrapper);
        
        // Execute scripts (for FAQ, cursor, scroll reveal, i18n)
        const scripts = wrapper.querySelectorAll('script');
        scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
          newScript.textContent = oldScript.textContent;
          oldScript.parentNode?.replaceChild(newScript, oldScript);
        });
      });
      
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} style={{ margin: 0, padding: 0 }} />;
}
