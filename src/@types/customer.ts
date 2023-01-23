export type ICustomerEdit = {
     customer_id: string;
     customer_name: string,
     short_name: string,
     address: string,
     phone: string,
     price_id:string,
     callback:Function
}

export type ICustomerCreate = {
     price_id:string,
     customer_name: string,
     short_name: string,
     address: string,
     phone: string,
     callback:Function
}


