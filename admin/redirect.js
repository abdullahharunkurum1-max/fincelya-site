const destination=new URL('https://fincelya-reading-api.onrender.com/admin');
destination.search=location.search;
destination.hash=location.hash;
location.replace(destination.href);
