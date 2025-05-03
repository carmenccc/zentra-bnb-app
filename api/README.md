# Zentrabnb Backend API DOC

--

## Listing

### Routes

**BASE: /listings**
**GET**/
**GET**/:id
**GET**/:id/detail
**POST**/
-- addListing
|Request Body|Response Data|
|------------|-------------|
|{listing: Listing, listingDetail: ListingDetail}|listing: Listing
**put**/:id
**delete**/:id
