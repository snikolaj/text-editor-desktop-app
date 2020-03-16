class Part:
    item = ""
    price = ""
    link = ""
    location = ""
    def __init__(self, item, price, link, location):
        self.item = item
        self.price = price
        self.link = link
        self.location = location
    def __str__(self):
        return self.item + " " + self.price + " " + self.link + " " + self.location + '\n'