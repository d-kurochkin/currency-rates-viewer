# Setup

```bash
mkvirtualenv flask
pip install -r requirments.txt
npm i
bower install
```

# Run (required Python 2.7)

`python app.py`

# ToDO

Required:

* [x] Retrieving data from API
* [x] Retrieving data from server
* [x] Add unit tests
* [x] Add caching

Optional:

* [x] Improve validation
* [x] Add styles
* [x] Add logging


# Resources

* [YQL](https://developer.yahoo.com/yql/console/?q=show%20tables&env=store://datatables.org/alltableswithkeys#h=select+*+from+yahoo.finance.xchange+where+pair+in+(%22USDEUR%22))
