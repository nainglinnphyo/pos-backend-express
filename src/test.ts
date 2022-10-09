import { PrismaClient } from "@prisma/client";

const { randomDetails } = new PrismaClient();

export const test = async () => {
     const data1 = [
          {
               id: '03289de2-5eed-4586-ac50-c232b6beb706',
               user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
               lucky_draw_option_id: 'lucky_draw_2_id',
               giftcard_on_user_id: '5d026cfc-874c-4816-9893-bba7f1b88e29',
               lucky_status: 'lucky',
               GiftCardOnUser: {
                    id: '5d026cfc-874c-4816-9893-bba7f1b88e29',
                    gift_card_id: 'heineken-bottle-cup-id',
                    user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
                    qrcode_id: null,
                    status: 'pending',
               }
          },
          {
               id: '259f3781-34cc-4352-a64d-9d8efd03abd5',
               user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
               lucky_draw_option_id: 'lucky_draw_2_id',
               giftcard_on_user_id: '8403983e-00e3-44cd-a4e9-cff12bec2633',
               lucky_status: 'lucky',
               GiftCardOnUser: {
                    id: '8403983e-00e3-44cd-a4e9-cff12bec2633',
                    gift_card_id: 'heineken-bottle-cup-id',
                    user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
                    qrcode_id: null,
                    status: 'pending',
               }
          },
          {
               id: '49830a7e-6c93-44a7-b527-6567d2d6d7ec',
               user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
               lucky_draw_option_id: 'lucky_draw_2_id',
               giftcard_on_user_id: '072dbee1-80ca-4eb7-8119-01be16cf139e',
               lucky_status: 'lucky',
               GiftCardOnUser: {
                    id: '072dbee1-80ca-4eb7-8119-01be16cf139e',
                    gift_card_id: 'heineken-bottle-id',
                    user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
                    qrcode_id: null,
                    status: 'pending',
               }
          },
          {
               id: '741c9bf8-4a90-47a5-b165-57d2cffe15ed',
               user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
               lucky_draw_option_id: 'lucky_draw_2_id',
               giftcard_on_user_id: 'c6c14c96-f8c3-4210-9311-b97fa20d3839',
               lucky_status: 'lucky',
               GiftCardOnUser: {
                    id: 'c6c14c96-f8c3-4210-9311-b97fa20d3839',
                    gift_card_id: 'heineken-bottle-cup-id',
                    user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
                    qrcode_id: null,
                    status: 'pending',
               }
          },
          {
               id: '7b2b0706-227a-4083-84b6-ac2e957403c5',
               user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
               lucky_draw_option_id: 'lucky_draw_2_id',
               giftcard_on_user_id: '3689107e-fb20-440d-ab64-3d49e5a74f02',
               lucky_status: 'lucky',
               GiftCardOnUser: {
                    id: '3689107e-fb20-440d-ab64-3d49e5a74f02',
                    gift_card_id: 'heineken-bottle-id',
                    user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
                    qrcode_id: null,
                    status: 'pending',
               }
          },
          {
               id: '928f774c-6f4a-4cb3-bc75-948751f1e40f',
               user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
               lucky_draw_option_id: 'lucky_draw_2_id',
               giftcard_on_user_id: '90d56da6-ccfc-44a2-b1d1-6326c657fc8c',
               lucky_status: 'lucky',
               GiftCardOnUser: {
                    id: '90d56da6-ccfc-44a2-b1d1-6326c657fc8c',
                    gift_card_id: 'heineken-can-id',
                    user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
                    qrcode_id: null,
                    status: 'pending',
               }
          },
          {
               id: 'b013ae55-019c-4120-b2c3-269eaa394828',
               user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
               lucky_draw_option_id: 'lucky_draw_2_id',
               giftcard_on_user_id: '530f100e-7df8-4730-a226-4ff881b09513',
               lucky_status: 'lucky',
               GiftCardOnUser: {
                    id: '530f100e-7df8-4730-a226-4ff881b09513',
                    gift_card_id: 'heineken-bottle-cup-id',
                    user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
                    qrcode_id: null,
                    status: 'pending',
               }
          },
          {
               id: 'b776d38f-11bb-40da-b440-7278a801e217',
               user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
               lucky_draw_option_id: 'lucky_draw_2_id',
               giftcard_on_user_id: '0c6d88bc-1dea-42ad-ab1a-68acadb0b3ac',
               lucky_status: 'lucky',
               GiftCardOnUser: {
                    id: '0c6d88bc-1dea-42ad-ab1a-68acadb0b3ac',
                    gift_card_id: 'heineken-bottle-id',
                    user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
                    qrcode_id: null,
                    status: 'pending',
               }
          },
          {
               id: 'b84e0c50-d675-4062-9dd9-4de158ae4895',
               user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
               lucky_draw_option_id: 'lucky_draw_2_id',
               giftcard_on_user_id: '7439cdcb-7c68-40b5-bb71-472e2fca102c',
               lucky_status: 'lucky',
               GiftCardOnUser: {
                    id: '7439cdcb-7c68-40b5-bb71-472e2fca102c',
                    gift_card_id: 'heineken-bottle-id',
                    user_id: '2fce02cc-d7b6-4d5e-9433-471e1ebb5990',
                    qrcode_id: null,
                    status: 'pending',
               }
          },
     ]

     const data2 = [
          {
               id: '111',
               lucky_draw_options_id: 'lucky_draw_2_id',
               quantity: 2,
               gift_card_id: 'heineken-bottle-cup-id',
          },
          {
               id: '222',
               lucky_draw_options_id: 'lucky_draw_2_id',
               quantity: 2,
               gift_card_id: 'heineken-bottle-id',
          },
          {
               id: '333',
               lucky_draw_options_id: 'lucky_draw_2_id',
               quantity: 2,
               gift_card_id: 'heineken-can-id',
          }
     ]
}