import requests
from bs4 import BeautifulSoup
import re
import cyrtolat as ctl

def p3():
    def htmldelete(string, index):
        string = string.split('>')[1]
        string = string.split('<')[0]
        newstr = ""
        for i in range(len(string) - index):
            newstr += string[i + index]
        return newstr
        
    def eurtomkd(string):
        string = string.replace(".", "")
        if "МКД" not in string:
            string = string.replace(" ЕУР", "")
            string = string.replace(" ", "")
            try:
                string = str(int(string) * 60) + " МКД"
            except:
                string = "No Price"
            return string
        else:
            return string

    def gethref(string):
        try:
            return re.findall(r'"(.*?)"', string)[1]
        except:
            return ""

    def getcity(string):
        try:
            return string.split("/")[4]
        except:
            return ""

    
    URL = "https://www.pazar3.mk/oglasi/elektronika/delovi-za-kompjuteri-dodatoci/se-prodava"

    page = requests.get(URL)

    soup = BeautifulSoup(page.content, "html.parser")

    items = soup.find_all(class_="Link_vis")
    prices = soup.find_all(class_="list-price")
    links = soup.find_all("a", class_="Link_vis", href=True)


    for i in range(len(prices)):
        string = str(items[i])
        string = htmldelete(string, 0)
        item = string

        string = str(prices[i])
        string = htmldelete(string, 1)
        string = eurtomkd(string)
        string = string.replace('\n', '')
        price = string

        string = str(links[i])
        string = gethref(string)
        link = "pazar3.mk" + string

        string = getcity(string)
        string = string.capitalize()
        location = string
        
        print(ctl.cyrtolat(item) + "\n" + ctl.cyrtolat(price) + "\n" + ctl.cyrtolat(link) + "\n" + ctl.cyrtolat(location))

p3()