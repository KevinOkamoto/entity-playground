## Configuration

```ts
{
  entities: {
    Requisition: {
      rest-url:'http://ariba/buyer/rest/v1/requisitions/' ,
      rest-ver: 1.1,
      requires-auth: no
    },
    LineItem: {
      rest-url:'http://ariba/buyer/rest/v1/requisitions/:id/lineItems' ,
      rest-ver: 1.1,
      requires-auth: no,
      parent: 'Requisition'
    },
    Supplier: {

    }
  }
}
```
