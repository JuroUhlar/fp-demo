import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          id="amplitude-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[],_iq:{}};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var n=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,r){return function(n){e._q.push({name:t,args:Array.prototype.slice.call(r,0),resolve:n})}},o=function(e,t,r){e[t]=function(){if(r)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))}}},i=function(e){for(var t=0;t<g.length;t++)o(e,g[t],!1);for(var r=0;r<h.length;r++)o(e,h[r],!0)};r.invoked=!0;var u=t.createElement("script");u.type="text/javascript",u.integrity="sha384-QhN12IHEJCDzzlNZ/ugu3iCq5jVI1saLR0QXlVfubYxdHb8NhKqgMhr9KeruyviR",u.crossOrigin="anonymous",u.async=!0,u.src="https://cdn.amplitude.com/libs/analytics-browser-2.2.3-min.js.gz",u.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var a=t.getElementsByTagName("script")[0];a.parentNode.insertBefore(u,a);for(var c=function(){return this._q=[],this},l=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],p=0;p<l.length;p++)n(c,l[p]);r.Identify=c;for(var d=function(){return this._q=[],this},f=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],v=0;v<f.length;v++)n(d,f[v]);r.Revenue=d;var g=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],h=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];i(r),r.createInstance=function(e){return r._iq[e]={_q:[]},i(r._iq[e]),r._iq[e]},e.amplitude=r}}(window,document)}();
            amplitude.init("51f5ace86526a59400e9fd5d039a0016", { defaultTracking: true });
          `,
          }}
        />
      </body>
    </Html>
  );
}
