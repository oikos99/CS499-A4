# CS499-A4
Data Monitor Dashboard using ElasticSearch and Kibana



###  URL to the Kibana service containing the saved dashboard
https://search-cs499-a4-adxr6e5ugxnnovarprdnbyhcjy.us-west-2.es.amazonaws.com/_plugin/kibana/
 
 
 
 
 

For the dataset, I used CoinDesk's API to retrive the lattest Bitcoin price.  Their API returns the information in JSON as follows:
http://api.coindesk.com/v1/bpi/currentprice.json

```sh
{
   "time":{
      "updated":"Mar 9, 2017 21:38:00 UTC",
      "updatedISO":"2017-03-09T21:38:00+00:00",
      "updateduk":"Mar 9, 2017 at 21:38 GMT"
   },
   "disclaimer":"This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
   "bpi":{
      "USD":{
         "code":"USD",
         "symbol":"&#36;",
         "rate":"1,201.2150",
         "description":"United States Dollar",
         "rate_float":1201.215
      },
      "GBP":{
         "code":"GBP",
         "symbol":"&pound;",
         "rate":"987.0047",
         "description":"British Pound Sterling",
         "rate_float":987.0047
      },
      "EUR":{
         "code":"EUR",
         "symbol":"&euro;",
         "rate":"1,135.1302",
         "description":"Euro",
         "rate_float":1135.1302
      }
   }
}
```
-----------------

Using Node.js, I pull the above data every 60 seconds and insert the data to AWS's ElasticSearch (see [a4.js](https://github.com/oikos99/CS499-A4/blob/master/a4.js)).

###  Deployed and running on EC2 to keep pulling and sending the data to ElasticSearch

![](/ec2_demo1.png)

![](/ec2_demo2.png)

![](/ec2_demo3.png)

###  Data count of indices as they are inserted to AWS ElasticSearch

![](/aws_dashboard.png)

###  Corrsponding structure shown on Kibana

![](/kibana_index.png)

###  Data plotted as "Bitcoin Price (in USD) v.s Time" (on left).  On right is all three currencies USD, GBP, and EUR.

![](/kibana_dashboard.png)

###  Data accumulated over ~15 minutes is consistent with live Bitcoin price through another platform.

![](/coindesk_verify.png)







