import Consts from "../lib/consts";

export default function GoogleAnalytics() {
    const trackingCode = Consts.GOOGLE_ANALYTICS_CODE
    return <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingCode}`} />
        <script dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingCode}');
        `}}
        />
    </>
}

