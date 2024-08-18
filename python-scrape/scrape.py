import requests
from bs4 import BeautifulSoup
import json

def fetch_books(page_number):
    url = f"http://books.toscrape.com/catalogue/page-{page_number}.html"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    # print(soup.prettify())
    books = []
    book_elements = soup.find_all("article", class_="product_pod")
    for book_element in book_elements:
        book = {
            "title": book_element.h3.a["title"],
            "price": book_element.find("p", class_="price_color").get_text(),
            "rating": book_element.find("p", class_="star-rating")["class"][1]
        }
        books.append(book)
    print(books)

def main():
    fetch_books(1)

if __name__ == "__main__":
    main()