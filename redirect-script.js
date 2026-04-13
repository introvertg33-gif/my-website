// Automatic Redirection Script for Old Domains
// Place this script in the HTML of your old websites

(function() {
    // Old domains to redirect from
    const OLD_DOMAINS = [
        'introvert-graphics.pages.dev',
        'introvert-graphic.netlify.app'
    ];
    
    // New website URL
    const NEW_WEBSITE = 'https://introvert-graphic.pages.dev';
    
    // Check if current hostname matches old domains
    if (OLD_DOMAINS.includes(window.location.hostname)) {
        // Redirect to new website
        window.location.replace(NEW_WEBSITE);
    }
})();
