import puppeteer from "puppeteer-core";
import { executablePath } from "puppeteer-core";

const scrape = async () => {
    const browser = await puppeteer.launch({
        // executablePath: executablePath(),
        // headless: false,
        channel: "chrome",
    });
    const page = await browser.newPage();

    const url = "https://books.toscrape.com/";

    await page.goto(url);

    const bookElements = await page.evaluate(() => {
        const books = document.querySelectorAll(".product_pod");
        const bookList = [];

        books.forEach((book) => {
            const title = book.querySelector("h3 > a").title;
            const price = book.querySelector(".price_color").textContent;
            const rating = book.querySelector(".star-rating").classList[1];

            bookList.push({
                title,
                price,
                rating,
            });
        });

        return bookList;
    })

    console.log(bookElements)
    await browser.close();
}

scrape();