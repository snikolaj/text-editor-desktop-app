import requests
from bs4 import BeautifulSoup
import part
import cyrtolat as ctl

def r5():
    def htmldelete(string, index): # index is to remove empty space in the beginning, can be improved
        string = string.split('>')[1]
        string = string.split('<')[0]
        newstr = ""
        for i in range(len(string) - index):
            newstr += string[i + index]
        return newstr
        
    def eurtomkd(string):
        if "По Договор" in string:
            return "По Договор"
        string = string.replace(".", "")
        if "МКД" not in string:
            string = string.replace(" €", "")
            return str(int(string) * 60) + " МКД"
        else:
            return string

    URL = "http://reklama5.mk/Search?q=&city=&sell=0&sell=1&buy=0&buy=1&trade=0&trade=1&includeOld=0&includeOld=1&includeNew=0&includeNew=1&private=0&company=0&page=1&SortByPrice=0&zz=1&cat=584"

    page = requests.get(URL)

    soup = BeautifulSoup(page.content, "html.parser")

    items = soup.find_all(class_="SearchAdTitle")
    prices = soup.find_all(class_="text-left text-success")
    locations = soup.find_all(class_="clear-margin")
    links = soup.find_all("a", class_="SearchAdTitle", href=True)

    for i in range(len(items)):
        string = str(items[i])
        string = htmldelete(string, 1)
        item = string

        string = str(prices[i])
        string = htmldelete(string, 2)
        string = eurtomkd(string)
        price = string

        link = "reklama5.mk" + links[i].get('href')

        string = str(locations[i])
        string = htmldelete(string, 0)
        string = string.replace("&gt;", ">")
        location = string
        print(ctl.cyrtolat(item) + "\n" + ctl.cyrtolat(price) + "\n" + ctl.cyrtolat(link) + "\n" + ctl.cyrtolat(location))
r5()