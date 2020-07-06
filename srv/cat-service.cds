using my.bookshop as my from '../db/data-model';

service CatalogService {
    entity Books @readonly as projection on my.Books;
    entity Authors @readonly as projection on my.Authors;
    entity Orders @insertonly as projection on my.Orders;
}

/*
using { Country, managed  } from '@sap/cds/common';

service CatalogService {
    entity Books {
        key ID  :   Integer;
        title   :   localized String;
        author  :   Association to Authors;
        stock   :   Integer;
    }

    entity Authors {
        key ID  : Integer;
        title   : String;
        books   : Association to many Books on books.author = $self;
    }

    entity Orders : managed {
        key ID    : UUID;
        book      : Association to Books;
        country   : Country;
        amount    : Integer; 
    }
        
}
*/