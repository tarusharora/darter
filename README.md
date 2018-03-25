# darter - web scraping utility

**made with love using node using node, phantomjs, and cheerio**


**deployed on AWS using Docker**

Deployed URL
http://13.126.217.83:10010/scrap

POST Call

    Request Body: {

        "productUrl":"http://www.tigerdirect.com/applications/searchtools/item-details.asp?EdpNo=3415697"

    }

    Response : [
        [
            
        {
            "reviewComment": "\n\nNice personal label maker\nNice little inexpensive label maker.  Only one con about this deal is that the AC adapter is NOT included.  That was a little disappointing because it takes 6 AAA batteries if you want to run it without AC.\n\n",
            "reviewerName": "sacses,",
            "reviewDate": "Feb 21, 2013",
            "rating": "4.5"
        },
        .....

    ]


**Some Known Improvements**

**Request Improvements**

1. To add an identifier like 'companyId' to identify the company, of which data needs to be scraped. On the basis of companyId, we can pick the company's website schema configuration.

2. To accept multiple Urls to scrap

**Response Improvements**

    To return an object like this
            {
                "productName": "Calculator",
                "noOfRevies": 10,
                "reviews": [ {
                    ....
                } ]
            }


**Code improvements**
1. To improve recursion logic for continuously scraping the reviews pagewise.

2. To add **logging** and integrate it with ELK or error tracking tools like **Sentry.io**

3. To make scraping configurable on the basis of company by storing schema information in configurable properties. So that a single API can be used for scraping multiple company's pages.

4. To integrate with database in order to save the scraped data in db and use that for analytics.

5. To implement IP spoofing in case a company blocks our IP after some hits.

6. To add authentication API to validate the requests.






