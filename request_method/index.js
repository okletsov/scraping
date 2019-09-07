const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const { Parser } = require('json2csv');
const request = require('request');

const URLS = [
    { 
        url: 'https://www.imdb.com/title/tt0102926/?ref_=nv_sr_2?ref_=nv_sr_2',
        id: 'the_silence_of_the_lambs' 
    },
    { 
        url: 'https://www.imdb.com/title/tt2267998/?ref_=nv_sr_1?ref_=nv_sr_1',
        id: 'gone_girl'    
    }
]; 

(async() => {

    let moviesData = [];

    for(movie of URLS) {
        const response = await requestPromise(
            {
                uri: movie.url,
                headers: {
                    'authority': 'www.imdb.com',
                    'method': 'GET',
                    'path': '/title/tt0102926/?ref_=nv_sr_2?ref_=nv_sr_2',
                    'scheme': 'https',
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                    'accept-encoding': 'gzip, deflate, br',
                    'accept-language': 'en-US,en;q=0.9,ru;q=0.8,uk;q=0.7',
                    'cache-control': 'max-age=0',
                    'referer': 'https://www.imdb.com/',
                    'upgrade-insecure-requests': '1',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
                },
                gzip: true
            }
        );
        let $ = cheerio.load(response);
    
        let title = $('div[class="title_wrapper"] > h1').text().trim();
        let rating = $('span[itemprop="ratingValue"]').text();
        let poster = $(".poster a img").attr('src');
        let popularity = $('#title-overview-widget > div.plot_summary_wrapper > div.titleReviewBar > div:nth-child(5) > div.titleReviewBarSubItem > div:nth-child(2) > span').text().trim();
        let totalRatings = $('.imdbRating [itemprop="ratingCount"]').text();
        let releaseDate = $('.title_wrapper [title="See more release dates"]').text().trim();
        
        let genres = [];
        $(".title_wrapper [href*='genres']").each((i, elm) => {
           let genre = $(elm).text();
           genres.push(genre);
        });
        
        moviesData.push({
            title,
            rating,
            poster,
            totalRatings,
            releaseDate,
            genres
        });

        let file = fs.createWriteStream(`${movie.id}.jpg`);

        await new Promise((resolve, reject) => { 
            let stram = request({
                uri: poster,
                headers: {
                    'authority': 'www.imdb.com',
                        'method': 'GET',
                        'path': '/title/tt0102926/?ref_=nv_sr_2?ref_=nv_sr_2',
                        'scheme': 'https',
                        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                        'accept-encoding': 'gzip, deflate, br',
                        'accept-language': 'en-US,en;q=0.9,ru;q=0.8,uk;q=0.7',
                        'cache-control': 'max-age=0',
                        'referer': 'https://www.imdb.com/',
                        'upgrade-insecure-requests': '1',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
                },
                gzip: true
            })
            .pipe(file)
            .on('finish', () => {
                console.log(`${movie.id} finished downloading the image`);
                resolve();
            }).on('error', (error) => {
                reject(error);
            })
        })
        .catch(error => {
            console.log(`${movie.id} has an error on download. ${error}`);
        })

    }

    const fields = ['title', 'rating']; // can remove this line if want to include all params into csv
    const json2csvParser = new Parser({ fields }); // can remove {fields} if want to include all params into csv 
    const csv = json2csvParser.parse(moviesData);

    // fs.writeFileSync('./data.csv', csv, 'utf-8');
    // console.log(csv);

})();