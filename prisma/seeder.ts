// import { PrismaClient } from "@prisma/client";
// import logger from "../src/config/logger";
// const {campaign,prize} = new PrismaClient();
// const load = async () => {
//     await campaign.createMany({
//         data:[
//             { id:'26b8a780-bab5-406f-b590-5a0cab21555b',campaign_name:'campaigns one',image:'https://www.mediatoolkit.com/blog/wp-content/uploads/2021/05/5-steps-to-effective-PR-campaign.png', campaign_type:'product',company_id:'4',created_by:'4'},
//             { id:'3bf10805-744a-41b5-b554-d28f0304adc1',campaign_name:'campaigns two',image:'https://www.mediatoolkit.com/blog/wp-content/uploads/2021/05/5-steps-to-effective-PR-campaign.png', campaign_type:'productless',company_id:'4',created_by:'4'},
//           ],
//     })
//     logger.info('Added Campaign data')

//     await prize.createMany({
//         data:[
//             { 
//                 id: "fb265225-ecbd-41d0-94a8-f7a631d14392",
//                 value: "BMW Car",
//                 quantity: 10,
//                 image: "https://www.bmw.com.sg/content/dam/bmw/common/all-models/3-series/sedan/2021/navigation/bmw-3-series-modellfinder.png",
//                 campaign_id: "26b8a780-bab5-406f-b590-5a0cab21555b",
//                 company_id: "4",
//                 created_by: "4",
                
//             },
//             { 
//                 id: "c4a6fb8e-2f5a-446c-b8a4-1984dfde0ab7",
//                 value: "Toyota Car",
//                 quantity: 5,
//                 image: "https://i.i-sgcm.com/new_cars/cars/12820/12820_m.jpg",
//                 campaign_id: "3bf10805-744a-41b5-b554-d28f0304adc1",
//                 company_id: "4",
//                 created_by: "4",
                
//             },
           
//           ],
//     })
//     console.log("Added prize data");
// }
// load();