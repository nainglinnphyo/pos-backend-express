export type ICustomerEdit = {
     customer_id: string;
     customer_name: string,
     short_name: string,
     address: string,
     phone: string,
     callback:Function
}

export type ICustomerCreate = {
     customer_name: string,
     short_name: string,
     address: string,
     phone: string,
     callback:Function
}