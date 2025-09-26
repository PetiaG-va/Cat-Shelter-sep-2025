import http from 'http';
import fs from 'fs/promises';

const server = http.createServer(async (req, res) => {
    
    switch (req.url) {
        case '/':
            const homeHtml = await homeView();

            res.writeHead(200, {
                'content-type': 'text/html'
            })

            res.write(homeHtml);
            break;

        case '/styles/site.css':
            const siteCss = await fs.readFile('./src/styles/site.css', { encoding: 'utf-8' });

            res.writeHead(200, {
                'content-type': 'text/css'
            });

            res.write(siteCss);
            break;
        case '/cats/add-breed':
            const html = await addBreedView();
            
            res.writeHead(200, {
                'content-type': 'text/html'
            })

            res.write(html);
            break;
        default:
            break;
    }

    res.end();
});

async function homeView() {
    const html = await fs.readFile('./src/views/home/index.html', { encoding: 'utf-8' });
    return html;
};

async function addBreedView() {
    const html = await fs.readFile('./src/views/addBreed.html', {encoding: 'utf-8'});
    return html;
}

server.listen(5000);

console.log("Server is listening on http://localhost:5000...");
